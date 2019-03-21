const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const meteorExternals = require('webpack-meteor-externals');

const clientConfig = {
  entry: './client/main.jsx',
  mode: 'development',
  stats: 'verbose',
  
  // allows us to omit .js, .jsx file extensions in import statements
  resolve: {
    extensions: [ '.js', '.jsx', ],
  },
  
  module: {
    rules: [
      {
        // load .js(x) files with Babel to interpret ES6(React) code
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        
        options: {
          // force Webpack to find babel.config.js, will not compile otherwise
          rootMode: 'upward',
        },
      },
      {
        // load .(s)css files, running Sass loader if .scss
        test: /\.(css|scss)$/,
        use: [
          {
            // production: loader: MiniCssExtractPlugin.loader,
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
    ]
  },
  
  plugins: [
    // combines CSS into one file, app.css
    new MiniCssExtractPlugin({ filename: '[name].css', }),
    
    // uses main.html as the template for React
    new HtmlWebpackPlugin({ template: './client/main.html', }),
    
    // enables hot replacement, i.e. automatic web browser reloads
    new webpack.HotModuleReplacementPlugin(),
  ],
  
  // enables hot module replacement, i.e. automatic web browser reloads
  devServer: {
    hot: true,
    inline: true,
  },
  
  externals: [
    meteorExternals(),
  ],
};

const serverConfig = {
  entry: './server/main.js',
  mode: 'development',
  stats: 'verbose',
  
  target: 'node',
  
  devServer: {
    hot: true,
  },
  
  externals: [
    meteorExternals(),
  ],
};

module.exports = [clientConfig, serverConfig];
