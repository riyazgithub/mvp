var app = angular.module ('liveWeb', [
  'ngRoute'
	]);
var serverIP = 'http://localhost:8000/';

app.factory('activeUserService', function($http) {

  return {
    activeUser: function() {
      return $http.get(serverIP + 'api/webtraffic/activeUsers');
    },
    customerInfo: function() {

    }
  };
});

app.controller ('tabsController', function($scope, activeUserService, $interval, $http) {
  var updateFeed = function() {
    $http.get(serverIP + 'api/webtraffic/activeUsers')
    .then(function(res) {
      console.log('Get request made');
      $scope.feeds = res.data;
    });
  };
  updateFeed();
  $scope.getCustomerInfo = function(ip) {
    console.log('Get customer ', ip);
    $http.get(serverIP + 'api/customer/info')
    .then(function(customers) {
      console.log('Info of customers ', customers.data);
    });

  };
  $interval( updateFeed, 30 * 1000);
});