const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'questionAnswers';
const client = new MongoClient(url);
// Use connect method to connect to the server
const db = client.connect(function (err) {
  assert.equal(null, err);
  console.log('MongoDB connected');

  const db = client.db(dbName);

  client.close();
});

module.exports = db;