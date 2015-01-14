'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('overview', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('average', {
                url: '/average',
                templateUrl: 'templates/average.html'
            })
            .state('percentage', {
                url: '/percentage',
                templateUrl: 'templates/percentage.html' 
            })
            .state('details', {
                url: '/details',
                templateUrl: 'templates/details.html'
            });
    }
]);
