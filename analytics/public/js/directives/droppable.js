analytics.directive('droppable', function () {
    return {
        scope: {
            handle: '&'
        },
        link: function (scope, element) {

            element.on('dragover', function (e) {
                e.preventDefault();
            });

            element.on('dragenter', function (e) {
                this.classList.add('over');
                return false;
            });

            element.on('dragleave', function (e) {
                this.classList.remove('over');
                return false;
            });

            element.on('drop', function (e) {
                e.preventDefault();
                var activityId = e.originalEvent.dataTransfer.getData("text");
                console.log(e);

                // Here we call the provided handle function. The apply() is necessary for updating.
                scope.handle({id: activityId});
                scope.$apply();

            });
        }
    };
});