(function() {
  'use strict';

  angular.module('app')
  .factory('Spacecraft', Spacecraft);

  function Spacecraft() {
    var services = {
      getCraftData: getCraftData 
    };

    return services;

    function getCraftData (missionID) {
      return $http.get('/spacecraft/data/' + missionID)
        .then(function successCallback (res) {
          return res.data;
        }, function errorCallback (res) {
          console.log("Error retrieving spacecraft data");
        });
    }
  }

})();