# github-calendar-graph [![npm version](https://badge.fury.io/js/github-calendar-graph.svg)](https://badge.fury.io/js/github-calendar-graph)
Get the GitHub contributon calendar graph.  
  
## Demo
Append the calendar graph as you see at GitHub to everywhere you want.  
![demo](https://i.imgur.com/14y9I9O.png)  
  
## Install
```
$ npm install github-calendar-graph --save
```
  
## Usage
```javascript
const CalendarGraph = require('github-calendar-graph');

// get contribution graph
CalendarGraph.fetch('GITHUB ACCOUNT').then((data) => {
    console.log(data); // => string of HTML DOM
});

// get contribution count
CalendarGraph.fetch('GITHUB ACCOUNT', true).then((data) => {
    console.log(data); // => { 'DATE': 'CONTRIBUTION COUNT' }
    /*
    {
        '2018-07-01': 3,
        '2018-07-02': 1,
        '2018-07-03': 9,
        ...
    }
    */
});

```
