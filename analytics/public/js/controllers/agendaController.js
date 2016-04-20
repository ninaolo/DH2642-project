analytics.controller('agendaController', ['$scope', 'moment', 'userService', 'activityService',
    function ($scope, moment, userService, activityService) {

        $scope.pickHour = "08";
        $scope.pickMinute = "00";
        $scope.date = moment($scope.pickHour + ":" + $scope.pickMinute, 'HH:mm');
        $scope.endTime = $scope.date.clone();
        $scope.attendees = [];
        $scope.agenda = [];

        // Fetch all users for the instant search.
        userService.getUsers().success(function (response) {
            $scope.users = response;
        });

        activityService.getActivities({
            'user_id': userService.getUser().id
        }).success(function (response) {
            $scope.activities = response;
        });

        // A helper method for creating hour/minute ranges.
        $scope.range = function (start, end) {
            var rangeList = [];
            for (var i = 0; i <= (end - start); i++) {
                var digitWithLeadingZeros = (1e4 + "" + start + i).slice(-2);
                rangeList.push(digitWithLeadingZeros);
            }
            return rangeList;
        };

        $scope.changeStart = function (pickHour, pickMinute) {
            var duration = $scope.getTotalTime();
            $scope.date.hour(pickHour);
            $scope.date.minute(pickMinute);
            $scope.endTime = $scope.date.clone();
            $scope.endTime.add(duration);
        };

        $scope.getTotalTime = function () {
            return moment.duration(moment($scope.endTime).diff(moment($scope.date)));
        };

        $scope.getAgendaTime = function (id) {
            var agendaTime = $scope.date.clone();
            for (var i = 0; i < id; i++) {
                agendaTime.add($scope.agenda[i].duration, 'minutes');
            }
            return agendaTime;
        };

        // This function is called from the droppable directive.
        $scope.handleDrop = function (id) {
            $scope.addToAgenda($scope.activities[id]);
        };

        $scope.newActivity = function () {
            alert("new");
        };

        $scope.addToAgenda = function (activity) {
            $scope.agenda.push(activity);
            $scope.endTime.add(activity.duration, 'minutes');
        };

    }]);
