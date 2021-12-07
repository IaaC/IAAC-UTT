//Mapbox Tiles
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVzaGFtc2hhd3F5IiwiYSI6ImNrdnBvY2UwcTFkNDkzM3FmbTFhenM0M3MifQ.ZqIuL9khfbCyOF3DU_IH5w';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/heshamshawqy/ckwluar2w5ig014n48da1j59q',
center: [10.768656923856573, 59.91248024216242],
zoom: 12
});

// Onclick go back to map view
//event listner
document.getElementById('fly').addEventListener('click', () => {
 
map.flyTo({
// camera properties
center: [10.768656923856573, 59.91248024216242],
zoom: 12,
bearing: 0,
pitch: -180,

// The zooming curve
speed: 0.8, // make the flying slow
curve: 2, // change the speed at which it zooms out

});
});
// building view01
document.getElementById('view01').addEventListener('click', () => {
 
    map.flyTo({
    // camera properties
    center: [10.753865805902912, 59.92488797977771],
    zoom: 18,
    pitch:60,
    bearing:50,
    });
    
});
// building view02
document.getElementById('view02').addEventListener('click', () => {
 
    map.flyTo({
    // camera properties
    center: [10.753865805902912, 59.92488797977771],
    zoom: 19,
    pitch:30,
    bearing:120,

    });
});
// building view03
document.getElementById('view03').addEventListener('click', () => {
 
        map.flyTo({
        // camera properties
        center: [10.753865805902912, 59.92488797977771],
        zoom: 18,
        pitch:45,
        bearing:160,
    
        });
});
// building animate
function rotateCamera(timestamp) {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    map.rotateTo((timestamp / 50) % 360, { 
    duration: 1 
    });
    // Request the next frame of the animation.
    requestAnimationFrame(rotateCamera);
    }
document.getElementById('animate').addEventListener('click', () => {
        rotateCamera(0);
    });
 
    
//Add selectable Regions
let hoveredStateId = null;
 
    map.on('load', () => {
    map.addSource('states', {
    'type': 'geojson',
    'data': 'lib/oslo\.geojson'
    });
     
    // The feature-state dependent fill-opacity expression will render the hover effect
    // when a feature's hover state is set to true.
    map.addLayer({
    'id': 'state-fills',
    'type': 'fill',
    'source': 'states',
    'layout': {},
    'paint': {
    'fill-color': '#3582a2',
    'fill-opacity': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    .9,
    0.3
    ]
    }
    });
     
    map.addLayer({
    'id': 'state-borders',
    'type': 'line',
    'source': 'states',
    'layout': {},
    'paint': {
    'line-color': '#3582a2',
    'line-width': 2
    }
    });
     
    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
    map.on('mousemove', 'state-fills', (e) => {
    if (e.features.length > 0) {
    if (hoveredStateId !== null) {
    map.setFeatureState(
    { source: 'states', id: hoveredStateId },
    { hover: false }
    );
    }
    hoveredStateId = e.features[0].id;
    map.setFeatureState(
    { source: 'states', id: hoveredStateId },
    { hover: true }
    );
    }
    });
     
    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on('mouseleave', 'state-fills', () => {
    if (hoveredStateId !== null) {
    map.setFeatureState(
    { source: 'states', id: hoveredStateId },
    { hover: false }
    );
    }
    // Adding pop-ups
    map.on('click', 'state-fills', (e) => {
        new mapboxgl.Popup()
        
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.STATE_NAME)
        .addTo(map);
        });
         
        // Change the cursor to a pointer when
        // the mouse is over the states layer.
        map.on('mouseenter', 'state-fills', () => {
        map.getCanvas().style.cursor = 'pointer';
        });
         
        // Change the cursor back to a pointer
        // when it leaves the states layer.
        map.on('mouseleave', 'state-fills', () => {
        map.getCanvas().style.cursor = '';
        });

    hoveredStateId = null;
    });
    });
    
    
