var orbitController = require('../controllers/orbitController.js');

module.exports = function (app) {

  app.get('vehicleTrajectory', orbitController.getVehicleTrajectory);
  
}