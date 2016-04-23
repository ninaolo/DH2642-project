analytics.controller('agendaModalController', ['$scope', '$uibModalInstance', 'agendaService', 'activity', 'agendaScope',
    function ($scope, $uibModalInstance, agendaService, activity, agendaScope) {
        $scope.activity = activity;
        $scope.wrongValuesMsg = "Please submit all values.";

        $scope.minuteRange = function (start, end) {
            var minutes = [];
            for (var i = start; i <= end; i++) {
                minutes.push(i);
            }
            return minutes;
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.activity);
            agendaScope.getActivities();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            agendaScope.getActivities();
        };

        $scope.editActivity = function (isValid) {
            if(isValid) {
                agendaService.updateActivity({
                    'name': $scope.activity.name,
                    'duration': $scope.activity.duration
                }, $scope.activity.id).success(function () {
                    agendaScope.getActivities();
                });
                $scope.ok();
            } else {
                $scope.error = $scope.wrongValuesMsg;
            }
        };

        $scope.createActivity = function (isValid) {
            if(isValid) {
                agendaService.newActivity({
                    'name': $scope.activity.name,
                    'duration': $scope.activity.duration
                }).success(function () {
                    agendaScope.getActivities();
                });
                $scope.ok();
            } else {
                $scope.error = $scope.wrongValuesMsg;
            }
        };

        $scope.deleteActivity = function () {
            agendaService.deleteActivity($scope.activity.id).success(function() {
                agendaScope.getActivities();
            });
        };

    }]);