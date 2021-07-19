// const express = require("express")
// const mongoose = require("mongoose") // new

// // Connect to MongoDB database
// mongoose
//   .connect("mongodb://ec2-34-204-200-42.compute-1.amazonaws.com:27017/questionAnswers", { useNewUrlParser: true })
//   .then(() => {
//     const app = express()

//     app.listen(5000, () => {
//       console.log("Server has started!")
//     })
//   })

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors')
const StatsD = require("node-statsd"), statsDClient = new StatsD();

const app = express();
const PORT = 3030;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const url = 'mongodb://3.238.229.6:27017';
const dbName = 'questionAnswers';

app.get('', (req, res) => {
  res.send('connected to api!')
})

//getQA
app.get('/qa/:id', (req, res) => {
  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);

    const product_id = Number(req.params.id);
    db.collection('questions').find({ 'product_id': product_id }).toArray(function (err, result) {
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

    let question_id = req.params.questionId;
    db.collection('answerscombined').find({ 'question_id': new ObjectId(question_id) }).toArray(function (err, result) {
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
  console.log(req)
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let time = Date.now();

  let product_id = Number(req.params.id);
  let obj = { product_id: product_id, question_body: body, question_date: time, asker_name: name, asker_email: email, report: 0, question_helpfulness: 0 }

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
  console.log(req.body)
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let photos = req.body.photos;
  let time = Date.now();

  let question_id = req.params.questionId;
  let answerObj = { question_id: new ObjectId(question_id), body: body, date: time, answerer_name: name, answerer_email: email, report: 0, helpfulness: 0, photos: photos }

  const client = new MongoClient(url);
  const db = client.connect(function (err) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('answerscombined').insertOne(answerObj, function (err, result) {
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

    const question_id = req.params.questionId;
    db.collection('questions').update({ _id: new ObjectId(question_id) }, { $inc: { question_helpfulness: 1 } }, function (err, result) {
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

    const question_id = req.params.questionId;
    db.collection('questions').update({ _id: new ObjectId(question_id) }, { $set: { reported: 1 } }, function (err, result) {
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

    const answer_id = req.params.answerId;
    db.collection('answerscombined').update({ _id: new ObjectId(answer_id) }, { $inc: { helpfulness: 1 } }, function (err, result) {
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

    const answer_id = req.params.answerId;
    db.collection('answerscombined').update({ _id: new ObjectId(answer_id) }, { $set: { reported: 1 } }, function (err, result) {
      if (err) {
        res.send(err)
      }
      res.send('success')
      client.close();
    });
  });
})

module.exports = app;

