var bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect("mongodb://dmrctest:dmrc123@ds237357.mlab.com:37357/dmrcmap", { useNewUrlParser: true });
var Schema = new mongoose.Schema({
  name: String,
  address: String,
  lat: Number,
  lng: Number
});

var Model = mongoose.model('Map', Schema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/', function(req, res){
    Model.find({}, function(err, data) {
      if(err) {
        throw err;
      } else {
        res.render('map', {data: data});
      }
    });
  });
  var na = "1";
  var addre = "a";
  var la = 100000;
  var ln = 100000;
  app.post('/', urlencodedParser, function(req, res){
    if(req.body.name !== na && req.body.address !== addre && req.body.lat !== la && req.body.lng !== ln) {
      var newItem = Model(req.body).save(function(err, data) {
        if(err) {
          throw err;
        } else {
          // console.log("saved");
          Model.find({}, function(err, data) {
            if(err) {
              throw err;
            } else {
              res.render('map', {data: data});
            }
          });
        }
      });
      na = req.body.name;
      addre = req.body.address;
      la = req.body.lat;
      ln = req.body.lng;
    } else {
      // console.log("success");
      Model.find({}, function(err, data) {
        if(err) {
          throw err;
        } else {
          res.render('map', {data: data});
        }
      });
    }
  });
};
