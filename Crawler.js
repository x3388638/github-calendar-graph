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
		if (raw) {
			// TODO: parse DOM to data
			return Promise.resolve({
				'2018-07-17': 4
			});
		}

		const $container = $(`<div></div>`).append($('.calendar-graph'));
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
