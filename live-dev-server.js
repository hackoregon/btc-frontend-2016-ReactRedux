/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./build-conf/webpack.config-dev');
const app = express();
const compiler = webpack(config);
// const port = 3000;
const port = 80; // backup incase

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

if(process.env.NODE_ENV === 'development') {
  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, function(err) {
  console.log(process.env.NODE_ENV,' active');
  if (err) {
    console.log(err);
  }
});
