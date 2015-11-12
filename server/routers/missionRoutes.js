var missionController = require('../controllers/missionController.js');

module.exports = function (app) {
  
  app.get('meta', missionController.getMetaData);
  
}