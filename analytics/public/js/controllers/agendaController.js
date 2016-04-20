analytics.controller('agendaController', function ($scope, moment) {

    $scope.date = moment('08:00', 'hh:mm');
    $scope.endTime = $scope.date.clone();

    // A helper method for creating hour/minute ranges.
    $scope.range = function (start, end) {
        var rangeList = [];
        for (var i = 0; i <= (end - start); i++) {
            var digitWithLeadingZeros = (1e4 + "" + start + i).slice(-2);
            rangeList.push(digitWithLeadingZeros);
        }
        return rangeList;
    };

    $scope.changeStart = function(pickHour, pickMinute) {
        var duration = $scope.getTotalTime();
        $scope.date.hour(pickHour);
        $scope.date.minute(pickMinute);
        $scope.endTime = $scope.date.clone();
        $scope.endTime.add(duration);
    };

    $scope.pickHours = $scope.range(0, 23);
    $scope.pickHour = "";
    $scope.pickMinutes = $scope.range(0, 59);
    $scope.pickHour = "";

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

    $scope.init = function () {

        $scope.activities = [
            {
                "id": 3,
                "name": "activity 1",
                "duration": 10
            },
            {
                "id": 44,
                "name": "activity 2",
                "duration": 20
            },
            {
                "id": 2,
                "name": "activity 3",
                "duration": 5
            }
        ];

        $scope.agenda = [];

    };

});
