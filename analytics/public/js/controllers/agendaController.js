analytics.controller('agendaController', ['$scope', 'moment', 'agendaService', 'userService', '$uibModal', '$log',
    function ($scope, moment, agendaService, userService, $uibModal, $log) {

        $scope.pickHour = agendaService.getStartHour();
        $scope.pickMinute = agendaService.getStartMinute();
        $scope.attendees = [];

        // Fetch all users for the instant search.
        userService.getUsers().success(function (response) {
            $scope.users = response;
        });

        // Get the logged in user's parked activities.
        agendaService.getActivities({
            'user_id': userService.getLoggedUser().id
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

        // This function is called from the droppable directive.
        $scope.handleDrop = function (id) {
            $scope.addToAgenda($scope.activities[id]);
        };

        $scope.newActivity = function () {
            alert("new");
        };

        $scope.addToAgenda = function (activity) {
            agendaService.addToAgenda(activity);
            agendaService.setEndTime(agendaService.getEndTime().add(activity.duration, 'minutes'));
        };

        $scope.addAttendee = function (user) {
            agendaService.addAttendee(user);
        };

        $scope.getAttendees = function() {
            return agendaService.getAttendees();
        };

        $scope.removeAttendee = function(id) {
            agendaService.removeAttendee(id);
        };

        $scope.modalUpdate = function (size,activity) {
            alert(activity.id);
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

                    $scope.editActivity = function() {
                       // alert(this.duration);
                        //alert(this.name);
                        alert("Update activity");
                        agendaService.updateActivity(this.name,this.duration,$scope.activity.id);
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

                    $scope.createActivity = function() {
                        alert(this.duration);
                        alert(this.name);
                        alert("create new activity");
                        agendaService.newActivity(this.name,this.duration);
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

        $scope.modalDelete= function (size, activity) {
            alert(activity.id);
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/agenda/deleteActivity.html',
                controller: function ($scope, $uibModalInstance,activity) {

                    $scope.ok = function () {
                        $uibModalInstance.close($scope.activity);
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.deleteActivity = function() {
                        alert("delete");
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

    }]);
