const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const CalendarGraph = require('github-calendar-graph');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/graph/:account', cors(), (req, res) => {
	const { account } = req.params;
	CalendarGraph.fetch(account).then((graph) => {
		res.send(graph);
	});
});

app.get('/data/:account', cors(), (req, res) => {
	const { account } = req.params;
	CalendarGraph.fetch(account, true).then((data) => {
		res.json(data)
	});
});

http.listen(7774, function () {
	console.log('listening on http://127.0.0.1:7774');
});
