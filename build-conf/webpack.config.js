const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = [{
  name: 'browser',
  entry: {
    main: './src/client/main.js',
  },
  output: {
    path: './public/resources',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      portraitPath: path.resolve(__dirname, '../src/client/assets/img/portraits'),
    },
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)([\?]?.*)$/,
      loader: 'url-loader',
    },
    {
      test: /\.tab$/,
      exclude: /node_modules/,
      loader: 'raw-loader',
    }],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  externals: {
    jquery: 'jQuery',
  },
}];
