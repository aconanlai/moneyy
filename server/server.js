const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/config');

const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

let db;

MongoClient.connect(config.mongodb_uri, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 3000, () => {
      console.log('listening  on 3000');
  });
});

app.use(express.static(path.resolve(__dirname, '../client')));

// this returns two random items
app.get('/items', (req, res) => {
  const first = Math.floor(Math.random() * 10) + 1;
  let second = Math.floor(Math.random() * 10) + 1;
  while (first === second) {
    second = Math.floor(Math.random() * 10) + 1;
  }
  db.collection('items').find({ $or: [{ key: first.toString() }, { key: second.toString() }] }).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// this returns all of our items
app.get('/allitems', (req, res) => {
  db.collection('items').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// this adds a new item
app.post('/items', (req, res) => {
  db.collection('items').save(req.body, (err, result) => {
    if (err) console.log(err)
    console.log('saved new item');
    res.json('success');
  });
});

// this edits an item via ID passed as URL parameter
app.put('/items/:id', (req, res) => {
  // need to use mongodb driver's ObjectID to compare id otherwise it compares as string
  db.collection('items').findOneAndUpdate({ _id: ObjectID(req.params.id) }, req.body, (err, result) => {
    if (err) console.log(err);
    console.log('edit item');
    res.json('success');
  });
});

// this deletes a one by id
app.delete('/items/:id', (req, res) => {
  db.collection('items').remove({ _id: ObjectID(req.params.id) }, (err, result) => {
    if (err) console.log(err);
    console.log('delete item');
    res.json('success');
  });
});

// this is used to redirect all other non-matching routes to our index.html
// most importantly we use this right now for our /admin route
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});
