//Mapbox Tiles
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVzaGFtc2hhd3F5IiwiYSI6ImNrdnBvY2UwcTFkNDkzM3FmbTFhenM0M3MifQ.ZqIuL9khfbCyOF3DU_IH5w';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/heshamshawqy/ckvptxpz77qp514mzq792dwnw',
center: [10.768656923856573, 59.91248024216242],
zoom: 12
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
  center: e.features[0].geometry.coordinates
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
      map.addControl(geocoder);
      map.addControl(new mapboxgl.FullscreenControl());
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new PitchToggle({minpitchzoom: 15})); 
    