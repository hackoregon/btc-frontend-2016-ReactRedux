const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
module.exports = {
  name: 'browser',
  entry: ['./src/client/main.js'],
  output: {
    path: path.join(__dirname, '../public/resources'),
    filename: 'bundle.js',
    publicPath: '/resources/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
    alias: {
      portraitPath: path.resolve(__dirname, '../src/client/assets/img/portraits'),
      imgPath:path.resolve(__dirname,'../src/client/assets/img')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
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
      loader: 'style-loader!css-loader!postcss-loader'
    },
     {
      test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=25000'
    },
    {
      test: /\.(svg|png|jpg|jpeg|gif)([\?]?.*)$/,
      exclude: /node_modules/,
      loader: 'file-loader'
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
  }
};
