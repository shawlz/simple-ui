'use strict';

/* Controllers */

angular.module('app')
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
    .controller('AppCtrl', ['$scope', '$localStorage', '$window', 'Auth', '$state',
        function ($scope, $localStorage, $window, Auth, $state) {
            // add 'ie' classes to html
            var isIE = !! navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = {
                name: 'Simple UI Application',
                nameShort: 'SimpleUI',
                version: '1.0.0',
                organisation: {
                    name: 'SimpleUI',
                    logo: 'assets/img/p0.jpg'
                },

                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-light',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-black',
                    headerFixed: false,
                    asideFixed: false,
                    asideFolded: true,
                    asideDock: true,
                    container: false,
                    hideAside: true
                }
            }

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

        }
    ]);