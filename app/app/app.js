/**
 * Created by Song on 2015/10/24.
 */
var dznews = angular.module('dznews', [
    'ngRoute',
    'indexControllers',
]);

dznews.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/news', {
                templateUrl: 'part/news_list.html',
                controller: 'indexControllers'
            }).
            when('/news/:id', {
                templateUrl: 'part/news_detail.html',
                controller: 'newsDetailCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
