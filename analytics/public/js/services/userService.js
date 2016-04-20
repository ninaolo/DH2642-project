analytics.factory('userService', function ($http) {

    var userService = {};
    var loggedIn = false;
    var loggedUser = {};

    userService.setLoggedIn = function(val) {
        loggedIn = val;
    };

    userService.setLoggedUser = function(u) {
        loggedUser = u;
    };

    userService.getLoggedUser = function() {
        return loggedUser;
    };

    userService.getLoggedIn = function() {
        return loggedIn;
    };

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
                   loggedIn = "false";
                    loggedUser = "";
                } else {
                    loggedIn = "true";
                    loggedUser = data;
                }
                console.log('check login: ' + loggedIn);
                console.log(data);
            });
    };

    userService.getUser = function (id) {
        return $http.get(apiUrl + '/users/' + id);
    };

    userService.getUsers = function () {
        return $http.get(apiUrl + '/users');
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
