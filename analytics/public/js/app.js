var analytics = angular.module('analytics', ['ngRoute', 'ngResource', 'ngCookies']);

analytics.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/home.html',
        }).when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'userController'
        }).when('/logout', {
            templateUrl: 'partials/logout.html',
            controller: 'userController'
        }).when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'userController'
        }).when('/info', {
            templateUrl: 'partials/info.html'
        }).when('/about', {
            templateUrl: 'partials/about.html'
        }).otherwise({
            redirectTo: '/login'
        });
    }]);

analytics.run(function($rootScope, $window) {

    $rootScope.redirectNotFound = function() {
        $rootScope.header = "Oops!";
        $rootScope.info = "An error occurred. The page you entered does not exist.";
        $window.location.href = "#/info";
    };

});

