
var path = require('path');

var express = require('express');
var app = express();

var server = require('http').Server(app);

app.set('port', (process.env.PORT || 8000));

app.use('/', express.static(path.join(process.cwd(), 'public')));

server.listen(app.get('port'), () => {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

