//require the express nodejs module
var express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 8080;
	
var path = require("path");
var fs = require('fs');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//wait for a connection
app.listen(3030, function () {
  console.log('Server is running. Point your browser to: http://localhost:3030');
});

app.get('/', function(req, res){
	fs.readFile('www/html.html', function(err, data) {
		res.set("Content-Type", "text/html");
		res.send(data);
		res.status(200).end();
	});
});