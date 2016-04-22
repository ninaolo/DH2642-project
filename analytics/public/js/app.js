var analytics = angular.module('analytics', ['ngRoute', 'ngCookies', 'angularMoment', 'ui.bootstrap', 'ui.calendar']);

analytics.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeController'
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
        }).when('/agenda/google', {
            templateUrl: 'partials/agenda/google.html',
            controller: 'googleController'
        }).otherwise({
            redirectTo: '/login'
        });
    }]);

analytics.run(function ($rootScope, $window, userService, agendaService) {

    // Check if user is logged in and set userService state variables.
    userService.checkLogin();

    $rootScope.redirectNotFound = function () {
        $rootScope.header = "Oops!";
        $rootScope.info = "An error occurred. The page you entered does not exist.";
        $window.location.href = "#/info";
    };

    $rootScope.addScrollMagic = function (id) {
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

    agendaService.resetState();

});

function initGapi() {
    var apisToLoad = 1; // must match nr of calls to gapi.client.load()
    var googleCallback = function () {
        if (--apisToLoad == 0) {
            // Manual bootstraping of the application, since gapi needs to load first
            // Note: there are many ways to solve the problem that gapi becomes undefined since it loads after
            // AngularJs, but this is one way to solve the problem and bootstrap the app _after_ gapi has loaded.
            var $injector = angular.bootstrap(document, ["analytics"]);
            console.log("Completed bootstrap of Meeter.");
        }
    };
    //gapi.client.setApiKey(CLIENT_ID);
    gapi.client.load("calendar", "v3", googleCallback);
}

// For handling dates.
analytics.constant("moment", moment);

// A little helper function for finding an id in a list of JSON objects.
// This requires the JSON to have the property 'id'.
var idInList = function (id, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return true;
        }
    }
    return false;
};

// A little helper function for removing an entry with an id in a list of JSON objects.
// This requires the JSON to have the property 'id'.
var removeFromList = function(id, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1);
        }
    }
};