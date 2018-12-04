angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope,  Listings) {

    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
      console.log("started");
      var json=response.data;
      var geojson={
        "type":"FeatureCollection",
        features:[],
      };
      var i;
      for(i=0;i<42;i++){
        geojson.features.push({
          "type":"Feature",
          "geometry":{
            "type":"Polygon",
            "coordinates":json[i].mapBoxInfo.geometry.coordinates
          },
          "properties":{
            "name": json[i].name,
            "fill": json[i].fill,
            "color":json[i].color,
            "full": json[i].full
          }
        });
      }
      var lots1=geojson;
      var filterGroup=document.getElementById('filter-group');
      mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaGkzMzMiLCJhIjoiY2puMXE1M2ptMXR0aDNrdG45M3RmNnE5MSJ9.yjNjiHocsYo8_gyTxHDWNw';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/rishi333/cjogk22w553sp2snn2b2x2dda',
      center: [-82.355133, 29.65],
      zoom: 13,
      });
      map.on('load', function () {
        map.addSource('lots', {
            type: 'geojson',
            data: lots1
        });
        lots1.features.forEach(function(feature){
          var symbol=feature.properties['color'];
          var layerID=symbol;
          if(typeof symbol!=='undefined'){
          if(!map.getLayer(layerID)){
            map.addLayer({
              id:layerID,
              type:'fill',
              source:'lots',
              visibility:'visible',
              paint:{
                'fill-color':{
                    type:'identity',
                    property:'fill'
                },
              },
              filter: ["==","color",symbol]
            });
            var input = document.createElement('input');
                input.type = 'checkbox';
                input.id = layerID;
                input.checked = true;
                filterGroup.appendChild(input);

                var label = document.createElement('label');
                label.setAttribute('for', layerID);
                label.textContent = symbol;
                filterGroup.appendChild(label);

                // When the checkbox changes, update the visibility of the layer.
                input.addEventListener('change', function(e) {
                    map.setLayoutProperty(layerID, 'visibility',
                        e.target.checked ? 'visible' : 'none');
                });
          }
        }
      }

      );
        map.on('click', 'Purple' , function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.name)
                .addTo(map);
                map.flyTo({center: e.lngLat});
                buildLots(lots1,e.features[0]);
                $scope.queryFullness(e.features[0].properties.name);
          if($scope.isOpenLeft() == false){
              $scope.toggleLeft();
            } 
        });
        map.on('click', 'Orange' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
              $scope.queryFullness(e.features[0].properties.name);
          if($scope.isOpenLeft() == false){
              $scope.toggleLeft();
            }   
        });
        map.on('click', 'Red-One' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
              $scope.queryFullness(e.features[0].properties.name);
          if($scope.isOpenLeft() == false){
              $scope.toggleLeft();
            }   
        });
        map.on('click', 'Visitor' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
              $scope.queryFullness(e.features[0].properties.name);
          if($scope.isOpenLeft() == false){
              $scope.toggleLeft();
            }   
        });
        map.on('click', 'Red' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
              $scope.queryFullness(e.features[0].properties.name);
          if($scope.isOpenLeft() == false){
              $scope.toggleLeft();
            }     
        });
        map.on('click', 'Green' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
              $scope.queryFullness(e.features[0].properties.name);
          if($scope.isOpenLeft() == false){
              $scope.toggleLeft();
            }   
        });
        map.on('click', 'Brown-Three' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
              $scope.queryFullness(e.features[0].properties.name);
          if($scope.isOpenLeft() == false){
              $scope.toggleLeft();
            } 
        });
        map.on('click', 'Shands' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
              $scope.queryFullness(e.features[0].properties.name);
          if($scope.isOpenLeft() == false){
              $scope.toggleLeft();
            }   
        });
        map.on('click', 'Blue' , function (e) {

          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
              $scope.queryFullness(e.features[0].properties.name);
          if(toggled == false){
              $scope.toggleLeft();
              toggled = true;
            }    
        });
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
        }),'top-left');
        map.addControl(new mapboxgl.NavigationControl(),'top-left');
        //buildLots(lots1);

        });
      function buildLots(data,current) {
          var currentFeature=current;
          i=0;
          var prop = currentFeature.properties;
          document.getElementById('listing-title').innerHTML="";
          document.getElementById('listing-details').innerHTML="";
          var listingDetails = document.getElementById('listing-details');
          var listingTitle = document.getElementById('listing-title');
          var title = listingTitle.appendChild(document.createElement('a'));
          title.className = 'item';
          title.id = "listing-" + i;
          title.href = '#';
          title.className = 'title';
          title.dataPosition = i;
          if(currentFeature.geometry.type=='Polygon'){
            title.innerHTML ='<h3>Parking Lot #'+prop.name + '</h3>';
          }
          var decal = listingDetails.appendChild(document.createElement('li'));
          decal.innerHTML += ('<strong>Decal:</strong> '+prop.color);
      }
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });

      $scope.addListing = function(full) {
        var newlisting={};
        newlisting.full=full;
        var html = document.querySelector(".listings2").innerHTML;
        newlisting.name=html;
        if(newlisting.full && newlisting.name){
          console.log(html);
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
