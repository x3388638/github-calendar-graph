const request = require('request');
const cheerio = require('cheerio');

function fetch(account, raw) {
	return new Promise((resolve, reject) => {
		request.get(`https://github.com/users/${account }/contributions`, (err, res, body) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(body);
		});
	}).then((document) => {
		const $ = cheerio.load(document);
		const $calendar = $('.js-calendar-graph-svg');
		if (raw) {
			const result = {};
			$calendar.find('g > g > rect').each((i, day) => {
				result[$(day).data('date')] = $(day).data('count');
			});

			return Promise.resolve(result);
		}

		const $container = $(`<div></div>`).append($calendar);
		const graph = `
			<div>
				<style>
					.js-calendar-graph-svg text.month { font-size: 10px; fill: #767676; }
					.js-calendar-graph-svg text.wday { font-size: 9px; fill: #767676; }
				</style>
				${ $container.html() }
			</div>
		`;

		return Promise.resolve(graph);
	});
}

module.exports = { fetch };
