var vehicleModel = require('../models/vehicleModel.js');

module.exports = {

  getEngineForStage: function (req, res) {
    vehicleModel.getEngineForStage(req.params.missionID, req.params.stageID, function (err, engineData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(engineData);
      }
    });
  }, 

  getAllEngines: function (req, res) {
    vehicleModel.getAllEngines(req.params.missionID, function (err, engineData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(engineData);
      }
    });
  },

  getTankData: function (req, res) {
    vehicleModel.getTankData(req.params.missionID, function (err, tankData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(tankData);
      }
    });
  }
  
}