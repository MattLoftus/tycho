var craftController = require('../controllers/craftController.js');

module.exports = function (app) {

  app.get('/data/:missionID', craftController.getCraftData);
  
}