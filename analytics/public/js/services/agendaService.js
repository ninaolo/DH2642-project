analytics.factory('agendaService', function ($http, moment) {

    // Internal variables used by the service for having a state. These are reset by the method resetState().
    var agendaService = {};
    var date;
    var endTime;
    var agenda = [];
    var attendees;
    var name = "";
    var description = "";
    var googleId = ""; // The google ID. Used when updating events on google.
    var edit = { // This is used to determine if a new event should be created or an existing one be edited.
        'isEdit': false,
        'id': 0
    };

    // Resets the state of the service.
    agendaService.resetState = function () {
        date = moment("08:00", 'HH:mm');
        endTime = date.clone();
        agenda = [];
        attendees = [];
        edit.isEdit = false;
        edit.id = 0;
        linkId = "";
        name = "";
        description = "";
    };

    agendaService.setEdit = function(boolean, id) {
        edit.isEdit = boolean;
        edit.id = id;
    };

    agendaService.getEdit = function() {
        return edit;
    };

    agendaService.setDate = function(newDate) {
        date = newDate;
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

    agendaService.setName = function(newName) {
        name = newName;
    };

    agendaService.getName = function () {
        return name;
    };

    agendaService.setDescription = function(newDescription) {
        description = newDescription;
    };

    agendaService.getDescription = function () {
        return description;
    };

    agendaService.getGoogleId = function() {
        return googleId;
    };

    agendaService.setGoogleId = function(newId) {
        googleId = newId;
    };

    agendaService.getAgenda = function () {
        return agenda;
    };

    agendaService.setAgenda = function (newAgenda) {
        agenda = newAgenda;
    };

    agendaService.addToAgenda = function (activity, index) {
        if (!idInList(activity.id, agenda)) {
            if (index) {
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
        if (!idInList(attendee.id, attendees)) {
            attendees.push(attendee);
        }
    };

    agendaService.removeAttendee = function (id) {
        removeFromList(id, attendees);
    };

    agendaService.setAttendees = function(newAttendees) {
        attendees = newAttendees;
    };

    agendaService.getAttendees = function () {
        return attendees;
    };

    agendaService.getAttendeeEmails = function () {
        var emailList = [];
        for (i = 0; i < attendees.length; i++) {
            emailList.push({'email': attendees[i].email});
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

    // The many-to-many relational REST call to all agendas for a specific user.
    agendaService.getAgendas = function (id) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/users/" + id + "/agendas",
            method: "GET"
        });
    };

    // The many-to-many relational REST call to all users for a specific agenda.
    agendaService.getAgendaUsers = function (id) {
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/agendas/" + id + "/users",
            method: "GET"
        });
    };

    agendaService.getFinalData = function(link, googleId) {
        var attendeeIds = [];
        for (var i = 0; i < attendees.length; i++) {
            attendeeIds.push(attendees[i].id);
        }
        var activityIds = [];
        for (var i = 0; i < agenda.length; i++) {
            activityIds.push(agenda[i].id);
        }
        var agendaData = {
            'description': description,
            'name': name,
            'date': date.format("YYYY-MM-DD HH:mm:ss"),
            'enddate': endTime.format("YYYY-MM-DD HH:mm:ss"),
            'attendees': attendeeIds,
            'activities': activityIds,
            'link': link,
            'google_id': googleId
        };
        console.log(agendaData);
        return agendaData;
    };

    agendaService.newAgenda = function (link, googleId) {
        var agendaData = agendaService.getFinalData(link, googleId);
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/agendas",
            method: "POST",
            data: agendaData
        });
    };

    agendaService.updateAgenda = function (link, googleId) {
        var agendaData = agendaService.getFinalData(link, googleId);
        return $http({
            headers: {
                "Content-Type": "application/json"
            },
            url: apiUrl + "/agendas/" + edit.id,
            method: "PUT",
            data: agendaData
        });
    };

    agendaService.getAgendaWithID = function (id) {
        return $http.get(apiUrl + '/agendas/' + id);
    };

    return agendaService;

});