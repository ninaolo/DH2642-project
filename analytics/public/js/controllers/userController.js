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
                    userService.setLoggedIn("true");
                    userService.setLoggedUser(response);
                    userService.checkLogin();
                    $window.location.href = "#/profile/" + response.id;
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
            userService.setLoggedIn("false");
            userService.setLoggedUser("");
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
            userService.setLoggedUser(response.user);
            userService.checkLogin();
            $window.location.href = "#/info";
        }).error(function (response) {
            $scope.emailExists = response.info;
        });
    };

});
