var vehicleController = require('../controllers/vehicleController.js');

module.exports = function (app) {
  
  app.get('vehicleData', vehicleController.getVehicleData);

}