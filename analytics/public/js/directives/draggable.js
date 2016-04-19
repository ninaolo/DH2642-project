analytics.directive('draggable', function () {

    return {
        restrict: 'A',

        link: function (scope, element) {

            var el = element[0];
            el.draggable = true;

            el.addEventListener('dragstart', function (e) {
                e.dataTransfer.setData("text", e.target.id);
            }, false);

            el.addEventListener('dragend', function (e) {
                this.classList.remove('drag');
                return false;
            }, false);
        }
    }
});