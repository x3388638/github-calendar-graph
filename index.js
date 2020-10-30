const request = require('request')
const cheerio = require('cheerio')

function fetch(account, raw, withColor) {
  return new Promise((resolve, reject) => {
    request.get(
      `https://github.com/users/${account}/contributions`,
      (err, res, body) => {
        if (err) {
          reject(err)
          return
        }

        resolve(body)
      }
    )
  }).then((document) => {
    const $ = cheerio.load(document)
    const $calendar = $('.js-calendar-graph-svg')
    if (raw) {
      return Promise.resolve(
        $calendar
          .find('g > g > rect')
          .toArray()
          .reduce((result, day) => {
            return Object.assign(result, {
              [$(day).data('date')]: withColor
                ? {
                    count: $(day).data('count'),
                    color: $(day).attr('fill')
                  }
                : $(day).data('count')
            })
          }, {})
      )
    }

    const $container = $(`<div></div>`).append($calendar)
    const graph = `
			<div>
        <style>
          :root {
            --color-calendar-graph-day-bg:#ebedf0;--color-calendar-graph-day-border:rgba(27,31,35,0.06);--color-calendar-graph-day-L1-bg:#9be9a8;--color-calendar-graph-day-L2-bg:#40c463;--color-calendar-graph-day-L3-bg:#30a14e;--color-calendar-graph-day-L4-bg:#216e39;--color-calendar-graph-day-L4-border:rgba(27,31,35,0.06);--color-calendar-graph-day-L3-border:rgba(27,31,35,0.06);--color-calendar-graph-day-L2-border:rgba(27,31,35,0.06);--color-calendar-graph-day-L1-border:rgba(27,31,35,0.06);
          }
					.js-calendar-graph-svg text.month { font-size: 10px; fill: #767676; }
					.js-calendar-graph-svg text.wday { font-size: 9px; fill: #767676; }
				</style>
				${$container.html()}
			</div>
		`

    return Promise.resolve(graph)
  })
}

module.exports = { fetch }
