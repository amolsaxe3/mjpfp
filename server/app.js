const path = require('path');
const express = require('express');
const app = express();
// Do not touch this file
const { Task } = require('./db/index.js');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const paginate = (pageNum, pageSize) => {
  return { limit: pageSize, offset: pageNum * pageSize };
};

app.get('/api/months/:month?', (req, res, next) => {
  const resultsPerPage = 50;
  // pageNum is zero indexed
  let month = req.params.page;
  if (month === undefined) {
    var check = moment(moment(), 'YYYY/MM/DD');
    month = check.format('M');
  };
});



  module.exports = { app };

//   const { limit, offset } = paginate(pageNum, resultsPerPage);
//   Employee.findAndCountAll({
//     limit,
//     offset,
//     order: [
//       ['firstName', 'asc'],
//       ['lastName', 'asc'],
//     ],
//   }).then(results => {
//     res.status(200).send(results);
//   });
