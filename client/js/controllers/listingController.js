angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;
   

    $scope.addListing = function(code,name,address) {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
      var newlisting={};
      newlisting.code=code;
      newlisting.name=name;
      newlisting.address=address;
      if(code && name){
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