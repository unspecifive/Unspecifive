angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });
    $scope.addListing = function(full,name) {
      var newlisting={};
      newlisting.full=full;
      newlisting.name=name;
      if(full && name){
        console.log("Here")
        $scope.listings.push(newlisting);
        Listings.create(newlisting);
      }
      else{
        console.log('unable to add listing');
      }
    };

    $scope.deleteListing = function($index) {
      /**TODO
         Delete the article using the Listings factory. If the removal is successful, 
     navigate back to 'listing.list'. Otherwise, display the error. 
        */
       if($index!=-1){
         var temp=$scope.listings[$index];
         
         $scope.listings.splice($index,1);
         Listings.delete(temp._id);
       }
       else{
         console.log('unable to delete listing');
       }
       
 
     };
 
     $scope.showDetails = function(index) {
       $scope.detailedInfo = $scope.listings[index];
     };
  }
]);