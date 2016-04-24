analytics.controller('agendaOverviewController', ['$scope', 'moment', 'agendaService', '$routeParams', 'activityService', '$window',
    function ($scope, moment, agendaService, $routeParams, activityService, $window) {

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
            $scope.agenda = activities; // This is the 'original' agenda.
            var time = moment($scope.chosenAgenda.date);
            var duration = 0;
            for (var i = 0; i < activities.length; i++) {
                var from = time.clone().add(duration, 'minutes');
                var to = from.clone().add(activities[i].duration, 'minutes').format("HH:mm");
                activities[i].timeFrame = from.format("HH:mm") + " - " + to;
                duration += activities[i].duration;
            }
            $scope.activities = activities; // Agenda but with a timeFrame duration.
            console.log(activities);
        };

        $scope.getAgendaUsers = function(agendaId) {
            agendaService.getAgendaUsers(agendaId).success(function(response) {
                $scope.attendees = response;
            });
        };

        $scope.edit = function() {
            agendaService.setEdit(true, $scope.chosenAgenda.id);
            agendaService.setDate(moment($scope.chosenAgenda.date));
            agendaService.setEndTime(moment($scope.chosenAgenda.enddate));
            agendaService.setName($scope.chosenAgenda.name);
            agendaService.setDescription($scope.chosenAgenda.description);
            agendaService.setAgenda($scope.agenda);
            agendaService.setAttendees($scope.attendees);
            var googleUrl = "https://www.google.com/calendar/event?eid=";
            agendaService.setGoogleId($scope.chosenAgenda.google_id);
            $window.location.href = "#/agenda/new";
        };

    }]);