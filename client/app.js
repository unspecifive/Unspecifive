
/* register the application and inject all the necessary dependencies */

var app = angular.module('ParkingPickerApp', ['ngMaterial']);

app.controller('ParkingLotsController', function ($scope, $mdSidenav, $mdDialog) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.decalColor = "Any";
    $scope.color = {
      red: Math.floor(Math.random() * 100)
    };

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

    $scope.setDecalColor = function(color) {
      $scope.decalColor = color;
    };
    $scope.handleLoginSubmission = function(email, password) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
        }
      };

      body = {
        email: email,
        password: password
      };

      xhr.open("POST", "https://unspecifive.herokuapp.com/api/user/login", true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(body);
    }

    $scope.handleCreateSubmission = function(name, email, username, password, decal) {
      var xhr = new XMLHttpRequest();
      // xhr.withCredentials = true;

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText);
          $scope.userToken = xhr.responseText;
        }
      };

      body = {
        email: email,
        username: username,
        password: password,
        parkingDecalCode: decal,
        name: name
      };

      var data = 'email=' + email + '&username=' + username + '&password=' + password + '&parkingDecalCode=' + decal + '&name=' + name;
      console.log(data);

      xhr.open("POST", "https://unspecifive.herokuapp.com/api/user/signup");
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
