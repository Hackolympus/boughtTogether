const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();
const port = 3015;
const db = require("../db/mongoose_db").db.model;
const axios = require('axios');
const cred = require('../config');
const AWS =  require('aws-sdk');

AWS.config.update({
  ergion: 'us-east-1',
  accessKeyId: cred.accessKey,
  secretAccessKey: cred.secretKey
})

s3 = new AWS.S3({apiVersion: '2006-03-01'});
var bucketParams = {
  Bucket : 'chairchair'
};  
var test = {
  Bucket : 'chairchair',
  Key: '1.jpg'
};  

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/bucket", (req, res) => {
  console.log('bucket');
  s3.listObjects(bucketParams, function(err, data) {
    if (err) {
       console.log("Error", err);
       res.sendStatus(404);
    } else {
       console.log("Success", data);
       res.send(data);
    }
 });
});

app.get("/bucket/:number", (req, res) => {
  test.Key = req.params.number + ".jpg";
  s3.getObject(test, function(err, data) {
    if (err) {
       console.log("Error", err);
       res.sendStatus(404);
    } else {
       console.log("Success", data);    
       res.writeHead(200, {'Content-Type': 'image/jpeg'});
       res.write(data.Body, 'binary');
       res.end(null, 'binary');
    }
 });
});

app.get("/related/:number", (req, res) => {
  let id = Number(req.params.number);
  db.findOne({ id: id }, (err, item) => {
    Promise.all(
      item.boughtTogether.map(data => {
        return db.findOne({ id: data }).exec();
      })
    ).then(response => {
      res.send(response);
    });
  });
});

app.get("/listing/:number", (req, res) => {
  let id = Number(req.params.number);
  db.findOne({ id: id }, (err, item) => {
    Promise.all(
      item.relevantItems.map(data => {
        return db.findOne({ id: data }).exec();
      })
    ).then(response => {
      res.send(response);
    });
  });
});

app.listen(port, () => {
  console.log("hello from " + port);
});

module.exports = app;
