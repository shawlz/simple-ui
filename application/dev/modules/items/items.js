angular.module('app.items', ['ui.router']).config(['$stateProvider', 'AccessLevel',
    function($stateProvider, AccessLevel) {
        $stateProvider.state('items', {
            abstract: true,
            url: '/items',
            templateUrl: 'components/layouts/default.html',
            role: {
                access: AccessLevel.anon
            },
        }).state('items.main', {
            url: '/main',
            templateUrl: 'modules/items/index.html',
            role: {
                access: AccessLevel.anon
            },
        })
    }
]).controller('ChatCtrl', ['$scope', '$state', 'Restangular', 'API', 'toaster',
    function($scope, $state, Restangular, API, toaster) {
        $scope.items = [];
        API.all('item').getList({}).then(function(data) {
            $scope.Date = Date;
            $scope.items = data.plain();
        }, function(error) {
            console.log(error);
        });
        // $scope.messages = [];
        // $scope.socketId = false;
        // $scope.first = true;

        // var room = uuid4.generate().toUpperCase();
        // $sails.on('connect', function(data) {
        //     $sails.get('/ai-notify/' + room).success(function(data, status, headers, jwr) {
        //         $scope.socketId = data.response.data.socket_id;
        //         $scope.connected = true;
        //         $scope.isDisabled = false;

        //         if($scope.first){
        //             var dataPayload = {
        //                 zone: 'gt',
        //                 server: false,
        //                 message: 'Hello!',
        //             };
        //             $sails.post('/ai-notify/' + room, dataPayload)
        //             .success(function(data, status, headers, jwr) {
        //                 $scope.first = false;
        //             }).error(function(res, status, headers, jwr) {
        //             });
        //         }
        //     }).error(function(data, status, headers, jwr) {
        //         console.log('Error: could not subscirbe to room!')
        //     });
        // });

        // $sails.on('messaging', function(data) {
        //     var name = data.server ? $scope.app.nameShort : "You";
        //     var logo = data.server ? $scope.app.organisation.logo : "assets/img/a3.jpg";
        //     var payload = {
        //         logo: logo,
        //         name: name,
        //         server: data.server,
        //         message: data.message,
        //         date: Date.create('now')
        //     };
        //     $scope.messages.push(payload);
        // });

        // $sails.on('disconnect', function(data) {
        //     $scope.connected = false;
        //     $scope.isDisabled = true;
        // });

        // $scope.sendMsg = function() {
        //     var dataPayload = {
        //         zone: 'gt',
        //         logo: "assets/img/a3.jpg",
        //         name: "You",
        //         server: false,
        //         message: $scope.message,
        //         date: Date.create('now')
        //     };
        //     $scope.message = '';
        //     $scope.messages.push(dataPayload);

        //     $sails.post('/ai-notify/' + room, dataPayload)
        //     .success(function(data, status, headers, jwr) {
        //     }).error(function(res, status, headers, jwr) {
        //         var errorTitle, errorMessage;
        //         var response = res.data.response;
        //         var errors = _.flatten(_.values(response.errors));
        //         var messages = _.pluck(errors, 'message');
        //         errorMessage = messages.join('. ');
        //         errorTitle = response.message;
        //         toaster.error(errorTitle || 'Could not deliver message!', errorMessage || 'Please Try Again')
        //     });
        // }
    }
]);