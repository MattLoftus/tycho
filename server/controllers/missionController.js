var missionModel = require('../models/missionModel.js');

module.exports = {

    getMetaData: function (req, res) {
      missionModel.getMetaData(req.params.missionID, function (err, missionMeta) {
        if (err) {
          console.error(err);
          res.status(404).send(err)
        } else {
          res.status(200).json(missionMeta);
        }
      });
    }

}