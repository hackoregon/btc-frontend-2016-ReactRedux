/* eslint-disable no-console */
// var fs = require('fs-extra');
const path = require('path');
const express = require('express');
// const rewrite = require('express-urlrewrite');
// const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./build-conf/webpack.config-dev');
const app = express();
const compiler = webpack(config);
const port = 3000;
// const port = 80; // backup incase

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:'+port);
});
