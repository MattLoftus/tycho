var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    database: 'tycho'
});

connection.connect(function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Database is connected');
  }
});

module.exports = connection;