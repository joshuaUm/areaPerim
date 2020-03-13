let express = require("express");
let logger = require("morgan");
let favicon = require("serve-favicon");
let path = require("path");
let app = express();

let minv = 0;
let maxv = 10;
let type = "Area";
app.use(logger("short"));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//req is info sending to server from client.
//res is info sending to client from server.
app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/type", function(req, res) {
  res.sendFile(path.resolve(__dirname, "type.html"));
});
app.get("/gettype", function(req, res) {
  res.json({ output: type });
});
app.get("/settype", function(req, res) {
  type = req.query.input;
  console.log("type = " + type);
});

app.get("/select", function(req, res) {
  if (type == "Area") {
    if (req.query.shape == "square")
      res.json({ output: req.query.num1 * req.query.num1 });
    else res.json({ output: req.query.num1 * req.query.num2 });
  } else {
    if (req.query.shape == "square") res.json({ output: req.query.num1 * 4 });
    else res.json({ output: req.query.num1 * 2 + req.query.num2 * 2 });
  }
});

//below is a wrapper of http.createServer(requestHandler).listen(3000);
app.listen(3000, function() {
  console.log("started on port 3000");
});
