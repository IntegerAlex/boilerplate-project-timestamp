// index.js
var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  let inputDate = req.params.date;
  
  if (!inputDate) {
    inputDate = new Date();
  } else if (/\d{5,}/.test(inputDate)) {
    inputDate = parseInt(inputDate);
  } else {
    inputDate = new Date(inputDate);
  }
  
  const dateObject = new Date(inputDate);
  
  if (dateObject.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString()
    });
  }
});

// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
