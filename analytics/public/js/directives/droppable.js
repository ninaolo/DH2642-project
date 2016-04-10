analytics.directive('droppable', function () {
    return {
        scope: {
            drop: '&',
            bin: '='
        },
        link: function (scope, element) {
            var el = element[0];
            el.addEventListener('dragover', function (e) {
                e.dataTransfer.dropEffect = 'move';
                if (e.preventDefault)
                    e.preventDefault();
                this.classList.add('over');
                return false;
            }, false);
            el.addEventListener('dragenter', function (e) {
                this.classList.add('over');
                return false;
            }, false);
            el.addEventListener('dragleave', function (e) {
                this.classList.remove('over');
                return false;
            }, false);
            el.addEventListener('drop', function (e) {
                if (e.stopPropagation)
                    e.stopPropagation();
                this.classList.remove('over');
                var binId = this.id;
                var item = document.getElementById(e.dataTransfer.getData('Text'));
                this.appendChild(item);
                scope.$apply(function (scope) {
                    var fn = scope.drop();
                    if ('undefined' !== typeof fn) {
                        fn(item.id, binId);
                    }
                });
                return false;
            }, false);
        }
    };
});