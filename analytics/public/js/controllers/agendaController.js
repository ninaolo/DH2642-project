analytics.controller('agendaController', ['$scope', 'moment', 'agendaService', 'userService', '$uibModal', '$log',
    function ($scope, moment, agendaService, userService, $uibModal, $log) {

        $scope.pickHour = agendaService.getStartHour();
        $scope.pickMinute = agendaService.getStartMinute();
        $scope.attendees = [];
        $scope.name = "";
        $scope.description = "";
        $scope.date = agendaService.getDate();

        // Fetch all users for the instant search.
        userService.getUsers().success(function (response) {
            $scope.users = response;
        });

        // Get the logged in user's parked (unused) activities.
        agendaService.getActivities({
            'user_id': userService.getLoggedUser().id,
            'agenda_id': 0
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

        $scope.handleAgendaDrop = function (activity, index) {
            agendaService.addToAgenda(activity, index);
            agendaService.setEndTime(agendaService.getEndTime().add(activity.duration, 'minutes'));
            removeFromList(activity.id, $scope.activities);
        };

        $scope.handleActivitiesDrop = function (activity, index) {
            agendaService.setEndTime(agendaService.getEndTime().subtract(activity.duration, 'minutes'));
            agendaService.removeFromAgenda(activity.id);
            if (!idInList(activity.id, $scope.activities)) {
                if(index) {
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

        $scope.modalUpdate = function (size, activity) {
            $scope.selectedActivity = activity;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/agenda/editActivity.html',
                resolve: {
                    activity: function () {
                        return $scope.selectedActivity;
                    }
                },
                controller: function ($scope, $uibModalInstance, activity) {
                    $scope.activity = activity;

                    $scope.ok = function () {
                        $uibModalInstance.close($scope.activity);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.editActivity = function () {
                        agendaService.updateActivity({
                            'name': activity.name,
                            'duration': activity.duration
                        }, $scope.activity.id);
                    };
                },
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.modalNew = function (size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/agenda/newActivity.html',
                controller: function ($scope, $uibModalInstance) {

                    $scope.ok = function () {
                        $uibModalInstance.close($scope.activity);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.createActivity = function () {
                        agendaService.newActivity(this.name, this.duration);
                    };

                },
                size: size,
                resolve: {
                    activity: function () {
                        return $scope.selectedActivity;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.Delete = function (size, activity) {
            $scope.selectedActivity = activity;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/agenda/deleteActivity.html',
                resolve: {
                    activity: function () {
                        return $scope.selectedActivity;
                    }
                },
                controller: function ($scope, $uibModalInstance, activity) {
                    $scope.activity = activity;

                    $scope.ok = function () {
                        $uibModalInstance.close($scope.activity);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.editActivity = function () {
                        agendaService.removeActivity($scope.activity.id);
                    };
                },
                size: size
            });
        };


        $scope.modalDelete = function (size, activity) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/agenda/deleteActivity.html',
                controller: function ($scope, $uibModalInstance, activity) {

                    $scope.ok = function () {
                        $uibModalInstance.close($scope.activity);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.deleteActivity = function () {
                        agendaService.removeActivity($scope.activity.id);
                    };

                },
                size: size,
                resolve: {
                    activity: function () {
                        return $scope.selectedActivity;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.$watch('date', function () {
            agendaService.changeDate(moment($scope.date));
        });


    }]);
