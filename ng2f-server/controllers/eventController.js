var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var events = require('../database/events'),
  getNextId = require('./getNextId'),
  url = require('url');

var nextId = getNextId(events);

exports.getEvents = function (req, res) {
    //res.send(events);
    var url = 'mongodb://localhost:27070/eventsApp';

    mongodb.connect(url, function (err, db) {
        var collection = db.collection('events');

        collection.find({}).toArray(
            function (err, results) {
                res.send(results);
                db.close();
            }
        );
    });
};

exports.getEvent = function (req, res) {

    var id = new objectId(req.params.eventId);
    var url = 'mongodb://localhost:27070/eventsApp';

    mongodb.connect(url, function (err, db) {
        var collection = db.collection('events');

        collection.findOne({_id: id},
            function (err, results) {
                res.send(results);
                db.close();
            });
    });

};

exports.updateEvent = function (req, res) {
    var updatedEvent = req.body;

    var foundEvent = events.find(event => event.id === parseInt(req.params.id));

    if (foundEvent) {
        foundEvent.attendees = updatedEvent.attendees;
        foundEvent.attendeesList = updatedEvent.attendeesList;
    }

    res.send(foundEvent);
    res.end();
}

exports.searchSessions = function(req, res) {
	var term = req.query.search.toLowerCase();
  var results = [];
  events.forEach(event => {
    var matchingSessions = event.sessions.filter(session => session.name.toLowerCase().indexOf(term) > -1)
    matchingSessions = matchingSessions.map(session => {
      session.eventId = event.id;
      return session;
    })
    results = results.concat(matchingSessions);
  })
  res.send(results);
}

exports.deleteVoter = function(req, res) {
  var voterId = req.params.voterId,
      sessionId = parseInt(req.params.sessionId),
      eventId = parseInt(req.params.eventId);

  var session = events.find(event => event.id === eventId)
    .sessions.find(session => session.id === sessionId)

  session.voters = session.voters.filter(voter => voter !== voterId);
  res.send(session);
}

exports.addVoter = function(req, res) {
  var voterId = req.params.voterId,
      sessionId = parseInt(req.params.sessionId),
      eventId = parseInt(req.params.eventId);

  var event = events.find(event => event.id === eventId)
  var session = event.sessions.find(session => session.id === sessionId)

  session.voters.push(voterId);
  res.send(session);
}

exports.saveEvent = function (req, res) {

    var url = 'mongodb://localhost:27070/eventsApp';

    mongodb.connect(url, function (err, db) {
        var collection = db.collection('events');
        var event = {
            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            attendeesCount: req.body.attendeesCount,
            attendees: req.body.attendees,
            location: req.body.location,
            onlineUrl: req.body.onlineUrl,
            sessions: [],
            attendeesList: []
        };

        collection.insert(event,
            function (err, results) {
                res.send(results);
                db.close();
            });
    });
};


