const { app } = require('./app');
const { syncAndSeed } = require('./db/index.js');
const PORT = process.env.PORT || 3000;

// Do not touch this file
syncAndSeed()
  .then(() => {
    app.listen(PORT, () => {
      console.log('listening on port:', PORT);
      console.log('click me --->', `http://localhost:${PORT}`);
    });
  })
  .catch(e => {
    console.log('connection error', e);
  });