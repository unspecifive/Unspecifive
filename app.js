
/* register the application and inject all the necessary dependencies */

var app = angular.module('ParkingPickerApp', ['ngMaterial']);

app.controller('ParkingLotsController', function ($scope, $mdSidenav, $mdDialog) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    };
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
});


/* register the modules the application depends upon here*/
//angular.module('listings', []);

/* register the application and inject all the necessary dependencies */
var app2 = angular.module('ParkingPickerApp2', ['listings']);

angular.module("CombineModule",["ParkingPickerApp","ParkingPickerApp2"]);
