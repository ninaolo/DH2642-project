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
                var data = e.originalEvent.dataTransfer.getData("text");
                e.target.appendChild(document.getElementById(data));

                // Here we call the handleDrop() function in the controller.
                scope.$apply(function (scope) {
                    var fn = scope.handle();
                    if ('undefined' !== typeof fn) {
                        fn(item.id, binId);
                    }
                });
            });
        }
    };
});