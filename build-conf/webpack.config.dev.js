var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path              = require('path');
var precss            = require('precss');
var autoprefixer      = require('autoprefixer');

module.exports = {
  name: 'browser',
  devtool: 'cheap-module-source-map',
  entry: ['webpack-hot-middleware/client', './src/client/main.js'],
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js',
    publicPath: '/resources/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      portraitPath: path.resolve(__dirname, '../src/client/assets/img/portraits')
    }
  },
  module: {
    include: path.join(__dirname, '../src/client'),
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)([\?]?.*)$/,
      exclude: /node_modules/,
      loader: 'url-loader'
    }, {
      test: /\.tab$/,
      exclude: /node_modules/,
      loader: 'raw-loader'
    }, {
      test: /\.hson$/,
      exclude: /node_modules/,
      loader: 'hson-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]

  },
  externals: {
    'jquery': 'jQuery'
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
};