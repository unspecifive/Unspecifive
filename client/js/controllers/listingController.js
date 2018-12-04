angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
      console.log("started");
      //var json=JSON.stringify(response.data);
      var json=response.data;
      //var lots1 = JSON.parse(lotsFile);
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
        });
        map.on('click', 'Orange' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
          
        });
        map.on('click', 'Red-One' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
          
        });
        map.on('click', 'Visitor' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
          
        });
        map.on('click', 'Red' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
          
        });
        map.on('click', 'Green' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
          
        });
        map.on('click', 'Brown-Three' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
          
        });
        map.on('click', 'Shands' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
          
        });
        map.on('click', 'Blue' , function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
              map.flyTo({center: e.lngLat});
              buildLots(lots1,e.features[0]);
          
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
        //for (i = 0; i < 42; i++) {
          //var currentFeature = data.features[i];
          var currentFeature=current;
          i=0;
          var prop = currentFeature.properties;
          document.getElementById('listings').innerHTML="";
          var listings = document.getElementById('listings');
          var listing = listings.appendChild(document.createElement('div'));
          //listing.removeChild(listings.childNodes[0])
          listing.className = 'item';
          listing.id = "listing-" + i;
          var link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.dataPosition = i;
          if(currentFeature.geometry.type=='Polygon'){
            link.innerHTML ='Parking Lot Number '+prop.name;
          }
          document.getElementById('listings2').innerHTML=prop.name;

          var details = listing.appendChild(document.createElement('div'));
          details.innerHTML = 'Decal Color: '+prop.color;
          
          var details2=listing.appendChild(document.createElement('div'));
          details2.innerHTML='Percentage Full: '+prop.full;
        //}
        
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