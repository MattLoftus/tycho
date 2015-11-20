var vehicleController = require('../controllers/vehicleController.js');

module.exports = function (app) {
  
  app.get('/engine/stage/:missionID/:stageNo', vehicleController.getEngineForStage);

  app.get('/engine/all/:missionID', vehicleController.getAllEngines);

  app.get('/tank/:missionID/:stageNo', vehicleController.getTankData);

}