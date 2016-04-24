analytics.directive('agendaDetails', function () {
    return {
        restrict: 'E',
        scope: {
            'date' : '=',
            'endTime' : '='
        },
        templateUrl: 'js/directives/agendaDetails.html'
    }
});