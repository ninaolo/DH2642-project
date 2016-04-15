analytics.factory('activityService', function ($http) {

    var activityService = {};

    // For example, here you can get all activities for a certain agenda_id
    activityService.getActivities = function(activityData) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/activities",
            method: "GET",
            params: activityData
        });
    };

    activityService.getActivity = function (id) {
      return $http.get(apiUrl + '/activities/' + id);
    };

    activityService.getAgendaActivities = function (id) {
        return $http.get(apiUrl + '/activities')
    };

    return activityService;

});