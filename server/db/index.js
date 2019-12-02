const { db, syncAndSeed} = require('./db.js');
const { Task } = require('./models/Task.js');

module.exports = { db, syncAndSeed, Task };
