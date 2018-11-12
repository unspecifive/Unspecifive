
/* register the application and inject all the necessary dependencies */
var app = angular.module('ParkingPickerApp', ['ngMaterial']);

app.controller('ParkingLotsController', function ($scope, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.decalColor = "Any";

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

    $scope.setDecalColor = function(color) {
      $scope.decalColor = color;
    };
});
