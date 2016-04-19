analytics.directive('draggable', function () {

    return {
        restrict: 'A',
        scope: {
            'index': '@'
        },

        link: function (scope, element) {
            var el = element[0];
            el.draggable = true;

            el.addEventListener('dragstart', function (e) {
                // Send the id of the activity which was moved so that the scope can handle the move.
                e.dataTransfer.setData("text", scope.index);

            }, false);

            el.addEventListener('dragend', function (e) {
                this.classList.remove('drag');
                return false;
            }, false);
        }
    }
});