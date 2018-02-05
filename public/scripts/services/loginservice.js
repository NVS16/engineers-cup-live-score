'use strict';

angular.module('scoreApp')
    .service('loginservice', function () {   /* AngularJS service to check who is drawing */
        var isAdmin = false;

        return {

            isLoggedIn: function () {
                return isAdmin;
            },
            setAdmin: function () {
                isAdmin = !isAdmin;
            }

        }
    });