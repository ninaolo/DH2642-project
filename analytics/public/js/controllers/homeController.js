analytics.controller("homeController", ['$scope', 'userService',
    function ($scope, userService) {

        $scope.loggedInLoaded = false;
        $scope.loggedUserLoaded = false;
        $scope.loggedIn = false;
        $scope.loggedUser = "";

        userService.getLoggedIn().then(function (loggedIn) {
            $scope.loggedIn = loggedIn;
            $scope.loggedInLoaded = true;
        });

        userService.getLoggedUser().then(function(loggedUser) {
            $scope.loggedUser = loggedUser;
            $scope.loggedUserLoaded = true;
        });

    }]);