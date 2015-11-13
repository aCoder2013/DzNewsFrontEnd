var dzNewsService = angular.module('dzNewsService', ['ngResource']);

dzNewsService.factory('News', ['$resource',
  function($resource){
    return $resource('/api', {}, {
      query: {method:'GET', params:{newsId:'phones'}, isArray:true}
    });
  }]);
