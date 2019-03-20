const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const meteorExternals = require('webpack-meteor-externals');

const clientConfig = {
  entry: './client/main.jsx',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query:
        {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
    },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    hot: true,
    inline: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/main.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: [
    meteorExternals()
  ],
};

const serverConfig = {
  entry: [
    './server/main.js'
  ],
  target: 'node',
  devServer: {
    hot: true
  },
  externals: [
    meteorExternals()
  ]
};

module.exports = [clientConfig, serverConfig];
