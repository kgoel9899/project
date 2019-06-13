var express = require('express');
var first = require('./controller/first');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

first(app);

app.listen(3000);
console.log('Listening');
