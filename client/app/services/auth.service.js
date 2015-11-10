(function() {
  'use strict';

  angular.module('app')
    .factory('Auth', Auth);

  Auth.$inject = ['$http', '$window', '$state', 'jwtHelper'];

  function Auth($http, $window, $state, jwtHelper) {
    var services = {
      signin: signin,
      signout: signout,
      signup: signup
    };

    return services;

    ///////////////////////
    /////AUTHENTICATION////
    ///////////////////////

    function signin(data) {
      return $http.post('/auth/signin', data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          throw res.status;
        });
    }

    function signout() {
      delete $window.localStorage.token;
      delete $window.localStorage.username;
      $state.transitionTo('auth');
    }

    function signup(data) {
      return $http.post('/auth/signup', data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          throw res.status;
        });
    }
  }

})();