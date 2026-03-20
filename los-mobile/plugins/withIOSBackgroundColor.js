const { withAppDelegate } = require("expo/config-plugins");

/**
 * Expo config plugin: устанавливает UIWindow.backgroundColor
 * и rootViewController.view.backgroundColor СРАЗУ в AppDelegate,
 * до того как React Native покажет белый рутовый View.
 *
 * Зачем: с newArchEnabled:true, RCTRootViewFactory хардкодит
 * rootView.backgroundColor = [UIColor systemBackgroundColor] (белый).
 * Info.plist RCTRootViewBackgroundColor игнорируется.
 * expo-system-ui ставит цвет, но ПОСЛЕ создания окна (слишком поздно).
 *
 * Этот плагин вставляет код в didFinishLaunchingWithOptions ПОСЛЕ
 * super-вызова (который создаёт UIWindow), устанавливая оба фона
 * на нужный цвет.
 */
function withIOSBackgroundColor(config, backgroundColor) {
  return withAppDelegate(config, (config) => {
    let contents = config.modResults.contents;
    const language = config.modResults.language;

    if (contents.includes("self.window.backgroundColor")) {
      return config;
    }

    const hex = backgroundColor.replace("#", "");
    const r = (parseInt(hex.substring(0, 2), 16) / 255.0).toFixed(6);
    const g = (parseInt(hex.substring(2, 4), 16) / 255.0).toFixed(6);
    const b = (parseInt(hex.substring(4, 6), 16) / 255.0).toFixed(6);

    if (language === "swift") {
      const superCall =
        "return super.application(application, didFinishLaunchingWithOptions: launchOptions)";
      if (contents.includes(superCall)) {
        contents = contents.replace(
          superCall,
          [
            "let result = super.application(application, didFinishLaunchingWithOptions: launchOptions)",
            `    self.window?.backgroundColor = UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: 1.0)`,
            `    self.window?.rootViewController?.view.backgroundColor = UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: 1.0)`,
            "    return result",
          ].join("\n")
        );
      }
    } else {
      // Objective-C / Objective-C++
      const superCall =
        "[super application:application didFinishLaunchingWithOptions:launchOptions]";
      const returnSuperCall = `return ${superCall};`;
      if (contents.includes(returnSuperCall)) {
        contents = contents.replace(
          returnSuperCall,
          [
            `BOOL result = ${superCall};`,
            `  self.window.backgroundColor = [UIColor colorWithRed:${r} green:${g} blue:${b} alpha:1.0];`,
            `  self.window.rootViewController.view.backgroundColor = [UIColor colorWithRed:${r} green:${g} blue:${b} alpha:1.0];`,
            "  return result;",
          ].join("\n")
        );
      }
    }

    config.modResults.contents = contents;
    return config;
  });
}

module.exports = withIOSBackgroundColor;
