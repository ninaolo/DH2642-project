analytics.controller('agendaModalController', ['$scope', '$uibModalInstance', 'agendaService', 'activity',
    function ($scope, $uibModalInstance, agendaService, activity) {
        $scope.activity = activity;

        $scope.range = function(a, b) {
            return range(a, b);
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.activity);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.editActivity = function () {
            agendaService.updateActivity({
                'name': this.name,
                'duration': this.duration
            }, $scope.activity.id);
        };

        $scope.createActivity = function () {
            agendaService.newActivity({
                'name': this.name,
                'duration': this.duration
            });
        };
    }]);