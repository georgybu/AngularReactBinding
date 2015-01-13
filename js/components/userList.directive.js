(function(ng, React) {
    function directive() {
        function controller() { }
        function link(scope, element) {

            /* [binging] Angular => React */
            scope.$watchGroup(
                ['userList', 'userSelected'],
                function(newValues, oldValues, scope) {
                    if (window.Components) {
                        React.render(window.Components.userList({
                            scope: scope,
                            list: scope.userList || null,
                            selected: scope.userSelected || null
                        }), element[0]);
                    }
                }
            );
        }

        return {
            restrict: 'AE',
            replace: true,
            scope: {
                /* public interface for component */
                userList: '=',
                userSelected: '=',
                userOnUpdate: '&'
            },
            controller: controller,
            link: link
        };
    }

    ng.module("userList.directive", []).directive('userList', directive);
})(window.angular, window.React);