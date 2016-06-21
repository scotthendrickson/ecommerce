var mongojs = require("mongojs");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mainCtrl = require('./controllers/mainCtrl');


var app = express();
var db = mongojs('ecommerce', ['products']);

var corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors(corsOptions))
app.use(express.static(__dirname + '/public'));

app.post('/api/products', mainCtrl.create);
app.get('/api/products', mainCtrl.index)
app.get('/api/products', mainCtrl.search)
app.get('/api/products/:id', mainCtrl.show)
app.put('/api/products/:id', mainCtrl.update)
app.delete('/api/products/:id', mainCtrl.destroy)


var port = 3000;
app.listen(port, function(){
  console.log("Listening on port", port)
})
