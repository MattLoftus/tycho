var vehicleModel = require('../models/vehicleModel.js');

module.exports = {

  getVehicleData: function (req, res) {
    vehicleModel.getVehicleData(req.params.vehicleID, function (err, vehicleData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(vehicleData);
      }
    });
  }
  
}