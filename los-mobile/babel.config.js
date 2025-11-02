module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'react-native-worklets-core/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': '.',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};



