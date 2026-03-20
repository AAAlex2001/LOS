const { withDangerousMod, withXcodeProject } = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

/**
 * Агрессивный фикс белого мерцания на iOS.
 *
 * Проблема: с newArchEnabled:true, RCTRootViewFactory хардкодит
 * rootView.backgroundColor = [UIColor systemBackgroundColor] (белый)
 * ПОСЛЕ того как AppDelegate код выполнился.
 *
 * Решение: Method swizzling на UIWindow.makeKeyAndVisible.
 * +load выполняется до main(), swizzle перехватывает момент когда
 * окно становится видимым и рекурсивно красит все view в нужный цвет.
 */

const FILE_NAME = "LOSWindowBackgroundFix.m";

function withIOSWindowSwizzle(config, backgroundColor) {
  const hex = backgroundColor.replace("#", "");
  const r = (parseInt(hex.substring(0, 2), 16) / 255.0).toFixed(6);
  const g = (parseInt(hex.substring(2, 4), 16) / 255.0).toFixed(6);
  const b = (parseInt(hex.substring(4, 6), 16) / 255.0).toFixed(6);

  // Step 1: Create the .m file
  config = withDangerousMod(config, [
    "ios",
    async (config) => {
      const projectRoot = config.modRequest.platformProjectRoot;
      const iosFiles = fs.readdirSync(projectRoot);
      const xcodeproj = iosFiles.find((f) => f.endsWith(".xcodeproj"));
      const projectName = xcodeproj
        ? xcodeproj.replace(".xcodeproj", "")
        : "LandofSoul";

      const filePath = path.join(projectRoot, projectName, FILE_NAME);

      const objcCode = `
#import <UIKit/UIKit.h>
#import <objc/runtime.h>

// Target background color - set at +load time
static UIColor *_losTargetBgColor = nil;
static BOOL _losHasAppliedColor = NO;

static void LOSSetBackgroundRecursively(UIView *view, int depth) {
    if (depth > 20) return; // Safety limit

    UIColor *currentColor = view.backgroundColor;

    // Color views that are white, clear, or system background
    if (currentColor == nil ||
        CGColorEqualToColor(currentColor.CGColor, [UIColor whiteColor].CGColor) ||
        CGColorEqualToColor(currentColor.CGColor, [UIColor systemBackgroundColor].CGColor) ||
        CGColorEqualToColor(currentColor.CGColor, [UIColor clearColor].CGColor)) {
        view.backgroundColor = _losTargetBgColor;
    }

    for (UIView *subview in view.subviews) {
        LOSSetBackgroundRecursively(subview, depth + 1);
    }
}

@implementation UIWindow (LOSBackgroundColorFix)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _losTargetBgColor = [UIColor colorWithRed:${r} green:${g} blue:${b} alpha:1.0];

        Class class = [self class];
        SEL originalSelector = @selector(makeKeyAndVisible);
        SEL swizzledSelector = @selector(los_makeKeyAndVisible);

        Method originalMethod = class_getInstanceMethod(class, originalSelector);
        Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);

        method_exchangeImplementations(originalMethod, swizzledMethod);
    });
}

- (void)los_makeKeyAndVisible {
    // Set backgrounds BEFORE window becomes visible
    self.backgroundColor = _losTargetBgColor;
    self.rootViewController.view.backgroundColor = _losTargetBgColor;
    LOSSetBackgroundRecursively(self.rootViewController.view, 0);

    // Call original (now swizzled)
    [self los_makeKeyAndVisible];

    // Apply again after, with multiple delays to catch React Native views
    if (!_losHasAppliedColor) {
        _losHasAppliedColor = YES;

        // Immediate
        dispatch_async(dispatch_get_main_queue(), ^{
            self.backgroundColor = _losTargetBgColor;
            self.rootViewController.view.backgroundColor = _losTargetBgColor;
            LOSSetBackgroundRecursively(self.rootViewController.view, 0);
        });

        // After 1 frame
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.016 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            self.backgroundColor = _losTargetBgColor;
            self.rootViewController.view.backgroundColor = _losTargetBgColor;
            LOSSetBackgroundRecursively(self.rootViewController.view, 0);
        });

        // After 2 frames
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.032 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            self.backgroundColor = _losTargetBgColor;
            self.rootViewController.view.backgroundColor = _losTargetBgColor;
            LOSSetBackgroundRecursively(self.rootViewController.view, 0);
        });
    }
}

@end
`;

      const dirPath = path.join(projectRoot, projectName);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(filePath, objcCode);

      return config;
    },
  ]);

  // Step 2: Add file to Xcode project
  config = withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;
    const projectName = config.modRequest.projectName;
    const filePath = `${projectName}/${FILE_NAME}`;

    // Check if file is already added
    const hasFile = Object.values(xcodeProject.pbxFileReferenceSection() || {}).some(
      (ref) => typeof ref === 'object' && ref.path === FILE_NAME
    );

    if (!hasFile) {
      xcodeProject.addSourceFile(filePath, {}, projectName);
    }

    return config;
  });

  return config;
}

module.exports = withIOSWindowSwizzle;
