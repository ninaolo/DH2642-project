var analytics = angular.module('analytics', ['ngRoute', 'ngCookies', 'angularMoment']);

analytics.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/home.html'
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
        }).when('/profile/:id', {
            templateUrl: 'partials/profile.html',
            controller: 'profileController'
        }).when('/colleagues', {
            templateUrl: 'partials/colleagues.html',
            controller: 'colleaguesController'
        }).when('/agenda/new', {
            templateUrl: 'partials/agenda/new.html',
            controller: 'agendaController'
        }).when('/agenda/invite', {
            templateUrl: 'partials/agenda/calendarevent.html',
            controller: 'agendaController'
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


    $rootScope.addScrollMagic = function(id) {
        console.log(id);
        var controller = new ScrollMagic.Controller();
        var scene = new ScrollMagic.Scene({
            triggerElement: "#" + id,
            offset: -100
        })
            .setTween("#" + id, 2, {opacity: 1})
            //.addIndicators({name: id}) // add helpful indicators for debugging
            .addTo(controller);
    };


});

analytics.constant("moment", moment);

