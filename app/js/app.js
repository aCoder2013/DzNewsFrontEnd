/**
 * Created by Song on 2015/10/24.
 */
var dznews = angular.module('dznews', [
    'ngRoute',
    'newsControllers',
]);


dznews.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
        $routeProvider.
            when('/',{
              templateUrl: 'part/news_list.html',
              controller: 'listController'
            }).
            when('/news', {
                templateUrl: 'part/news_list.html',
                controller: 'listController'
            }).
            when('/news/:id', {
                templateUrl: 'part/news_detail.html',
                controller: 'newsDetailCtrl'
            }).
            otherwise({
                redirectTo: '/news'
            });

            // use the HTML5 History API
            $locationProvider.html5Mode(true);
    }]);
