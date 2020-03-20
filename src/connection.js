const { connect } = require('mongoose');

module.exports = (dbURL, options = {}) => {
  connect(
    dbURL,
    options
  )
    .then((db) => {
      console.log(`Connected to ${dbURL}.`);
      return db;
    })
    .catch((err) => {
      if (err.message.code === 'ETIMEDOUT') {
        console.log('Attempting to re-establish database connection.');
        connect(dbURL);
      } else {
        console.log('Error while attempting to connect to database:');
        console.log(err);
      }
    });
};