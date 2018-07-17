const request = require('request');
const cheerio = require('cheerio');

function fetch(account, raw) {
	return new Promise((resolve, reject) => {
		request.get(`https://github.com/${ account }`, (err, res, body) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(body);
		});
	}).then((document) => {
		const $ = cheerio.load(document);
		const $calendar = $('.calendar-graph');
		if (raw) {
			const result = {};
			$calendar.find('svg > g > g').each((i, week) => {
				$(week).find('rect').each((i, day) => {
					result[$(day).data('date')] = $(day).data('count');
				});
			});

			return Promise.resolve(result);
		}

		const $container = $(`<div></div>`).append($calendar);
		const graph = `<div>
			<style>
				.calendar-graph text.month { font-size: 10px; fill: #767676; }
				.calendar-graph text.wday { font-size: 9px; fill: #767676; }
			</style>
			${ $container.html() }
		`;

		return Promise.resolve(graph);
	});
}

module.exports = { fetch };
