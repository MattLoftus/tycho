(function() {
  'use strict';

  angular.module('app')
  .factory('Mission', Mission);

  Mission.$inject = ['$http'];

  function Mission ($http) {
    var services = {
      getMissionMeta: getMissionMeta
      // getOrbital: getOrbital
    };

    return services;

    function getMissionMeta (missionID) {
      return $http.get('/mission/meta/' + missionID)
        .then(function successCallback (res) {
          return res.data;
        }, function errorCallback (res) {
          console.log("Error getting mission meta data");
        });
    }

    // function getOrbital (missionID) {
    //   return $http.get('/orbit/data/' + missionID)
    //     .then(function successCallback (res) {
    //       return res.data;
    //     }, function errorCallback (res) {
    //       console.log("Error getting orbital data");
    //     });
    // }
  }

})();