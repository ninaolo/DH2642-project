analytics.controller("colleaguesController", function($scope, userService) {

    $scope.colleagues = {};

    userService.getUsers()
        .success(function(users) {
            $scope.colleagues = users;
        });

});