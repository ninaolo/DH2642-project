analytics.controller("homeController", ['$scope', 'userService',
    function ($scope, userService) {

        $scope.getLoggedIn = function () {
            return userService.getLoggedIn().$$state.value;
        };

        $scope.getLoggedUser = function () {
            return userService.getLoggedUser().$$state.value;
        };

    }]);