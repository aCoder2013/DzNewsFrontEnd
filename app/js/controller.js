/**
 * Created by Song on 2015/10/24.
 */
var newsControllers = angular.module('newsControllers', []);

newsControllers.controller('listController', function ($scope,$http,instance) {
    $scope.page = 0;
    $scope.pageTitle = "DzNews";

    $http.get('/api/news').success(function(data) {
        $scope.newses = data;
    });

    $scope.change = function (url) {
      instance.url = url;
    };

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


newsControllers.controller("newsDetailCtrl",function($scope, $routeParams,$http,$sce,instance) {
          if(!(instance.url)){
            //如果是直接通过url访问，则通过newsitem.id获取相应的新闻详情URL
            $http.get("/api/news/"+$routeParams.id).success(function (data) {
            instance.url = data._links.detail.href;
            $http.get(instance.url).success(function (data) {
              $scope.detail = data.detail ;
              $scope.detail.content = $sce.trustAsHtml($scope.detail.content);
              $scope.pageTitle = $scope.detail.title;
              });
            });
          }else {
            //如果是通过首页跳转访问则直接获取新闻详情
            $http.get(instance.url).success(function (data) {
              $scope.detail = data.detail ;
              $scope.detail.content = $sce.trustAsHtml($scope.detail.content);
              $scope.actionUrl = $sce.trustAsResourceUrl('/api/detail/'+$scope.detail.id+'/comment/new');
              $scope.pageTitle = $scope.detail.title;
            });
          };

          $scope.submitComment = function (comment) {
              $http.post(instance.url+'/comment/new', $.param({
                name:comment.name,
                email:comment.email,
                content:comment.content
              }),{
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
              }).success(function (data) {
                  window.alert(instance.url);
              });
          }
});
