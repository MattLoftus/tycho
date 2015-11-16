var vehicleController = require('../controllers/vehicleController.js');

module.exports = function (app) {
  
  app.get('/engine/stage/:missionID/:stageID', vehicleController.getEngineForStage);

  app.get('/engine/all/:missionID', vehicleController.getAllEngines);

  app.get('/tank/:missionID/:tankID', vehicleController.getTankData);

}