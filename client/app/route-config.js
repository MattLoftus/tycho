(function() {
  'use strict';

  angular.module('app')
    .config(config)
    .factory('AttachToken', AttachToken)
    .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$windowProvider'];

  function config($stateProvider, $urlRouterProvider, $httpProvider, $windowProvider) {
    // default path
    $urlRouterProvider.otherwise(function ($injector, $location) {
      var window = $windowProvider.$get();
      var username = window.localStorage.username;
      if (username) {
        return '/dashboard/' + username;
      } else {
        return '/';
      }
    });

    // controllerAs determines how the controller's scope will be identified
    // in our html files
    $stateProvider
      .state('auth', {
        url: '/',
        templateUrl: 'app/auth/auth.html',
        controller: 'AuthController',
        controllerAs: 'auth',
        authenticate: false
      })
      .state('oauth', {
        url: '/oauth/:token',
        controller: 'OAuthController',
        authenticate: false
      })
      .state('mission', {
        url: '/mission',
        views: {
          'nav': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'navbar'
          },
          '': {
            templateUrl: 'app/mission/mission.html',
            controller: 'MissionController',
            controllerAs: 'mission'
          }
        },
        authenticate: true
      })
      .state('capsule', {
        url: '/capsule',
        views: {
          'nav': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'navbar'
          },
          '': {
            templateUrl: 'app/capsule/capsule.html',
            controller: 'CapsuleController',
            controllerAs: 'capsule'
          }
        },
        authenticate: true
      })
      .state('stage-1', {
        url: '/stage-1',
        views: {
          'nav': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'navbar'            
          },
          '': {
            templateUrl: 'app/stage-1/stage-1.html',
            controller: 'Stage-1Controller',
            controllerAs: 'stage-1'
          }
        },
        authenticate: true
      })
      .state('stage-2', {
        url: '/stage-2',
        views: {
          'nav': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'navbar'            
          },
          '': {
            templateUrl: 'app/stage-2/stage-2.html',
            controller: 'Stage-2Controller',
            controllerAs: 'stage-1'
          }
        },
        authenticate: true
      })
      .state('orbit', {
        url: '/orbit',
        views: {
          'nav': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'navbar'            
          },
          '': {
            templateUrl: 'app/orbit/orbit.html',
            controller: 'OrbitController',
            controllerAs: 'orbit'
          }
        },
        authenticate: true
      });

      // auth interceptor to ensure JWT gets sent in request header
      $httpProvider.interceptors.push('AttachToken');
  }

  AttachToken.$inject = ['$window', '$q', '$injector'];

  function AttachToken($window, $q, $injector) {
    return {
      // find user's JWT in local storage and attach it to outgoing request
      request: function(object) {
        object.headers = object.headers || {};

        if ($window.localStorage.token) {
          object.headers.Authorization = 'Bearer ' + $window.localStorage.token;
        }

        return object;
      },
      // reroute user to login in authentication 
      response: function(response) {
        if (response.status === 401) {
          $injector.get('User').signout();
        }

        return response || $q.when(response);
      }
    };
  }

  run.$inject = ['$rootScope', '$state', '$window'];

  function run($rootScope, $state, $window) {
    // check for a token in local storage, redirect to sign in if there is none
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.authenticate && !$window.localStorage.token) {
        event.preventDefault();
        $state.transitionTo('splash');
      }
    });
  }
})();
