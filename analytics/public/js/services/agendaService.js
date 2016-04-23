analytics.factory('agendaService', function ($http, moment) {

    // Internal variables used by the service for having a state. These are set by the method resetState().
    var agendaService = {};
    var startHour;
    var startMinute;
    var date;
    var endTime;
    var agenda;
    var attendees;
    var name;
    var description;

    agendaService.getStartHour = function () {
        return startHour;
    };

    agendaService.getStartMinute = function () {
        return startMinute;
    };

    agendaService.getDate = function () {
        return date;
    };

    agendaService.changeDate = function (newDate) {
        var duration = agendaService.getTotalTime();
        date.year(newDate.get('year')).month(newDate.get('month')).date(newDate.get('date'));
        endTime = date.clone();
        endTime.add(duration);
    };

    agendaService.setEndTime = function (newTime) {
        endTime = newTime;
    };

    agendaService.getEndTime = function () {
        return endTime;
    };

    agendaService.getName = function () {
        return name;
    };

    agendaService.getDescription = function () {
        return description;
    };

    agendaService.setNameAndDescription = function (n, d) {
        name = n;
        description = d;
    };

    agendaService.getAgenda = function () {
        return agenda;
    };

    agendaService.addToAgenda = function (activity, index) {
        if (!idInList(activity.id, agenda)) {
            if(index) {
                agenda.splice(index, 0, activity);
            } else {
                agenda.push(activity);
            }
        } else {
            removeFromList(activity.id, agenda);
            if (index) {
                agenda.splice(index, 0, activity);
            } else {
                agenda.push(activity);
            }
        }
    };

    agendaService.removeFromAgenda = function (id) {
        removeFromList(id, agenda);
    };

    agendaService.addAttendee = function (attendee) {
        // Don't add attendee if already in list.
        if(!idInList(attendee.id, attendees)) {
            attendees.push(attendee);
        }
    };

    agendaService.removeAttendee = function (id) {
        removeFromList(id, attendees);
    };

    agendaService.getAttendees = function () {
        return attendees;
    };

    agendaService.getAttendeeEmails = function() {
        var emailList = [];
        for (i = 0; i < attendees.length; i++) {
            emailList.push({'email' : attendees[i].email});
        }
        return emailList;
    };

    agendaService.changeStartTime = function (hour, minute) {
        var duration = agendaService.getTotalTime();
        date.hour(hour);
        date.minute(minute);
        endTime = date.clone();
        endTime.add(duration);
    };

    agendaService.getTotalTime = function () {
        return moment.duration(moment(endTime).diff(moment(date)));
    };

    // For example, here you can get all activities for a certain agenda_id or user_id.
    // This is put into the parameter and sent as params to the backend.
    agendaService.getActivities = function (activityData) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/activities",
            method: "GET",
            params: activityData
        });
    };

    // For example, here you can get all agendas for a certain user_id.
    // This is put into the parameter and sent as params to the backend.
    agendaService.getAgendas = function (agendaData) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/agendas",
            method: "GET",
            params: agendaData
        });
    };

    agendaService.getActivity = function (id) {
        return $http.get(apiUrl + '/activities/' + id);
    };

    // Resets the state of the service.
    agendaService.resetState = function () {
        startHour = "08";
        startMinute = "00";
        date = moment(startHour + ":" + startMinute, 'HH:mm');
        endTime = date.clone();
        agenda = [];
        attendees = [];
        day = Date.now();
    };

    // Add a new activity
    agendaService.newActivity = function (activityData) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/activities",
            method: "POST",
            data: activityData
        });
    };

    agendaService.updateActivity = function (newData, id) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/activities/" + id,
            method: "PUT",
            data: newData
        });
    };

    agendaService.removeActivity = function (id) {
        return $http.delete(apiUrl + '/activities/' + id)
    };

    return agendaService;

});