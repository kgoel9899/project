var bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect("mongodb://dmrctest:dmrc123@ds237357.mlab.com:37357/dmrcmap");

var Schema = new mongoose.Schema({
  name: String,
  place: String,
  lat: Number,
  lng: Number
});

var Model = mongoose.model('Map', Schema);
// var testData = Model({name: 'Ab', place: 'x', lat: 30.2, long: 20.9}).save(function(err) {
//   if(err) {
//     throw err;
//   } else {
//     console.log("Added to db");
//   }
// });

var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var data = [{name: 'Ab', place: 'x', lat: 30.2, long: 20.9}, {name: 'Ab', place: 'x', lat: 30.2, long: 20.9}];
module.exports = function(app){

  app.get('/map', function(req, res){
    Model.find({}, function(err, data) {
      if(err) {
        throw err;
      } else {
        res.render('map', {data: data});
      }
    });
    // res.render('map', {data: data});
  });
  var addre = "a";
  app.post('/map', urlencodedParser, function(req, res){
    console.log(req.body);
    console.log(req.body.place);
    if(req.body.place !== addre) {
      console.log("hereeeee");
      var newItem = Model(req.body).save(function(err, data) {
        if(err) {
          throw err;
        } else {
          console.log("saved");
          Model.find({}, function(err, data) {
            if(err) {
              throw err;
            } else {
              res.render('map', {data: data});
            }
          });
        }
      });
      addre = req.body.place;
    } else {
      console.log("success");
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
