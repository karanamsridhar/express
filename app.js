const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser());
const dataDirectory = path.join(__dirname, "data");

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.route("/").get(function(req, res) {
  var holidayData = fs.readFileSync(dataDirectory + "/holidays.json");
  var holidayJsonData = JSON.parse(holidayData);
  res.render("index", { year: "2020", holidays: holidayJsonData["2020"] });
});

app.route("/getHolidaysForYear").post(function(req, res) {
  var selectedYear = req.body.mySelect;
  var holidayData = fs.readFileSync(dataDirectory + "/holidays.json");
  var holidayJsonData = JSON.parse(holidayData);
  res.render("index", {
    year: selectedYear,
    holidays: holidayJsonData[selectedYear]
  });
});

var server = app.listen(3000, function() {});
