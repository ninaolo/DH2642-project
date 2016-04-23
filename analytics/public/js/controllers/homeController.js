analytics.controller("homeController", ['$scope', 'userService', function ($scope, userService) {

        $scope.getLoggedIn = function () {
            return userService.getLoggedIn().value;
        };

        $scope.getLoggedUser = function () {
            return userService.getLoggedUser().value;
        };

    }]);