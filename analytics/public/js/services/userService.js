analytics.factory('userService', function ($http, $rootScope) {

    var userService = {};

    userService.doLogin = function (loginData) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/login",
            method: "POST",
            data: {
                email: loginData.email,
                password: loginData.password
            }
        });
    };

    userService.doLogout = function () {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/logout",
            method: "GET"
        });
    };

    userService.checkLogin = function () {
        return $http.get(apiUrl + '/checklogin')
            .success(function (data) {
                if (data === "false") {
                    $rootScope.loggedIn = "false";
                    $rootScope.user = "";
                } else {
                    $rootScope.loggedIn = "true";
                    $rootScope.user = data;
                }
                console.log('check login: ' + $rootScope.loggedIn);
                console.log(data);
            });
    };

    userService.getUser = function (id) {
        return $http.get(apiUrl + '/users/' + id);
    };

    userService.register = function (registerData) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/users",
            method: "POST",
            data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
                password_confirmation: registerData.password_confirmation
            }
        });
    };

    return userService;

});
