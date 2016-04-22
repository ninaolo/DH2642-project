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
                var activity = JSON.parse(e.originalEvent.dataTransfer.getData("text"));
                scope.handle({activity: activity});
                scope.$apply();

            });
        }
    };
});