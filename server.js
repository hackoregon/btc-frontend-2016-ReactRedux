/* eslint-disable no-console */

// app.set('port', (process.env.PORT || 3000));

// serverAPI.setCurrentWorkingDirPath(path.join(__dirname, 'server'));



// app.listen(app.get('port'), function() {
//   console.log('Server started: http://localhost:' + app.get('port') + '/');
// });

/* eslint-disable no-console */
// const path = require('path');
// const express = require('express');
// const app = express();
// const port = 80;
//
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });
//
// app.listen(port, function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Listening at '+port);
// });
const path = require('path');
const express = require('express');
// const webpack = require('webpack');
// const config = require('./build-conf/webpack.config');
const app = express();
const port = 80; // backup incase
app.use('/resources', express.static(path.join(__dirname, 'public/resources')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
// app.use(rewrite('/*', '/index.html'));
app.use('/', express.static(path.join(__dirname, 'public')));
// const compiler = webpack(config);
//const port = 5000;


// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, '', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening :'+port);
});
