"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/fetchDay", function(req, res) {
  console.log(req.body);

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date(req.body.result.parameters.echoDay);
  var dayName = days[d.getDay()];
  console.log(dayName)
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoDay
      ?days[ new Date(req.body.result.parameters.echoDay).getDay()]
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});