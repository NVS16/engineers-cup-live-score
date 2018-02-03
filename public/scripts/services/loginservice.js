'use strict';

angular.module('scoreApp')
.service('loginservice',function(){   /* AngularJS service to check who is drawing */
    this.isAdmin = false ; 
    this.setAdmin = function() {
        this.isAdmin = !this.isAdmin;
    };
});