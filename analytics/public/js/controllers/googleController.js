analytics.controller('googleController', ['$scope', 'moment', 'agendaService', 'googleService',
    function ($scope, moment, agendaService, googleService) {

        $scope.authOkay = false;
        $scope.event = {};
        $scope.eventCreated = false;

        $scope.checkAuth = function() {
            googleService.authorize(true, $scope.handleAuthResult);
        };

        $scope.handleAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                $scope.$apply(function() {
                    $scope.authOkay = true;
                });
                $scope.createCalendarEvent();
            } else {
                $scope.$apply(function() {
                    $scope.authOkay = false;
                });
            }
        };

        $scope.handleAuthClick = function() {
            googleService.authorize(false, $scope.handleAuthResult);
            return false;
        };

        $scope.createCalendarEvent = function() {
            var event = {
                'summary': agendaService.getName(),
                'description': agendaService.getDescription(),
                'start': {
                    'dateTime': agendaService.getDate().toISOString()
                },
                'end': {
                    'dateTime': agendaService.getEndTime().toISOString()
                },
                'attendees': agendaService.getAttendeeEmails()
            };
            googleService.createCalendarEvent(event, $scope.handleCalendarEvent);
        };

        $scope.handleCalendarEvent = function(createdEvent) {
            if (createdEvent !== undefined) {
                $scope.$apply(function() {
                    $scope.eventCreated = true;
                    $scope.event = createdEvent;
                });
                agendaService.newAgenda().success(function() {
                    agendaService.resetState();
                });

            } else {
                $scope.$apply(function() {
                    $scope.eventCreated = false;
                    $scope.event = createdEvent;
                });
            }
        };

    }]);