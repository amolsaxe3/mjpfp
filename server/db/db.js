const Sequelize = require('sequelize');
const chalk = require('chalk');
const PG_URI =
  process.env.DATABASE_URL || 'postgres://localhost:5432/calendar';
const db = new Sequelize(PG_URI, { logging: false });

const syncAndSeed = async () => {
  try {
    await db.sync({
      force: true,
    });
  } catch (err) {
    console.log(chalk.red(err, err.message));
  }
};

module.exports = {
  syncAndSeed,
  db
};