//Flyto circles function
map.on('load', () => {
  // Add a GeoJSON source with 3 points.
  map.addSource('points', {
  'type': 'geojson',
  'data': {
  'type': 'FeatureCollection',
  'features': [
  {
  'type': 'Feature',
  'properties': {},
  'geometry': {
  'type': 'Point',
  'coordinates': [10.735380129405243, 59.913330867746105]
  }
  },
  {
  'type': 'Feature',
  'properties': {},
  'geometry': {
  'type': 'Point',
  'coordinates': [10.802150689920747, 59.90842688069656]
  }
  },
  {
  'type': 'Feature',
  'properties': {},
  'geometry': {
  'type': 'Point',
  'coordinates': [10.753865805902912, 59.92488797977771]
  }
  }
  ]
  }
  });
  // Add a circle layer
  map.addLayer({
  'id': 'circle',
  'type': 'circle',
  'source': 'points',
  'paint': {
  'circle-color': '#4264fb',
  'circle-radius': 12,
  'circle-stroke-width': 3,
  'circle-stroke-color': '#ffffff'
  }
  });
 
  // Center the map on the coordinates of any clicked circle from the 'circle' layer.
  map.on('click', 'circle', (e) => {
  map.flyTo({
  center: e.features[0].geometry.coordinates,
  zoom: 19,
  pitch:60,


  });
  });
   
  // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
  map.on('mouseenter', 'circle', () => {
  map.getCanvas().style.cursor = 'pointer';
  });
   
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'circle', () => {
  map.getCanvas().style.cursor = '';
  });
  });

  
  
//3D Buildings
  map.on('load', () => {
    // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
    (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;
     
    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.addLayer(
    {
    'id': 'add-3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#aaa',
     
    // Use an 'interpolate' expression to
    // add a smooth transition effect to
    // the buildings as the user zooms in.
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.8
    }
    },
    labelLayerId
    );
    });



 // Add geocoder to the map(search buttom)
const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'poi',
      // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
      render: function (item) {
      // extract the item's maki icon or use a default
      const maki = item.properties.maki || 'marker';
      return `<div class='geocoder-dropdown-item'>
      <img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'>
      <span class='geocoder-dropdown-text'>
      ${item.text}
      </span>
      </div>`;
      },
      mapboxgl: mapboxgl
      });



// Add geolocate control to the map to locate the user location.
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    showAccuracyCircle: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
    );


//Camera motion 01
/* // jump to coordinates at current zoom
map.jumpTo({center: [0, 0]});
// jump with zoom, pitch, and bearing options
map.jumpTo({
center: [0, 0],
zoom: 8,
pitch: 45,
bearing: 90
}); */

//Camera motion 02
/* const CameraCoordinates = [
    [10.735380129405243, 59.913330867746105],
    [10.735380129405243, 59.913330867746105],
    [10.735380129405243, 59.913330867746105],
    [10.735380129405243, 59.913330867746105],
    [10.735380129405243, 59.913330867746105],
    [10.735380129405243, 59.913330867746105],
    [10.735380129405243, 59.913330867746105]
    ];

map.on('load', () => {
for (const [index, coordinate] of CameraCoordinates.entries()) {
setTimeout(() => {
map.jumpTo({ 
center: coordinate,
zoom: 17,
pitch: 80,
bearing: 10

});
}, 2000 * index);
}
}); */



// Add navigation tools
class PitchToggle {
    
    constructor({bearing = -20, pitch = 50, minpitchzoom = null}) {
        this._bearing = bearing;
        this._pitch = pitch;
        this._minpitchzoom = minpitchzoom;
    }

    onAdd(map) {
        this._map = map;
        let _this = this; 

        this._btn = document.createElement('button');
        this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
        this._btn.type = 'button';
        this._btn['aria-label'] = 'Toggle Pitch';
        this._btn.onclick = function() { 
            if (map.getPitch() === 0) {
                let options = {pitch: _this._pitch, bearing: _this._bearing};
                if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
                    options.zoom = _this._minpitchzoom;
                }
                map.easeTo(options);
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d';
            } else {
                map.easeTo({pitch: 0, bearing: 0});
                _this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
            } 
        };
        

        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.appendChild(this._btn);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

}
      map.addControl(geocoder, 'top-left') ;
      map.addControl(new mapboxgl.FullscreenControl());
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      map.addControl(new PitchToggle({minpitchzoom: 15}), 'top-left'); 

