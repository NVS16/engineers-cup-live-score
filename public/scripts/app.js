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
      .when('/fixtures', {
        templateUrl: 'views/fixtures.html',
        controller: 'FixtureCtrl',
        controllerAs: 'fix'
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
      .when('/adminlogin', {
        templateUrl: 'views/adminlogin.html',
        controller: 'AdminLoginCtrl',
        controllerAs: 'adminlogin'
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
      .when('/basketball', {
        templateUrl: 'views/basketball.html',
        controller: 'BasketballCtrl',
        controllerAs: 'basketball'
      })
      .when('/cricket', {
        templateUrl: 'views/cricket.html',
        controller: 'CricketCtrl',
        controllerAs: 'cricket'
      })
      .when('/volleyball', {
        templateUrl: 'views/volleyball.html',
        controller: 'VolleyballCtrl',
        controllerAs: 'volleyball'
      })
      .otherwise({
       templateUrl : "../404.html"
      });
  });
