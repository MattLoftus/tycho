(function() {
  'use strict';

  angular.module('app')
  .factory('Vehicle', Vehicle);

  Vehicle.$inject = ['$http'];

  function Vehicle($http) {
    var services = {
      getEngineForStage: getEngineForStage,
      getAllEngines: getAllEngines,
      getTankData: getTankData 
    };

    return services;

    //engine and tank functions

    function getEngineForStage (missionID, stageID) {
      return $http.get('/vehicle/engine/stage/' + missionID + '/' + stageID)
        .then(function successCallback (res) {
          return res.data;
        }, function errorCallback (res) {
          console.lof("Error retrieving engine data for current stage");
        });
    }

    function getAllEngines (missionID) {
      return $http.get('/vehicle/engine/all/' + missionID)
        .then(function successCallback (res) {
          return res.data;
        }, function errorCallback (res) {
          console.log("Error retrieving all engine data");
        })
    }

    function getTankData (missionID, stageID) {
      return $http.get('/vehicle/tank/' + missionID + '/' + stageID)
        .then(function successCallback (res) {
          return res.data;
        }, function errorCallback (res) {
          console.log("Error retrieving tank data for stage");
        });
    }
  }

})();