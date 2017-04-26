var mongodb = require('mongodb').MongoClient;
var users = require('../database/users'),
  getNextId = require('./getNextId');

var nextId = getNextId(users);

exports.updateUser = function(req, res) {
  var updatedUser = req.body;

  var foundUser = users.find(user => user.id === parseInt(req.params.id));
  if(foundUser) {
    foundUser.firstName = updatedUser.firstName;
    foundUser.lastName = updatedUser.lastName;
  }

  res.send(foundUser);
  res.end();
}

exports.createUser = function (req, res) {
  var url = 'mongodb://localhost:27070/eventsApp';

  mongodb.connect(url, function (err, db) {
    var collection = db.collection('users');
    var user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };

    collection.insertOne(user,
        function (err, results) {
          res.send(results);
          db.close();
        });
  });
};

exports.getUsers = function(req, res) {
  res.send(users);
  res.end();
}