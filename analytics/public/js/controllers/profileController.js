analytics.controller("profileController", function ($scope, $routeParams, userService) {

    $scope.profileUser = {};

    // Get profile user.
    userService.getUser($routeParams.id)
        .success(function (response) {
            $scope.profileUser = response;

        });


});