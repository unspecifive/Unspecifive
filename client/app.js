
/* register the application and inject all the necessary dependencies */

var app = angular.module('ParkingPickerApp', ['ngMaterial']);

app.controller('ParkingLotsController', function ($scope, $mdSidenav, $mdDialog) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.decalColor = "Any";
    $scope.color = {
      red: Math.floor(Math.random() * 100)
    };
    $scope.signupName = '';
    $scope.signupEmail = '';
    $scope.signupUsername = '';
    $scope.signupPwd = '';
    $scope.signupDecal = '';
    $scope.loginEmail = '';
    $scope.loginPwd = '';
    $scope.fullnessSlider = '';
    $scope.userToken = '';
    $scope.sidebarPercentFull = '';

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

    $scope.setDecalColor = function(color) {
      $scope.decalColor = color;
    };

    $scope.queryFullness = function(name) {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          document.getElementById('sidebarPercentFull').innerText = JSON.parse(xhr.responseText).full;
          console.log(xhr.responseText);
        }
      };

      url = "http://localhost:8080/api/listings/getLotByCode/" + name;
      console.log(url);

      xhr.open("GET", url);
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      xhr.send();
    }

    $scope.updateSlider = function() {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          document.getElementById('sidebarPercentFull').innerText = JSON.parse(xhr.responseText).full;
          console.log(xhr.responseText);
        }
      };

      data = 'percentFull=' + $scope.fullnessSlider;
      url = "http://localhost:8080/api/listings/updateFullness/" + document.getElementById('listings2').innerHTML;
      console.log(url);

      xhr.open("PUT", url);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('x-access-token', $scope.userToken);
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      xhr.send(data);
    }

    $scope.handleLogin = function() {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          $scope.userToken = JSON.parse(xhr.responseText).token;
          console.log($scope.userToken);
        }
      };

      data = 'email=' + $scope.loginEmail + '&password=' + $scope.loginPwd;

      xhr.open("POST", "http://localhost:8080/api/user/login", true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      xhr.send(data);
    }

    $scope.handleSignup = function() {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
        }
      };

      var data = 'email=' + $scope.signupEmail + '&username=' + $scope.signupUsername + '&password=' + $scope.signupPwd + '&parkingDecalCode=' + $scope.signupDecal + '&name=' + $scope.signupName;
      console.log(data);

      xhr.open("POST", "http://localhost:8080/api/user/signup");
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      xhr.send(data);
    }
});


/* register the modules the application depends upon here*/
//angular.module('listings', []);

/* register the application and inject all the necessary dependencies */
var app2 = angular.module('ParkingPickerApp2', ['listings']);

angular.module("CombineModule",["ParkingPickerApp","ParkingPickerApp2"]);
