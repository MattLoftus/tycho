var craftModel = require('../models/craftModel.js');

module.exports = {

  getSpacecraftData = function (req, res) {
    craftModel.getcraftData(req.params.craftID, function (err, craftData) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(craftData);
      }
    });
  }
  
}