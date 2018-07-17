const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const Crawler = require('./Crawler');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/graph/:account', cors(), (req, res) => {
	const { account } = req.params;
	Crawler.fetch(account).then((graph) => {
		res.send(graph);
	});
});

app.get('/data/:account', cors(), (req, res) => {
	const { account } = req.params;
	Crawler.fetch(account, true).then((data) => {
		res.json(data)
	});
});

http.listen(7774, function () {
	console.log('listening on 127.0.0.1:7774');
});
