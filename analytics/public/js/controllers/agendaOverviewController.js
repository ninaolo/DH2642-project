analytics.controller('agendaOverviewController', ['$scope', 'moment', 'agendaService', '$routeParams', 'activityService',
    function ($scope, moment, agendaService, $routeParams, activityService) {

        $scope.getAgenda = function () {
            agendaService.getAgendaWithID($routeParams.id)
                .success(function (response) {
                    $scope.chosenAgenda = response;
                    $scope.getAgendaActivities(response.id);
                    $scope.getAgendaUsers(response.id);
                });
        };

        $scope.getAgendaActivities = function (agendaId) {
            activityService.getAgendaActivities(agendaId).success(function (response) {
                $scope.getActivityTimes(response);
            });
        };

        $scope.getActivityTimes = function (activities) {
            var time = moment($scope.chosenAgenda.date);
            var duration = 0;
            for (var i = 0; i < activities.length; i++) {
                var from = time.clone().add(duration, 'minutes');
                var to = from.clone().add(activities[i].duration, 'minutes').format("HH:mm");
                activities[i].timeFrame = from.format("HH:mm") + " - " + to;
                duration += activities[i].duration;
            }
            $scope.activities = activities;
            console.log(activities);
        };

        $scope.getAgendaUsers = function(agendaId) {
            agendaService.getAgendaUsers(agendaId).success(function(response) {
                $scope.attendees = response;
            });
        };

    }]);