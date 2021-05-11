"use strict";

var express = require("express"); // call express
var app = express(); // define our app using express
const fs = require("fs");
var cors = require("cors");

var port = process.env.PORT || 8080; // set our port

// use it before all route definitions
app.use(cors());
app.use(express.json());

var router = express.Router();

router.post("/", function (req, res, next) {
  try {
    console.log(req.body); 
    fs.writeFile("data.txt", `${JSON.stringify(req.body)}\r\n`, { flag: 'a+' }, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");      
      //send response
      res.send({
        status: true,
        message: "saved",
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.use("/calc", router);
app.listen(port);
console.log("api server stared on port " + port);
