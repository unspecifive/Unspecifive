
/* register the application and inject all the necessary dependencies */
var app = angular.module('ParkingPickerApp', ['ngMaterial']);

app.controller('ParkingLotsController', function ($scope, $mdSidenav, $mdDialog) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
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