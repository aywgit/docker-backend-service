const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

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
    db.collection('answers').find({ 'question_id': id }).toArray(function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send(result)
      client.close();
    });
  });
})

//askQuestion
app.post('/qa/:id', (req, res) => {
  console.log(req.body)
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
      console.log(obj)
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

  //add to answers
  //set question_id, date, helpfulness
  //add to answer_photos
})

//markQAsHelpful
app.put('/qa/question/:questionId/helpful', (req, res) => {
  //increment helpful key in questions
})

//reportQuestion
app.put('/qa/question/:questionId/report', (req, res) => {
  //change report boolean in questions
})

//markAnsAsHelpful
app.put('/qa/answer/:answerId/helpful', (req, res) => {
  //increment helpful in answers
})

//reportAns
app.put('/qa/answer/:answerId/report', (req, res) => {
  //change report boolean in answers
})

module.exports = app;

