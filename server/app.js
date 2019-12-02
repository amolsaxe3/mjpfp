const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
const { Task } = require('./db/index.js');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const paginate = (pageNum, pageSize) => {
  return { limit: pageSize, offset: pageNum * pageSize };
};

app.get('/api/months/:month?', (req, res, next) => {
  const requestedMonth = req.params.month;
  Task.findAll({
    taskMonth: requestedMonth
  }).then(tasks => {
    res.send(tasks);
  })
});

app.post('/api/createTask', (req, res, next) => {
  console.log('req.body is: ', req.body)
  const taskUserSent = req.body
  const check = moment(taskUserSent.date, 'YYYY/MM/DD');
  const month = check.format('M');
  Task.create({
    taskDate: taskUserSent.date,
    taskDescription: taskUserSent.description,
    taskTime: taskUserSent.time,
    taskMonth: month,
    taskStatus: 'new'
  }).then(res.send(200))
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
