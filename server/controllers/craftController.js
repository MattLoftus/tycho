var craftModel = require('../models/craftModel.js');

module.exports = {

  getCraftData: function (req, res) {
    craftModel.getCraftData(req.params.missionID, function (err, craftData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(craftData[0]);
      }
    });
  }, 

  getCraftEngineData: function (req, res) {
    craftModel.getCraftEngineData(req.params.missionID, function (err, engineData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(engineData[0]);
      }
    });
  },

  getCraftTankData: function (req, res) {
    craftModel.getCraftTankData(req.params.missionID, function (err, tankData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(tankData[0]);
      }
    });
  }
  
}