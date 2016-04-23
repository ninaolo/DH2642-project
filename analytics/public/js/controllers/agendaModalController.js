analytics.controller('agendaModalController', ['$scope', '$uibModalInstance', 'agendaService', 'activity', 'agendaScope',
    function ($scope, $uibModalInstance, agendaService, activity, agendaScope) {
        $scope.activity = activity;

        $scope.range = function (a, b) {
            return range(a, b);
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.activity);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.editActivity = function () {
            console.log("edit");
            agendaService.updateActivity({
                'name': this.name,
                'duration': this.duration
            }, $scope.activity.id).success(function () {
                agendaScope.getActivities();
            });
        };

        $scope.createActivity = function () {
            agendaService.newActivity({
                'name': this.name,
                'duration': this.duration
            }).success(function () {
                agendaScope.getActivities();
            });
        };

        $scope.deleteActivity = function () {
            agendaService.deleteActivity($scope.activity.id).success(function() {
                agendaScope.getActivities();
            });
        };

    }]);