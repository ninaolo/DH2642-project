analytics.controller('agendaController', function ($scope) {

    // This function is called from the droppable directive.
    $scope.handleDrop = function() {
        console.log("drop");
    };

    $scope.newActivity = function () {
        alert("new");
    };

    $scope.addToAgenda = function (activity) {
        alert("add");
        $scope.endTime.setMinutes($scope.endTime.getMinutes() + activity.duration);
    };

    $scope.setStartAndEndTime = function () {
        $scope.date = new Date();
        $scope.date.setHours(8);
        $scope.date.setMinutes(0);
        $scope.date.setSeconds(0);
        $scope.endTime = new Date($scope.date);
        $scope.totalTime = 0;
        for (var i = 0; i < $scope.agenda.length; i++) {
            $scope.endTime.setMinutes($scope.endTime.getMinutes() + $scope.agenda[i].duration);
            $scope.totalTime += $scope.agenda[i].duration;
        }
    };

    $scope.init = function () {

        $scope.activities = [
            {
                "name": "activity 1",
                "duration": 10
            },
            {
                "name": "activity 2",
                "duration": 20
            },
            {
                "name": "activity 3",
                "duration": 5
            }
        ];

        $scope.agenda = [
        ];

        $scope.setStartAndEndTime();
    };

});
