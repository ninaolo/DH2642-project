analytics.controller('navController', function($scope, $http, $rootScope, userService) {

    userService.checkLogin();

});
