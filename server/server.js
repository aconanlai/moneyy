const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/config');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));

let db;

MongoClient.connect(config.mongodb_uri, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 3000, () => {
      console.log('listening  on 3000');
  });
});

app.use(express.static(path.resolve(__dirname, '../client')));


// app.get('/', (req, res) => {
//   const first = Math.floor(Math.random() * 10) + 1;
//   let second = Math.floor(Math.random() * 10) + 1;
//   while (first === second) {
//     second = Math.floor(Math.random() * 10) + 1;
//   }
//   db.collection('items').find({ $or: [{ key: first.toString() }, { key: second.toString() }] }).toArray((err, result) => {
//     if (err) return console.log(err);
//     // renders index.ejs
//     res.render('../views/index.jsx', { items: result });
//   });
// });