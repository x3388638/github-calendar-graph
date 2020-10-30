const CalendarGraph = require('./index')
const moment = require('moment')
const cheerio = require('cheerio')

test('Get contribution data', (done) => {
  CalendarGraph.fetch('x3388638', true).then((data) => {
    expect(typeof data).toBe('object')
    expect(Object.keys(data).length).toBeGreaterThanOrEqual(360)
    expect(Object.keys(data).every((date) => moment(date).isValid)).toBeTruthy()
    expect(Object.keys(data).every((date) => !isNaN(data[date]))).toBeTruthy()
    done()
  })
})

test('Get contribution data with color', (done) => {
  CalendarGraph.fetch('x3388638', true, true).then((data) => {
    expect(typeof data).toBe('object')
    expect(Object.keys(data).length).toBeGreaterThanOrEqual(360)
    expect(Object.keys(data).every((date) => moment(date).isValid)).toBeTruthy()
    expect(
      Object.keys(data).every(
        (date) =>
          !isNaN(data[date].count) && typeof data[date].color === 'string'
      )
    ).toBeTruthy()
    done()
  })
})

test('Get contribution graph', (done) => {
  CalendarGraph.fetch('x3388638').then((data) => {
    const $ = cheerio.load(data)
    const $calendar = $('.js-calendar-graph-svg')
    const $day = $calendar.find('g > g > rect')
    expect(typeof data).toBe('string')
    expect($calendar.length).toBeGreaterThan(0)
    expect($day.length).toBeGreaterThan(360)
    done()
  })
})
