analytics.factory('agendaService', function ($http, moment) {

    // Internal variables used by the service for having a state. These are set by the method resetState().
    var agendaService = {};
    var startHour;
    var startMinute;
    var date;
    var endTime;
    var agenda;
    var attendees;

    agendaService.getStartHour = function() {
        return startHour;
    };

    agendaService.getStartMinute = function() {
        return startMinute;
    };

    agendaService.getDate = function() {
        return date;
    };

    agendaService.setDate = function(newDate) {
        date = newDate;
    };

    agendaService.getEndTime = function() {
        return endTime;
    };

    agendaService.setEndTime = function(newTime) {
        endTime = newTime;
    };

    agendaService.getAgenda = function() {
        return agenda;
    };

    agendaService.addToAgenda = function(activity) {
        agenda.push(activity);
    };

    agendaService.addAttendee = function(attendee) {
        // Don't add attendee if already in list.
        if (attendees.indexOf(attendee) === -1) {
            attendees.push(attendee);
        }
    };

    agendaService.removeAttendee = function(id) {
        for (var i = 0; i < attendees.length; i++) {
            if (attendees[i].id === id) {
                attendees.splice(i, 1);
            }
        }
    };

    agendaService.getAttendees = function() {
        return attendees;
    };

    agendaService.changeStartTime = function(hour, minute) {
        var duration = agendaService.getTotalTime();
        date.hour(hour);
        date.minute(minute);
        endTime = date.clone();
        endTime.add(duration);
    };

    agendaService.getTotalTime = function() {
        return moment.duration(moment(endTime).diff(moment(date)));
    };

    // For example, here you can get all activities for a certain agenda_id or user_id.
    // This is put into the parameter and sent as params to the backend.
    agendaService.getActivities = function(activityData) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/activities",
            method: "GET",
            params: activityData
        });
    };

    agendaService.getActivity = function (id) {
        return $http.get(apiUrl + '/activities/' + id);
    };

    // Resets the state of the service.
    agendaService.resetState = function() {
        startHour = "08";
        startMinute = "00";
        date = moment(startHour + ":" + startMinute, 'HH:mm');
        endTime = date.clone();
        agenda = [];
        attendees = [];
    };

    // Add a new activity
    agendaService.newActivity = function(name, duration){

    }

    return agendaService;

});