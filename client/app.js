
/* register the application and inject all the necessary dependencies */

var app = angular.module('ParkingPickerApp', ['ngMaterial']);

app.controller('ParkingLotsController', function ($scope, $mdSidenav, $mdDialog) {
    $scope.showMoreInfo = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#showMoreInfo')))
          .clickOutsideToClose(true)
          .title('Update Parking Lot Fullness')
          .textContent('How full does this parking lot look right now?')
          .ariaLabel('How full does this parking lot look right now?')
          .ok('OK')
          .targetEvent(ev)
      );
    };
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isLogin = false;
    $scope.isAccount = false;
    $scope.setLogin = function(){
      $scope.isLogin = true;
    };
    $scope.setAccount = function(){
      $scope.isAccount = true;
    };
    $scope.resetLogin = function(){
      $scope.isLogin = false;
    };
    $scope.resetAccount = function(){
      $scope.isAccount = false;
    };
    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    };
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
          $scope.$apply(function () {
            $scope.sidebarPercentFull = JSON.parse(xhr.responseText).full;
            $scope.lastUpdated = new Date(JSON.parse(xhr.responseText).lastUpdated);
        });
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
          $scope.$apply(function () {
            console.log(xhr.responseText)
            $scope.sidebarPercentFull = JSON.parse(xhr.responseText).full;
            $scope.lastUpdated = new Date(JSON.parse(xhr.responseText).lastUpdated);
          });
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
