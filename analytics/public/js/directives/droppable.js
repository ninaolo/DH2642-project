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
                this.classList.add('drag-over');
                if(e.target.hasAttribute('draggable')) {
                    e.target.classList.add('insert');
                }
                return false;
            });

            element.on('dragleave', function (e) {
                this.classList.remove('drag-over');
                if(e.target.hasAttribute('draggable')) {
                    e.target.classList.remove('insert');
                }
                return false;
            });

            element.on('drop', function (e) {
                e.preventDefault();
                this.classList.remove('drag-over');
                e.target.classList.remove('insert');
                var activity = JSON.parse(e.originalEvent.dataTransfer.getData("text"));
                // This is true when we try to drop activities between other activities.
                var dropIndex = e.target.getAttribute('data-index');
                if (dropIndex !== null) {
                    scope.handle({activity: activity, index: dropIndex});
                } else {
                    scope.handle({activity: activity});
                }
                scope.$apply();
            });
        }
    };
});