var fs = require('fs-extra');
var path = require('path');
var request = require('request');
var express = require('express');
var rewrite = require('express-urlrewrite');
var bodyParser = require('body-parser');
var serverAPI = require('./server/api');

var app = express();

app.set('port', (process.env.PORT || 3000));

serverAPI.setCurrentWorkingDirPath(path.join(__dirname, 'server'));

app.use('/resources', express.static(path.join(__dirname, 'public/resources')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(rewrite('/*', '/index.html'));
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
