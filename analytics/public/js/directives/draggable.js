analytics.directive('draggable', function () {

    return {
        restrict: 'A',
        scope: {
            'activity' : '='
        },

        link: function (scope, element) {
            var el = element[0];
            el.draggable = true;

            el.addEventListener('dragstart', function (e) {
                e.dataTransfer.setData("text", JSON.stringify(scope.activity));
            }, false);

            el.addEventListener('dragend', function (e) {
                return false;
            }, false);
        }
    }
});