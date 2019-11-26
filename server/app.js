const Sequelize = require('sequealize');

const db = new Sequelize('postgres://localhost:5432/calendar');

const express = require('express');

const path = require('path');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, './static')))
app.listen(PORT, () => console.log('Started, listening on PORT 3000');

module.exports = db;