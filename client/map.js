var name;
mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaGkzMzMiLCJhIjoiY2puMXE1M2ptMXR0aDNrdG45M3RmNnE5MSJ9.yjNjiHocsYo8_gyTxHDWNw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/rishi333/cjobvnk7v1l4o2so6l78uxyhr',
center: [-82.355133, 29.65],
zoom: 13,
});
map.on('load', function () {
    map.addSource('lotsource', {
        type: 'vector',
        url: 'mapbox://rishi333.cjo7f52y101eu2ws1cffwd2xv-48o9u'
    });
    map.addLayer({
        id: 'lots',
        type:'fill',
        source: 'lotsource',
        paint:{
            'fill-color':{
                type:'identity',
                property:'fill'
            },
        },
        'source-layer':'lotstemp'
    });
    map.addLayer({
        id: 'lotstripes',
        type:'line',
        source: 'lotsource',
        paint:{
            'line-color':{
                type:'identity',
                property:'stroke'
            },
        },
        'source-layer':'lotstemp'
    });

    
    map.on('click', 'lots', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
        name=e.features[0].properties.name;
    });
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    map.addControl(new mapboxgl.NavigationControl());

});

