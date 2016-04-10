analytics.controller("userController", function ($scope, $rootScope, userService, $window) {

    $scope.email = "";
    $scope.password = "";
    $scope.emailExists = "";

    $scope.doLogin = function (isValid) {
        if (isValid) {
            var data = {
                email: $scope.email,
                password: $scope.password
            };

            userService.doLogin(data)
                .success(function (response) {
                    $rootScope.loggedIn = "true";
                    $rootScope.user = response;
                    userService.checkLogin();
                    $window.location.href = "#/profile/" + $rootScope.user.id;
                })
                .error(function (data, status, headers) {
                    alert(data);
                })
        }
    };

    $scope.doLogout = function () {
        userService.doLogout().success(function (response) {
            $rootScope.header = response.header;
            $rootScope.info = response.info;
            $rootScope.loggedIn = "false";
            $rootScope.user = "";
            userService.checkLogin();
            $window.location.href = "#/info";
            console.log(response);
        }).error(function (data, status, headers) {
            //
        });
    };

    $scope.register = function () {
        var data = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password,
            password_confirmation: $scope.passwordConfirmation
        };
        userService.register(data).success(function (response) {
            $rootScope.header = response.header;
            $rootScope.info = response.info;
            $rootScope.user = response.user;
            userService.checkLogin();
            $window.location.href = "#/info";
        }).error(function (response) {
            $scope.emailExists = response.info;
        });
    };

});
