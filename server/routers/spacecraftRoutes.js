var spacecraftController = require('../controllers/spacecraftController.js');

module.exports = function (app) {

  app.get('spacecraftData', spacecraftController.getSpacecraftData);
  
}