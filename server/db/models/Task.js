const Sequelize = require('sequelize');
const { db } = require('./../db.js');

const { STRING } = Sequelize;

const Task = db.define('task', {
  taskDate: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    },
  },
  taskMonth: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30]
    }
  },
  taskDescription: {
    type: STRING,
    allowNull: false

  },
  taskTime: {
    type: STRING,
    allowNull: false

  },
  taskStatus: {
    type: STRING,
    allowNull: false
  }

});

module.exports = { Task };
