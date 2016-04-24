analytics.controller("colleaguesController", function($scope, userService) {

    $scope.colleagues = {};
    $scope.showSpinner = true;

    userService.getUsers()
        .success(function(users) {
            $scope.colleagues = users;
            $scope.showSpinner = false;
        });
});