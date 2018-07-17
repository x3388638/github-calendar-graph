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

		return Promise.resolve($('.calendar-graph').html());
	});
}

module.exports = { fetch };
