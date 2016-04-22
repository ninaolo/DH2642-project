analytics.controller("profileController", function ($scope, $routeParams, userService) {

    $scope.profileUser = {};
    $scope.eventSources = [];

    // Get profile user.
    userService.getUser($routeParams.id)
        .success(function (response) {
            $scope.profileUser = response;

        });

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

    $scope.listUpcomingEvents = function() {
        googleService.listUpcomingEvents($scope.handleUpcomingEvents);
    };

});