const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
module.exports = [{
  name: 'browser',
  entry: {
    main: './src/client/main.js'
  },
  output: {
    path: './public/resources',
    filename: 'bundle.js'
  },
  resolve: {
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
      loader: 'style!css?modules',
      include: /flexboxgrid/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      include: /react-spinkit/
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('style-loader!css-loader!postcss-loader')
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
  postcss: function () {
    return [precss, autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
}];