analytics.factory('activityService', function ($http) {

    var activityService = {};

    activityService.getActivity = function (id) {
        return $http.get(apiUrl + '/activities/' + id);
    };

    // Add a new activity
    activityService.newActivity = function (activityData) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/activities",
            method: "POST",
            data: activityData
        });
    };

    activityService.updateActivity = function (newData, id) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/activities/" + id,
            method: "PUT",
            data: newData
        });
    };

    activityService.deleteActivity = function (id) {
        return $http.delete(apiUrl + '/activities/' + id)
    };

    activityService.getAgendaActivities = function(agendaId) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/activities",
            method: "GET",
            params: {
                'agenda_id': agendaId
            }
        });
    };

    return activityService;
});