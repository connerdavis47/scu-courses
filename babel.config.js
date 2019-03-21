// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-decorators',
      {
        'decoratorsBeforeExport': false,
      }
    ],
    'react-hot-loader/babel',
  ],
};
