// babel.config.js
module.exports = {
  
  // env -> ES6 support, react -> .jsx support
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
