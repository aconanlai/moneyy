const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let db;

MongoClient.connect(config.mongodb_uri, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 3000, () => {
      console.log('listening  on 3000');
  });
});

app.get('/', (req, res) => {
  db.collection('items').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    console.log(result);
    res.render('index.ejs', { items: result });
  });
});



