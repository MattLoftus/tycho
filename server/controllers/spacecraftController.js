var spacecraftModel = require('../models/spacecraftModel.js');

module.exports = {

  getSpacecraftData = function (req, res) {
    spacecraftModel.getSpacecraftData(req.params.spacecraftID, function (err, spacecraftData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(spacecraftData);
      }
    });
  }
  
}