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
  $scope.showCustomerInfo = false;
  var updateFeed = function() {
    $http.get(serverIP + 'api/webtraffic/activeUsers')
    .then(function(res) {
      console.log('Get request made from tab controlller');
      $scope.feeds = res.data;
    });
  };
  updateFeed();
  $scope.getCustomerInfo = function(ip) {
    console.log('Get customer ', ip);
    $http.get(serverIP + 'api/customer/info')
    .then(function(customers) {
      var searchCustomer = _.find(customers.data, function(customer) {
        return customer.ip === ip;
      });
      $scope.customerInfo = searchCustomer;
      $http({
        url: serverIP + 'api/webtraffic/mvp', 
        method: 'get'
      })
      .then(function(webTrafficInfoList) {
        console.log('Web Traffic Info -- get customer Info ', webTrafficInfoList.data, searchCustomer.ip);
        var webtraffic = _.find(webTrafficInfoList.data, function(webtrafficInfo) {
          return webtrafficInfo.ip === searchCustomer.ip;
        });
        var pageName = webtraffic.pathName.slice('1');
        pageName = pageName || 'Home';
        $scope.customerInfo.mvp = pageName;

      });
      $scope.showCustomerInfo = true;
    });

  };
  $interval( updateFeed, 30 * 1000);
});