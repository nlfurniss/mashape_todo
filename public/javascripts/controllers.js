'use strict';

var todoApp = angular.module('todoApp', []);

todoApp.controller('todoAppCtrl', function($scope, $http) {
    $scope.todos = window.initialData;

    $scope.create = function() {
        $http.post('/create');
    }

    $scope.update = function(id) {
        $http.put('/' + id);
    }

    $scope.delete = function(id) {
        console.log('delete: ' + id);
        //$http.delete('/' + id);
    }

});
