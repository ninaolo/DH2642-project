analytics.controller('agendaController', function ($scope) {

    $scope.getAgendaTime = function (id) {
        var agendaTime = new Date($scope.date);
        for (var i = 0; i < id; i++) {
            agendaTime.setMinutes(agendaTime.getMinutes() + $scope.agenda[i].duration);
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
        $scope.endTime.setMinutes($scope.endTime.getMinutes() + activity.duration);
    };

    $scope.setStartAndEndTime = function () {
        $scope.date = new Date();
        $scope.date.setHours(8);
        $scope.date.setMinutes(0);
        $scope.date.setSeconds(0);
        $scope.endTime = new Date($scope.date);
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

        $scope.setStartAndEndTime();
    };

});
