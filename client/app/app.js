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
      $http({
        url: serverIP + 'api/webtraffic/day', 
        method: 'get'
      })
      .then(function(webTrafficInfoList) {
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["00-04", "04-08", "08-12", "12-16", "16-20", "20-00"],
                datasets: [{
                    label: '# of Active Users',
                    data: [1, 3, 4, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });      
      });
      

       

      $scope.showCustomerInfo = true;
    });

  };
  $interval( updateFeed, 30 * 1000);
});