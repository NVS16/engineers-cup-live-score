'use strict';

angular.module('scoreApp')
.service('drawservice',function(){   /* AngularJS service to check who is drawing */
    var hasJoinedRoom = false ; 

    return{
        getValue : function(){
            return hasJoinedRoom ;
        },
        changeValue : function(){
            hasJoinedRoom = !hasJoinedRoom ;
        }
    }
});