//NOTE: API services should always return promise (by our convention)

(function(ng) {
    function controller($q, $scope) {

        /* API emulation */
        function getUsers() { // TODO: move it to UserDataProvider
            function getBigData() {
                var users = [];
                console.time("Load data");
                for (var i = 0; i < 5000; i++) {
                    users.push({
                        "name" : faker.name.findName(),
                        "email" : faker.internet.email(),
                        "phone" : faker.phone.phoneNumber(),
                        "company" : faker.company.companyName()
                    });
                }
                console.timeEnd("Load data");
                return users;
            }
            return $q.when(getBigData());
        }

        $scope.userList = null;
        $scope.selectedUsers = [];

        $scope.updateUsers = function(users) {
            $scope.selectedUsers = users;
        };

        $scope.setList = function() {
            // set first 2 elements
            // TODO: put any logic what you want
            if ($scope.userList.length) {
                $scope.selectedUsers = [
                    $scope.userList[0],
                    $scope.userList[1],
                ];
            }
        };

        function getUserList() {
            $q.all([getUsers()]).then(function(results) {
                $scope.selectedUsers = [];
                $scope.userList = results[0];
            });
        }

        $scope.getUserList = function() { getUserList() };

        /* init */
        getUserList();
    }

    ng.module("app", ['userList.directive']).controller("appCtrl", controller);
}(window.angular));