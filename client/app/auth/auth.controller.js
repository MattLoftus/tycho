(function() {
  'use strict';

  angular.module('app')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$window', '$state', 'jwtHelper', 'User'];

  function AuthController($window, $state, jwtHelper, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    // vm.message = '';
    vm.signin = signin;
    vm.missionID = 1;
    vm.user = {
      username: "mattloftus",
      password: "space"
    };

    vm.gitHover = false;

    vm.gitActive = function () {
      console.log("I fired")
      vm.gitActive = !vm.gitActive;
    };

    function resetForm(message) {
      vm.form.$setPristine();
      vm.user.password = '';
      vm.message = message;
      setTimeout(function() { vm.message = ''; }, 1000);
    }

    function saveToken(token) {
      // save JWT and user info to local storage
      $window.localStorage.token = token;
      var tokenPayload = jwtHelper.decodeToken(token);
    }

    function signin() {
      $window.localStorage.missionID = vm.missionID;
      User.signin(vm.user)
        .then(function(data) {
          saveToken(data.token);
          $state.transitionTo('mission');
        })
        .catch(function(status) {
          if (status === 404) {
            resetForm('Username not found');
          } else if (status === 422) {
            resetForm('Incorrect password');
          } else {
            resetForm('Login failed. Please try again.');
          }
        });
    }

  }
})();
