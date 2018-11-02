const express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost:27017/url_minimizer";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("connected", function() {
  console.log("mongoose default connection open to " + mongoDB);
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));
var urlmin = require("./models/urlschema.js");

function hexconversion(num) {
  var rem = Math.floor(num / 16); //calculating reminder
  var arr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  ];
  res = num % 16 === 0 ? "0" : arr[(num % 16) - 1];
  if (rem >= 16) {
    return res + hexconversion(rem);
  }
  return res + rem;
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/url_minimising_page", (req, res) => {
  var url = req.body.url;
  urlmin.findOne({ url: url }).then(
    result => {
      if (result) {
        res.send(JSON.stringify({ result: result.hexRes }));
      } else {
        var uniqueVal = 1002;
        var resulthex = hexconversion(uniqueVal);
        var finalres = resulthex
          .split("")
          .reverse()
          .join("");
        var urlData = {
          url: req.body.url,
          hexRes: finalres
        };
        var urldata = new urlmin(urlData);
        urldata
          .save()
          .then(item => {
            res
              .status(200)
              .send(JSON.stringify({ status: "inserted succesfully" }));
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Error");
          });
      }
    },
    err => {
      res.send(err);
    }
  );
});
app.get("/:tagid", (req, res) => {
  urlmin.findOne({ hexRes: req.params.tagid }).then(
    result => {
      if (result) {
        res.redirect(result.url);
      } else {
        res.send("Error occured");
      }
    },
    err => {
      res.send(err);
    }
  );
});
// app.post("/get_url", (req, res) => {
//   var url = req.body.url;
// });
app.listen(3000, () => console.log("example is listening on port 3000"));
