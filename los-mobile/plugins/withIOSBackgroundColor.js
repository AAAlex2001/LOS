const { withAppDelegate } = require("expo/config-plugins");

/**
 * Агрессивный фикс белого мерцания на iOS.
 *
 * Вставляет код прямо в AppDelegate.mm:
 * 1. Устанавливает UIWindow.backgroundColor в didFinishLaunching
 * 2. Добавляет observer который красит view после React Native инициализации
 */

function withIOSBackgroundColor(config, backgroundColor) {
  return withAppDelegate(config, (config) => {
    let contents = config.modResults.contents;

    if (contents.includes("LOSSetupBackgroundColor")) {
      return config; // Already patched
    }

    const hex = backgroundColor.replace("#", "");
    const r = (parseInt(hex.substring(0, 2), 16) / 255.0).toFixed(6);
    const g = (parseInt(hex.substring(2, 4), 16) / 255.0).toFixed(6);
    const b = (parseInt(hex.substring(4, 6), 16) / 255.0).toFixed(6);

    // Helper function to set background recursively
    const helperCode = `
// LOS: Fix white flash on iOS with new architecture
static UIColor *_losBackgroundColor = nil;

static void LOSSetBackgroundRecursively(UIView *view, int depth) {
    if (depth > 15 || view == nil) return;
    UIColor *c = view.backgroundColor;
    if (c == nil || [c isEqual:[UIColor whiteColor]] ||
        [c isEqual:[UIColor systemBackgroundColor]] || [c isEqual:[UIColor clearColor]]) {
        view.backgroundColor = _losBackgroundColor;
    }
    for (UIView *sub in view.subviews) {
        LOSSetBackgroundRecursively(sub, depth + 1);
    }
}

static void LOSSetupBackgroundColor(UIWindow *window) {
    if (_losBackgroundColor == nil) {
        _losBackgroundColor = [UIColor colorWithRed:${r} green:${g} blue:${b} alpha:1.0];
    }
    window.backgroundColor = _losBackgroundColor;
    if (window.rootViewController) {
        window.rootViewController.view.backgroundColor = _losBackgroundColor;
        LOSSetBackgroundRecursively(window.rootViewController.view, 0);
    }
}
`;

    // Code to add after super call in didFinishLaunching
    const afterSuperCode = `
  // LOS: Set background immediately
  LOSSetupBackgroundColor(self.window);

  // LOS: Also set after React Native initializes (multiple times to be safe)
  dispatch_async(dispatch_get_main_queue(), ^{
    LOSSetupBackgroundColor(self.window);
  });
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.01 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    LOSSetupBackgroundColor(self.window);
  });
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.05 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    LOSSetupBackgroundColor(self.window);
  });
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    LOSSetupBackgroundColor(self.window);
  });`;

    // Add helper functions at the top (after imports)
    const importEnd = contents.lastIndexOf("#import");
    if (importEnd !== -1) {
      const importLineEnd = contents.indexOf("\n", importEnd);
      contents =
        contents.slice(0, importLineEnd + 1) +
        helperCode +
        contents.slice(importLineEnd + 1);
    }

    // Modify the return statement in didFinishLaunching
    const superCall =
      "[super application:application didFinishLaunchingWithOptions:launchOptions]";
    const returnSuperCall = `return ${superCall};`;

    if (contents.includes(returnSuperCall)) {
      contents = contents.replace(
        returnSuperCall,
        `BOOL result = ${superCall};${afterSuperCode}\n  return result;`
      );
    }

    config.modResults.contents = contents;
    return config;
  });
}

module.exports = withIOSBackgroundColor;
