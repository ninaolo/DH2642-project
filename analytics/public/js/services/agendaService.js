analytics.factory('agendaService', function ($http) {

    var agendaService = {};

    agendaService.getAgendas = function () {
        return $http.get(apiUrl + '/agendas');
    };

    activityService.getAgenda = function (id) {
        return $http.get(apiUrl + '/agendas/' + id);
    };

    return agendaService;

});