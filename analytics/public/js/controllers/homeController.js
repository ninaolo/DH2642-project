analytics.controller("homeController", function($scope, userService) {

    $scope.getLoggedIn = function() {
        return userService.getLoggedIn();
    };

    $scope.getLoggedUser = function() {
        return userService.getLoggedUser();
    };

});