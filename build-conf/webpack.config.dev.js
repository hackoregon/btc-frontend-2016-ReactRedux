var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  name: "browser",
  devtool: 'inline-source-map',
  entry: ['webpack-hot-middleware/client', './src/client/main.js'],
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js',
    publicPath: '/resources/'
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    include: path.join(__dirname, '../src/client'),
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['react', 'es2015', 'stage-2'],
        plugins: ['transform-runtime', 'add-module-exports']
      }
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/,
      exclude: /node_modules/,
      loader: 'url-loader'
    }]

  },
  externals: {
    "jquery": "jQuery"
  }
};