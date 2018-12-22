const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();
const port = 3015;
const db = require("../db/mongoose_db").db.model;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/listing/:number", (req, res) => {
  let id = Number(req.params.number);
  db.findOne({ id: id }, (err, item) => {
    Promise.all(
      item.relevantItems.map(dat => {
        return db.findOne({ id: dat }).exec();
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
