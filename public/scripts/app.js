'use strict';

/**
 * @ngdoc overview
 * @name scoreApp
 * @description
 * # staticApp
 *
 * Main module of the application.
 */

window.onbeforeunload = function () {return false;}

var socket = io();

angular
  .module('scoreApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashCtrl',
        controllerAs: 'dash'
      })
      .when('/football', {
        templateUrl: 'views/football.html',
        controller: 'FootballCtrl',
        controllerAs: 'football'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .when('/tennis', {
        templateUrl: 'views/tennis.html',
        controller: 'TennisCtrl',
        controllerAs: 'tennis'
      })
      .when('/badminton', {
        templateUrl: 'views/badminton.html',
        controller: 'BadmintonCtrl',
        controllerAs: 'badminton'
      })
      .otherwise({
       templateUrl : "../404.html"
      });
  });
