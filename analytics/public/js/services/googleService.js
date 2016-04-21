analytics.factory('googleService', function ($http, moment) {

    var googleService = {};

    var CLIENT_ID = '515199148851-5tucd1m2hg3qrtqmiob2r080lmakfpoo.apps.googleusercontent.com';
    var SCOPES = ["https://www.googleapis.com/auth/calendar"];

    googleService.authorize = function (immediateValue, callbackFunction) {
        console.log("checkAuth");
        var data = {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': immediateValue
        };
        gapi.auth.authorize(data, callbackFunction);
    };

    googleService.listUpcomingEvents = function (callbackFunction) {
        gapi.client.load('calendar', 'v3', function () {
                var request = gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                });
                request.execute(function(resp) {
                    callbackFunction(resp.items);
                });
            }
        );
    };

    googleService.createCalendarEvent = function(event, callbackFunction) {
        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(function(createdEvent) {
            callbackFunction(createdEvent);
        });
    };

    return googleService;

});