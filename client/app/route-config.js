(function() {
  'use strict';

  angular.module('app')
    .config(config)
    .factory('AttachToken', AttachToken)
    .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$windowProvider'];

  function config($stateProvider, $urlRouterProvider, $httpProvider, $windowProvider) {
    $urlRouterProvider.otherwise(function ($injector, $location) {
      var window = $windowProvider.$get();
      var username = window.localStorage.username;
      if (username) {
        return '/mission';
      } else {
        return '/';
      }
    });

    // controllerAs determines how the controller's scope will be identified
    // in our html files
    $stateProvider
      .state('auth', {
        url: '/',
        templateUrl: 'app/auth/signin.html',
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
        templateUrl: 'app/mission/mission.html',
        controller: 'MissionController',
        controllerAs: 'mission',
        authenticate: true
      })
      .state('craft', {
        url: '/craft',
        templateUrl: 'app/capsule/capsule.html',
        controller: 'CraftController',
        controllerAs: 'craft',
        authenticate: true
      })
      .state('stage1', {
        url: '/stage1',
        templateUrl: 'app/stage1/stage1.html',
        controller: 'Stage1Controller',
        controllerAs: 'stage-1',
        authenticate: true
      })
      .state('stage2', {
        url: '/stage2',
        templateUrl: 'app/stage2/stage2.html',
        controller: 'Stage2Controller',
        controllerAs: 'stage1',
        authenticate: true
      })
      .state('orbit', {
        url: '/orbit',
        templateUrl: 'app/orbit/orbit.html',
        controller: 'OrbitController',
        controllerAs: 'orbit',
        authenticate: true
      })
      .state('engines', {
        url: '/engines',
        templateUrl: 'app/engines/engines.html',
        controller: 'EnginesController',
        controllerAs: 'engines',
        authenticate: true
      })
      .state('tanks', {
        url: '/tanks',
        templateUrl: 'app/tanks/tanks.html',
        controller: 'TanksController',
        controllerAs: 'tanks',
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
        $state.transitionTo('auth');
      }
    });
  }
})();
