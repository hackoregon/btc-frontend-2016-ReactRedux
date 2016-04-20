const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  name: 'browser',
  devtool: 'eval-source-map',
  entry: ['webpack-hot-middleware/client', './src/client/main.js'],
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js',
    publicPath: '/resources/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      portraitPath: path.resolve(__dirname, '../src/client/assets/img/portraits'),
    },
  },
  module: {
    include: path.join(__dirname, '../src/client'),
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)([\?]?.*)$/,
      exclude: /node_modules/,
      loader: 'url-loader',
    }, {
      test: /\.tab$/,
      exclude: /node_modules/,
      loader: 'raw-loader',
    }],

  },
  externals: {
    jquery: 'jQuery',
  },
};
