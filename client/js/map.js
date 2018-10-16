mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaGkzMzMiLCJhIjoiY2puMXE1M2ptMXR0aDNrdG45M3RmNnE5MSJ9.yjNjiHocsYo8_gyTxHDWNw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v10',
center: [-82.355133, 29.65],
zoom: 13,
});
map.on('load', function () {
var layers = map.getStyle().layers;
// Find the index of the first symbol layer in the map style
var firstSymbolId;
for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
        firstSymbolId = layers[i].id;
        break;
    }
}
map.addLayer({
    'id': 'lots',
    'type': 'fill',
    'source': {
        'type': 'geojson',
        'data': {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "name":"Lot A"
              },
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [
                      -82.34332323074341,
                      29.64557019797004
                    ],
                    [
                      -82.34334468841553,
                      29.64492680881526
                    ],
                    [
                      -82.34260439872742,
                      29.644973431355968
                    ],
                    [
                      -82.34260439872742,
                      29.6455608735189
                    ],
                    [
                      -82.34332323074341,
                      29.64557019797004
                    ]
                  ]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "name":"Lot B"
              },
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [
                      -82.34466969966888,
                      29.64594317530747
                    ],
                    [
                      -82.34442830085754,
                      29.645518913478078
                    ],
                    [
                      -82.34366923570633,
                      29.645863917738893
                    ],
                    [
                      -82.34363436698914,
                      29.646432705965765
                    ],
                    [
                      -82.34466969966888,
                      29.64594317530747
                    ]
                  ]
                ]
              }
            }
          ]
        }},
    'layout': {},
    'paint': {
        'fill-color': '#7987ff',
        'fill-opacity': 0.4
    }
}, firstSymbolId);

map.on('click', 'lots', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
    });
});