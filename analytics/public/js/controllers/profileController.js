analytics.controller("profileController", function ($scope, $routeParams, userService,agendaService) {

    $scope.profileUser = {};
    $scope.dates = { 20160423:
    [{ name: 'test agenda', reading: 3, starttime: "13.45", id: 1 },
        { name: 'test agenda1', reading: 5, starttime: "15:00", id: 1},
        { name: 'test agenda2', reading: 6, starttime: "16:30", id: 1 }]
        , 20160424:
        [{ name: 'my agenda', reading: 3, starttime: "13.45" },
            { name: 'my agenda2', reading: 6, starttime: "16:30" }]
    };

    $scope.agendas = {};

    var d = new Date().toISOString().slice(0,10).replace(/-/gi, '');
    //var today = Date.now().toISOString().slice(0,10).replace(/-/gi, '')
    $scope.foundAgendas = $scope.dates[d];


    var mylist = { 20160423: "hej", 20160424: "då"};

    // Get profile user.
    userService.getUser($routeParams.id)
        .success(function (response) {
            $scope.profileUser = response;

        });

    agendaService.getAgendas({
        'user_id': userService.getLoggedUser().id
    }).success(function (response) {
        for(var i = 0; i < response.length; i++){
            var tempkey = response[i].date;
            var key = tempkey.substring(0,10).replace(/-/gi, '');
            if(!(key in $scope.agendas)){
                $scope.agendas[key] = [];
                $scope.agendas[key].push(response[i]);
            } else{
                $scope.agendas[key].push(response[i]);
            }
        }
        console.log($scope.agendas);
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

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    }

    //change dates to $scope.agendas to get real results
    $scope.clicked = function(inputDate){
        var key = inputDate.toISOString().slice(0,10).replace(/-/gi, '');
        $scope.foundAgendas = $scope.dates[key];
    };

    $scope.showAgenda = function(agenda){
        alert("you clicked agenda with id: "+agenda.id);
    }
});