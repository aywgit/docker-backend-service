const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'questionAnswers';

//getQA
app.get('/qa/:id', (req, res) => {
  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const id = Number(req.params.id);
    db.collection('questions').find({ 'product_id': id }).toArray(function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send(result)
      client.close();
    });
  });
});

//getSpecificAnswers
app.get('/qa/:questionId/answers', (req, res) => {
  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);

    const id = Number(req.params.questionId);
    db.collection('answerscombines').find({ 'question_id': id }).toArray(function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send(result);
      client.close();
    });
  });
})

//askQuestion
app.post('/qa/:id', (req, res) => {
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let id = req.params.id;
  let time = Date.now();

  let obj = { product_id: id, body: body, date_written: time, asker_name: name, asker_email: email, report: 0, helpful: 0 }

  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('questions').insertOne(obj, function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send('inserted into questions collection')
      client.close();
    });
  });
})

//answerQuestion
app.post('/qa/:questionId/answers', (req, res) => {
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let photos = req.body.photos;
  let id = req.params.questionId;
  let time = Date.now();

  let answerObj = { question_id: id, body: body, date_written: time, answerer_name: name, answerer_email: email, report: 0, helpful: 0, photos: photos }

  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('answerscombines').insertOne(answerObj, function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send('inserted into answers collection')
      client.close();
    })
  })
})

//markQAsHelpful
app.put('/qa/question/:questionId/helpful', (req, res) => {
  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const questionId = Number(req.params.questionId);
    db.collection('questions').update({ id: questionId }, { $inc: { helpful: 1 } }, function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send('success')
      client.close();
    });
  });
})

//reportQuestion
app.put('/qa/question/:questionId/report', (req, res) => {
  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const questionId = Number(req.params.questionId);
    db.collection('questions').update({ id: questionId }, { $set: { reported: 1 } }, function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send('success')
      client.close();
    });
  });
})

//markAnsAsHelpful
app.put('/qa/answer/:answerId/helpful', (req, res) => {
  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const answerId = Number(req.params.answerId);
    db.collection('answerscombines').update({ id: answerId }, { $inc: { helpful: 1 } }, function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send('success')
      client.close();
    });
  });
})

//reportAns
app.put('/qa/answer/:answerId/report', (req, res) => {
  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const answerId = Number(req.params.answerId);
    db.collection('answerscombines').update({ id: answerId }, { $set: { reported: 1 } }, function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send('success')
      client.close();
    });
  });
})

module.exports = app;

