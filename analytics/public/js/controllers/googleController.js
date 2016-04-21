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
                console.log("success");
                $scope.$apply(function() {
                    $scope.authOkay = true;
                });
                $scope.createCalendarEvent();
                //$scope.listUpcomingEvents();
            } else {
                console.log("fail");
                $scope.$apply(function() {
                    $scope.authOkay = false;
                });
            }
        };

        $scope.handleAuthClick = function() {
            googleService.authorize(false, $scope.handleAuthResult);
            return false;
        };

        $scope.listUpcomingEvents = function() {
            googleService.listUpcomingEvents($scope.handleUpcomingEvents);
        };

        $scope.handleUpcomingEvents = function(events) {
            console.log('Upcoming events:');

            if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }
                    console.log(event.summary + ' (' + when + ')')
                }
            } else {
                console.log('No upcoming events found.');
            }
        };

        $scope.createCalendarEvent = function() {
            var event = {
                'summary': 'Ett testevent',
                'location': 'Test',
                'description': 'Test',
                'start': {
                    'dateTime': '2016-04-22T09:00:00-07:00',
                    'timeZone': 'America/Los_Angeles'
                },
                'end': {
                    'dateTime': '2016-04-22T17:00:00-07:00',
                    'timeZone': 'America/Los_Angeles'
                },
                'attendees': [
                ],
                'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                    ]
                }
            };

            googleService.createCalendarEvent(event, $scope.handleCalendarEvent);
        };

        $scope.handleCalendarEvent = function(createdEvent) {
            if (createdEvent !== undefined) {
                console.log('Event created: ' + createdEvent.htmlLink);
                console.log(createdEvent);
                $scope.$apply(function() {
                    $scope.eventCreated = true;
                    $scope.event = createdEvent;
                });
            } else {
                $scope.$apply(function() {
                    $scope.eventCreated = false;
                    $scope.event = createdEvent;
                });
            }
        };

    }]);