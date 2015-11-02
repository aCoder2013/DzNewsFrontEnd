/**
 * Created by Song on 2015/10/24.
 */
var newsControllers = angular.module('newsControllers', []);

newsControllers.controller('listController', function ($scope,$http) {
    $scope.page = 0;
    $scope.pageTitle = "DzNews";
    $http.get('/api/news').success(function(data) {
        $scope.newses = data;
    });

    $scope.lastPage = function(){
      $scope.page = $scope.page-1;
      $http.get('/api/news?page='+$scope.page).success(function(data){
          $scope.newses = data ;
      });
    };

    $scope.nextPage = function(){
      $scope.page = $scope.page+1;
      $http.get('/api/news?page='+$scope.page).success(function(data){
          // $scope.newses =  data;
          angular.forEach(data,function(item) {
               $scope.newses.push(item);
          });
      });
    };
});
newsControllers.controller("newsDetailCtrl",['$scope', '$routeParams','$http','$sce',
    function($scope, $routeParams,$http,$sce) {

          $scope.formContent;
          $scope.pageTitle;
          $http.get("/api/news/detail/"+$routeParams.id).success(function (data) {
            $scope.detail = data.detail ;
            $scope.detail.content = $sce.trustAsHtml($scope.detail.content);
            $scope.actionUrl = $sce.trustAsResourceUrl('/api/detail/'+$scope.detail.id+'/comment/new');
            $scope.pageTitle = $scope.detail.title;
        });

        $scope.processForm = function(){
            console.log($scope.formData);
            $http({
              method : 'post',
              url : $scope.actionUrl,
              data : $scope.formContent,
              header:{ 'Content-Type': 'application/x-www-form-urlencoded' }
            })
              .success(function(data){
                  console.log(data);
              });
        };
}]);
