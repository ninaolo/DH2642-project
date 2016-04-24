analytics.controller("profileController", ['$scope', '$routeParams', 'userService', 'agendaService', 'moment', 'loggedUser',
    function ($scope, $routeParams, userService, agendaService, moment, loggedUser) {

        $scope.profileUser = {};
        $scope.agendas = {};
        $scope.agendasAreLoaded = false;
        $scope.dt = new Date(); // Today.

        // Get profile user.
        userService.getUser($routeParams.id)
            .success(function (response) {
                $scope.profileUser = response;

            });

        agendaService.getAgendas(loggedUser.id).success(function (response) {
            for (var i = 0; i < response.length; i++) {
                var key = moment(response[i].date).format('YYYYMMDD');
                if (!(key in $scope.agendas)) {
                    $scope.agendas[key] = [];
                    $scope.agendas[key].push(response[i]);
                } else {
                    $scope.agendas[key].push(response[i]);
                }
            }
            $scope.agendasAreLoaded = true; // To make sure calendar is loaded after agendas are fetched.
        });

        $scope.handleUpcomingEvents = function (events) {
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

        $scope.listUpcomingEvents = function () {
            googleService.listUpcomingEvents($scope.handleUpcomingEvents);
        };

        // Check if day has agendas. If so, set the has-agendas CSS class.
        $scope.getDayClass = function (dateString) {
            var date = moment(dateString).format("YYYYMMDD");
            if ($scope.agendas[date]) {
                return 'has-agendas'
            }
            return '';
        };

        // Change dates to $scope.agendas to get real results.
        $scope.clicked = function (inputDate) {
            $scope.dt = inputDate;
            var key = moment(inputDate).format('YYYYMMDD');
            var tempAgendas = $scope.agendas[key];
            if(tempAgendas) {
                tempAgendas.sort(function(a, b) {
                    var lhs = moment(a.date);
                    var rhs = moment(b.date);
                    return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
                });
                $scope.foundAgendas = tempAgendas;
            } else {
                $scope.foundAgendas = [];
            }

        };

    }]);