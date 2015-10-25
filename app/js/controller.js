/**
 * Created by Song on 2015/10/24.
 */
var newsControllers = angular.module('newsControllers', []);

newsControllers.controller('listController', function ($scope,$http) {
    $http.get('/api/news').success(function(data) {
        $scope.newses = data;
    });
});

newsControllers.controller("newsDetailCtrl",['$scope', '$routeParams','$http','$sce',
    function($scope, $routeParams,$http,$sce) {
          $http.get("/api/news/detail/"+$routeParams.id).success(function (data) {
            $scope.detail = data ;
            $scope.detail.content = $sce.trustAsHtml($scope.detail.content);
        });
}]);
