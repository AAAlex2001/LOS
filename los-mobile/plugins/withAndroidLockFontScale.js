const { withMainActivity } = require('expo/config-plugins');

/**
 * Блокирует системное масштабирование шрифтов и плотности (fontScale) на Android.
 *
 * Переопределяет attachBaseContext в MainActivity так, чтобы конфигурация
 * приложения всегда имела fontScale = 1.0, независимо от настроек телефона
 * ("Размер шрифта" и "Масштаб экрана / Display size").
 */
function withAndroidLockFontScale(config) {
  return withMainActivity(config, (config) => {
    let contents = config.modResults.contents;
    const language = config.modResults.language; // 'kt' | 'java'

    if (contents.includes('LOSLockFontScale')) {
      return config;
    }

    if (language === 'kt') {
      if (!contents.includes('android.content.Context')) {
        contents = contents.replace(
          /(package [^\n]+\n)/,
          `$1\nimport android.content.Context\nimport android.content.res.Configuration\n`
        );
      } else {
        if (!contents.includes('android.content.res.Configuration')) {
          contents = contents.replace(
            /(import android\.content\.Context\n)/,
            `$1import android.content.res.Configuration\n`
          );
        }
      }

      const override = `
  // LOSLockFontScale: фиксируем fontScale = 1.0 на уровне активити,
  // чтобы системные настройки размера шрифта / масштаба экрана
  // не влияли на интерфейс приложения.
  override fun attachBaseContext(newBase: Context) {
    val configuration = Configuration(newBase.resources.configuration)
    configuration.fontScale = 1.0f
    super.attachBaseContext(newBase.createConfigurationContext(configuration))
  }
`;

      contents = contents.replace(
        /class MainActivity\s*:\s*ReactActivity\(\)\s*\{/,
        (match) => `${match}\n${override}`
      );
    } else if (language === 'java') {
      if (!contents.includes('android.content.Context')) {
        contents = contents.replace(
          /(package [^\n]+;\n)/,
          `$1\nimport android.content.Context;\nimport android.content.res.Configuration;\n`
        );
      } else if (!contents.includes('android.content.res.Configuration')) {
        contents = contents.replace(
          /(import android\.content\.Context;\n)/,
          `$1import android.content.res.Configuration;\n`
        );
      }

      const override = `
  // LOSLockFontScale: фиксируем fontScale = 1.0 на уровне активити.
  @Override
  protected void attachBaseContext(Context newBase) {
    Configuration configuration = new Configuration(newBase.getResources().getConfiguration());
    configuration.fontScale = 1.0f;
    super.attachBaseContext(newBase.createConfigurationContext(configuration));
  }
`;

      contents = contents.replace(
        /public class MainActivity extends ReactActivity\s*\{/,
        (match) => `${match}\n${override}`
      );
    }

    config.modResults.contents = contents;
    return config;
  });
}

module.exports = withAndroidLockFontScale;
