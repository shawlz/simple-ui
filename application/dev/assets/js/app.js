'use strict';
angular.module('app', [
    'ngAnimate',
    'ngStorage',
    'ngSails',
    'uuid4',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'ui.gravatar',
    'toaster',
    'oc.lazyLoad',
    'restangular',
    'app.localService',
    'app.accessService',
    'app.authService',
    'app.items',
    ]).run(['$rootScope', '$location', '$state', '$stateParams', 'Auth', 'DEFAULTS', '$window',
        function($rootScope, $location, $state, $stateParams, Auth, DEFAULTS, $window) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.DEFAULTS = DEFAULTS;
        }
    ]).constant('DEFAULTS', {
        'API_URL': settings.api.baseURL,
    }).constant('JQ_CONFIG', {
        easyPieChart: ['assets/vendor/lazyload/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
        sparkline: ['assets/vendor/lazyload/jquery/charts/sparkline/jquery.sparkline.min.js'],
        plot: ['assets/vendor/lazyload/jquery/charts/flot/jquery.flot.min.js', 'assets/vendor/lazyload/jquery/charts/flot/jquery.flot.resize.js', 'assets/vendor/lazyload/jquery/charts/flot/jquery.flot.tooltip.min.js', 'assets/vendor/lazyload/jquery/charts/flot/jquery.flot.spline.js', 'assets/vendor/lazyload/jquery/charts/flot/jquery.flot.orderBars.js', 'assets/vendor/lazyload/jquery/charts/flot/jquery.flot.pie.min.js'],
        slimScroll: ['assets/vendor/lazyload/jquery/slimscroll/jquery.slimscroll.min.js'],
        sortable: ['assets/vendor/lazyload/jquery/sortable/jquery.sortable.js'],
        nestable: ['assets/vendor/lazyload/jquery/nestable/jquery.nestable.js', 'assets/vendor/lazyload/jquery/nestable/nestable.css'],
        filestyle: ['assets/vendor/lazyload/jquery/file/bootstrap-filestyle.min.js'],
        slider: ['assets/vendor/lazyload/jquery/slider/bootstrap-slider.js', 'assets/vendor/lazyload/jquery/slider/slider.css'],
        chosen: ['assets/vendor/lazyload/jquery/chosen/chosen.jquery.min.js', 'assets/vendor/lazyload/jquery/chosen/chosen.css'],
        TouchSpin: ['assets/vendor/lazyload/jquery/spinner/jquery.bootstrap-touchspin.min.js', 'assets/vendor/lazyload/jquery/spinner/jquery.bootstrap-touchspin.css'],
        wysiwyg: ['assets/vendor/lazyload/jquery/wysiwyg/bootstrap-wysiwyg.js', 'assets/vendor/lazyload/jquery/wysiwyg/jquery.hotkeys.js'],
        dataTable: ['assets/vendor/lazyload/jquery/datatables/jquery.dataTables.min.js', 'assets/vendor/lazyload/jquery/datatables/dataTables.bootstrap.js', 'assets/vendor/lazyload/jquery/datatables/dataTables.bootstrap.css'],
        vectorMap: ['assets/vendor/lazyload/jquery/jvectormap/jquery-jvectormap.min.js', 'assets/vendor/lazyload/jquery/jvectormap/jquery-jvectormap-world-mill-en.js', 'assets/vendor/lazyload/jquery/jvectormap/jquery-jvectormap-us-aea-en.js', 'assets/vendor/lazyload/jquery/jvectormap/jquery-jvectormap.css'],
        footable: ['assets/vendor/lazyload/jquery/footable/footable.all.min.js', 'assets/vendor/lazyload/jquery/footable/footable.core.css']
    })
    .factory('API', ['Restangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(settings.api.baseURL);
        });
    }])
    .config(['$ocLazyLoadProvider', '$urlRouterProvider', '$httpProvider', 'RestangularProvider', '$sailsProvider',
        function($ocLazyLoadProvider, $urlRouterProvider, $httpProvider, RestangularProvider, $sailsProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            RestangularProvider.setBaseUrl(settings.api.baseURL);
            $sailsProvider.url = settings.api.baseURL;


            RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                if (data && data.data) {
                    var returnedData = data.data;
                    if (data.data.meta) returnedData.meta = data.response.meta;
                    return returnedData;
                } else {
                    return data;
                };
            });

            $urlRouterProvider.otherwise('/items/main');
            // We configure ocLazyLoad to use the lib script.js as the async loader
            $ocLazyLoadProvider.config({
                debug: true,
                events: true,
                modules: [{
                    name: 'ngGrid',
                    files: ['assets/vendor/lazyload/modules/ng-grid/ng-grid.min.js', 'assets/vendor/lazyload/modules/ng-grid/ng-grid.min.css', 'assets/vendor/lazyload/modules/ng-grid/theme.css']
                }, {
                    name: 'ui.grid',
                    files: ['assets/vendor/lazyload/modules/angular-ui-grid/ui-grid.min.js', 'assets/vendor/lazyload/modules/angular-ui-grid/ui-grid.min.css']
                }, {
                    name: 'ui.select',
                    files: ['assets/vendor/lazyload/modules/angular-ui-select/select.min.js', 'assets/vendor/lazyload/modules/angular-ui-select/select.min.css']
                }, {
                    name: 'angularFileUpload',
                    files: ['assets/vendor/lazyload/modules/angular-file-upload/angular-file-upload.min.js']
                }, {
                    name: 'ui.calendar',
                    files: ['assets/vendor/lazyload/modules/angular-ui-calendar/calendar.js']
                }, {
                    name: 'ngImgCrop',
                    files: ['assets/vendor/lazyload/modules/ngImgCrop/ng-img-crop.js', 'assets/vendor/lazyload/modules/ngImgCrop/ng-img-crop.css']
                }, {
                    name: 'angularBootstrapNavTree',
                    files: ['assets/vendor/lazyload/modules/angular-bootstrap-nav-tree/abn_tree_directive.js', 'assets/vendor/lazyload/modules/angular-bootstrap-nav-tree/abn_tree.css']
                }, {
                    name: 'toaster',
                    files: ['assets/vendor/lazyload/modules/angularjs-toaster/toaster.js', 'assets/vendor/lazyload/modules/angularjs-toaster/toaster.css']
                }, {
                    name: 'textAngular',
                    files: ['assets/vendor/lazyload/modules/textAngular/textAngular-sanitize.min.js', 'assets/vendor/lazyload/modules/textAngular/textAngular.min.js']
                }, {
                    name: 'vr.directives.slider',
                    files: ['assets/vendor/lazyload/modules/angular-slider/angular-slider.min.js', 'assets/vendor/lazyload/modules/angular-slider/angular-slider.css']
                }, {
                    name: 'com.2fdevs.videogular',
                    files: ['assets/vendor/lazyload/modules/videogular/videogular.min.js']
                }, {
                    name: 'com.2fdevs.videogular.plugins.controls',
                    files: ['assets/vendor/lazyload/modules/videogular/plugins/controls.min.js']
                }, {
                    name: 'com.2fdevs.videogular.plugins.buffering',
                    files: ['assets/vendor/lazyload/modules/videogular/plugins/buffering.min.js']
                }, {
                    name: 'com.2fdevs.videogular.plugins.overlayplay',
                    files: ['assets/vendor/lazyload/modules/videogular/plugins/overlay-play.min.js']
                }, {
                    name: 'com.2fdevs.videogular.plugins.poster',
                    files: ['assets/vendor/lazyload/modules/videogular/plugins/poster.min.js']
                }, {
                    name: 'com.2fdevs.videogular.plugins.imaads',
                    files: ['assets/vendor/lazyload/modules/videogular/plugins/ima-ads.min.js']
                }, {
                    name: 'xeditable',
                    files: ['assets/vendor/lazyload/modules/angular-xeditable/js/xeditable.min.js', 'assets/vendor/lazyload/modules/angular-xeditable/css/xeditable.css']
                }]
            });
        }
    ]);
angular.module('ui.gravatar').config(['gravatarServiceProvider',
    function(gravatarServiceProvider) {
        gravatarServiceProvider.defaults = {
            size: 100,
            "default": 'mm' // Mystery man as default for missing avatars
        };
        // Use https endpoint
        // gravatarServiceProvider.secure = true;
    }
]);