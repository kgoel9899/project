var express = require('express');
var first = require('./controller/first');
var PORT = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

first(app);

app.listen(PORT);
console.log('Listening to port 3000');
