analytics.controller('agendaController', ['$scope', 'moment', 'agendaService', 'userService', '$uibModal', '$log', 'loggedUser',
    function ($scope, moment, agendaService, userService, $uibModal, $log, loggedUser) {

        $scope.pickHour = agendaService.getStartHour();
        $scope.pickMinute = agendaService.getStartMinute();
        $scope.attendees = [];
        $scope.name = "";
        $scope.description = "";
        $scope.date = agendaService.getDate();
        $scope.loggedUser = loggedUser;
		$scope.minDate = Date.now();

        // Fetch all users for the instant search.
        userService.getUsers().success(function (response) {
            $scope.users = response;
        });

        $scope.getActivities = function () {
            // Get the logged in user's parked (unused) activities.
            agendaService.getActivities({
                'user_id': loggedUser.id,
                'agenda_id': 0
            }).success(function (response) {
                $scope.activities = response;
            });
        };

        $scope.setNameAndDescription = function () {
            agendaService.setNameAndDescription($scope.name, $scope.description);
        };

        $scope.getDate = function () {
            return agendaService.getDate();
        };

        $scope.getEndTime = function () {
            return agendaService.getEndTime();
        };

        $scope.getAgenda = function () {
            return agendaService.getAgenda();
        };

        $scope.changeStartTime = function (pickHour, pickMinute) {
            agendaService.changeStartTime(pickHour, pickMinute);
        };

        $scope.getTotalTime = function () {
            return agendaService.getTotalTime();
        };

        $scope.getAgendaTime = function (id) {
            var agendaTime = agendaService.getDate().clone();
            for (var i = 0; i < id; i++) {
                agendaTime.add(agendaService.getAgenda()[i].duration, 'minutes');
            }
            return agendaTime;
        };

        $scope.range = function (a, b) {
            return range(a, b);
        };

        $scope.handleAgendaDrop = function (activity, index) {
            agendaService.addToAgenda(activity, index);
            agendaService.setEndTime(agendaService.getEndTime().add(activity.duration, 'minutes'));
            removeFromList(activity.id, $scope.activities);
        };

        $scope.handleActivitiesDrop = function (activity, index) {
            agendaService.setEndTime(agendaService.getEndTime().subtract(activity.duration, 'minutes'));
            agendaService.removeFromAgenda(activity.id);
            if (!idInList(activity.id, $scope.activities)) {
                if (index) {
                    $scope.activities.splice(index, 0, activity);
                } else {
                    $scope.activities.push(activity);
                }
            } else {
                removeFromList(activity.id, $scope.activities);
                if (index) {
                    $scope.activities.splice(index, 0, activity);
                } else {
                    $scope.activities.push(activity);
                }
            }
        };

        $scope.handleTrash = function (activity) {
            $scope.modalDelete('sm', activity);
        };

        $scope.addAttendee = function (user) {
            agendaService.addAttendee(user);
        };

        $scope.getAttendees = function () {
            return agendaService.getAttendees();
        };

        $scope.removeAttendee = function (id) {
            agendaService.removeAttendee(id);
        };

        $scope.createModal = function(partial, size, activity) {
            $scope.selectedActivity = activity;
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: partial,
                controller: 'agendaModalController',
                size: size,
                resolve: {
                    activity: function () {
                        return $scope.selectedActivity;
                    },
                    agendaScope: function() {
                        return $scope;
                    }
                }
            });
        };

        $scope.modalUpdate = function (size, activity) {
            $scope.createModal('partials/agenda/editActivity.html', size, activity);
        };

        $scope.modalNew = function (size) {
            $scope.createModal('partials/agenda/newActivity.html', size);
        };

        $scope.modalDelete = function (size, activity) {
            $scope.createModal('partials/agenda/deleteActivity.html', size, activity);
        };

        $scope.$watch('date', function () {
            agendaService.changeDate(moment($scope.date));
        });


    }]);
