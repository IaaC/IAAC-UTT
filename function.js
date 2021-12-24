//Mapbox Tiles
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVzaGFtc2hhd3F5IiwiYSI6ImNrdnBvY2UwcTFkNDkzM3FmbTFhenM0M3MifQ.ZqIuL9khfbCyOF3DU_IH5w";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/heshamshawqy/ckwluar2w5ig014n48da1j59q",
  center: [10.75023856573, 59.91248024216242],
  zoom: 12,
});

//Add selectable Regions
let hoveredStateId = null;

map.on("load", () => {
  map.addSource("states", {
    type: "geojson",
    data: "lib/oslo.geojson",
  });

  // The feature-state dependent fill-opacity expression will render the hover effect
  // when a feature's hover state is set to true.
  map.addLayer({
    id: "state-fills",
    type: "fill",
    source: "states",
    layout: {},
    paint: {
      "fill-color": "#3582a2",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.9,
        0.05,
      ],
    },
  });

  map.addLayer({
    id: "state-borders",
    type: "line",
    source: "states",
    layout: {},
    paint: {
      "line-color": "#3582a2",
      "line-width": 3,
    },
  });

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on("click", "state-fills", (e) => {
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        { source: "states", id: hoveredStateId },
        { hover: true }
      );
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on("mouseleave", "state-fills", () => {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: "states", id: hoveredStateId },
        { hover: false }
      );
    }
    // Adding pop-ups
    map.on("click", "state-fills", (e) => {
      new mapboxgl.Popup()

        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.STATE_NAME)
        .addTo(map);
    });

    // Change the cursor to a pointer when
    // the mouse is over the states layer.
    map.on("mouseenter", "state-fills", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change the cursor back to a pointer
    // when it leaves the states layer.
    map.on("mouseleave", "state-fills", () => {
      map.getCanvas().style.cursor = "";
    });

    hoveredStateId = null;
  });
});

// Onclick go back to map view
//event listner
/* document.getElementById("fly").addEventListener("click", () => {
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
document.getElementById("view01").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: [10.780161403334201, 59.92377145251343],
    zoom: 17,
    pitch: 50,
    bearing: 50,
  });
});
// building view02
document.getElementById("view02").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: [10.780161403334201, 59.92377145251343],
    zoom: 16.5,
    pitch: 40,
    bearing: 190,
  });
});
// building view03
document.getElementById("view03").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: [10.780161403334201, 59.92377145251343],
    zoom: 16.5,
    pitch: 45,
    bearing: 300,
  });
});
// building animate

function rotateCamera(timestamp) {
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 50) % 360, {
    duration: 10,
  });
  // Request the next frame of the animation.
  requestId = window.requestAnimationFrame(rotateCamera);
}

document.getElementById("animate").addEventListener("click", () => {
  rotateCamera(0);
});

//Stop the animation
document.getElementById("stopanimate").addEventListener("click", () => {
  cancelAnimationFrame(requestId);
}); */

document.getElementById("project-one-button").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: [10.780161403334201, 59.92377145251343],
    zoom: 16,
    pitch: 50,
    bearing: 50,
  });
});

document.getElementById("project-two-button").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: [10.735380129405243, 59.913330867746105],
    zoom: 16,
    pitch: 50,
    bearing: 50,
  });
});

document
  .getElementById("project-three-button")
  .addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: [10.753865805902912, 59.92488797977771],
      zoom: 16,
      pitch: 50,
      bearing: 50,
    });
  });

//Flyto circles function
map.on("load", () => {
  // Add a GeoJSON source with 3 points.
  map.addSource("points", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [10.735380129405243, 59.913330867746105],
          },
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [10.753865805902912, 59.92488797977771],
          },
        },
      ],
    },
  });

  map.addSource("point02", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [10.780161403334201, 59.92377145251343],
          },
        },
      ],
    },
  });
  // Add a circle layer
  map.addLayer({
    id: "circle",
    type: "circle",
    source: "points",
    paint: {
      "circle-color": "#1e2458",
      "circle-radius": 12,
      "circle-stroke-width": 3,
      "circle-stroke-color": "#ffffff",
    },
  });
  map.addLayer({
    id: "circle02",
    type: "circle",
    source: "point02",
    paint: {
      "circle-color": "#1e2458",
      "circle-radius": 12,
      "circle-stroke-width": 3,
      "circle-stroke-color": "#ffffff",
    },
  });

  // Center the map on the coordinates of any clicked circle from the 'circle' layer.
  map.on("click", ["circle", "circle02"], (e) => {
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 16,
      pitch: 50,
    });
  });

  // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
  map.on("mouseenter", ["circle", "circle02"], () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", ["circle", "circle02"], () => {
    map.getCanvas().style.cursor = "";
  });
});

//CONTEXT 3D BUILDINGS
map.on("load", () => {
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
    (layer) => layer.type === "symbol" && layer.layout["text-field"]
  ).id;

  // The 'building' layer in the Mapbox Streets
  // vector tileset contains building height data
  // from OpenStreetMap.
  map.addLayer(
    {
      id: "add-3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",

        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.8,
      },
    },
    labelLayerId
  );
});

//GLTF LOADER - RHINO MODEL
map.on("load", () => {
  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = [10.780161403334201, 59.92377145251343];
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 0, 0];

  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  );

  // transformation parameters to position, rotate and scale the 3D model onto the map
  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since the 3D model is in real world meters, a scale transform needs to be
     * applied since the CustomLayerInterface expects units in MercatorCoordinates.
     */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
  };

  const THREE = window.THREE;

  // configuration of the custom layer for a 3D model per the CustomLayerInterface
  const customLayer = {
    id: "3d-model",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xadebff);
      directionalLight.position.set(0, -70, 100).normalize();
      this.scene.add(directionalLight);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xadebff, 2);
      this.scene.add(ambientLight);

      const directionalLight2 = new THREE.DirectionalLight(0xadebff);
      directionalLight2.position.set(0, 70, 100).normalize();
      this.scene.add(directionalLight2);

      // use the three.js GLTF loader to add the 3D model to the three.js scene
      var loader = new THREE.GLTFLoader();
      loader.load("lib/viziers_observation_deck/scene.gltf", (gltf) => {
        this.scene.scale.set(0.05, 0.05, 0.05);
        this.scene.add(gltf.scene);
      });
      this.map = map;

      // use the Mapbox GL JS map canvas for three.js
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      );
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      );
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform.translateX,
          modelTransform.translateY,
          modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);

      this.camera.projectionMatrix = m.multiply(l);
      this.renderer.resetState();
      this.renderer.render(this.scene, this.camera);
      this.map.triggerRepaint();
    },
  };
  map.addLayer(customLayer, "waterway-label");
});

//Dashboard function
(function () {
  "use strict";

  feather.replace({ "aria-hidden": "true" });

  // Graphs
  var ctx = document.getElementById("myChart");
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Hasel Complex",
        "Fred. Market",
        "Vika Hospital",
        "Bislett Tower",
        "Old Town Station",
      ],
      datasets: [
        {
          data: [8, 4, 3, 6, 7, 3, 0, 10],
          lineTension: 0,
          backgroundColor: "transparent",
          borderColor: "rgb(30, 36, 88)",
          borderWidth: 4,
          pointRadius: 10,
          pointBackgroundColor: "rgb(30, 36, 88)",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
})();

// Add geocoder to the map(search buttom)
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: "poi",
  // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
  render: function (item) {
    // extract the item's maki icon or use a default
    const maki = item.properties.maki || "marker";
    return `<div class='geocoder-dropdown-item'>
      <img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'>
      <span class='geocoder-dropdown-text'>
      ${item.text}
      </span>
      </div>`;
  },
  mapboxgl: mapboxgl,
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
    showUserHeading: true,
  })
);

// Add navigation tools
class PitchToggle {
  constructor({ bearing = -20, pitch = 50, minpitchzoom = null }) {
    this._bearing = bearing;
    this._pitch = pitch;
    this._minpitchzoom = minpitchzoom;
  }

  onAdd(map) {
    this._map = map;
    let _this = this;

    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
    this._btn.type = "button";
    this._btn["aria-label"] = "Toggle Pitch";
    this._btn.onclick = function () {
      if (map.getPitch() === 0) {
        let options = { pitch: _this._pitch, bearing: _this._bearing };
        if (_this._minpitchzoom && map.getZoom() > _this._minpitchzoom) {
          options.zoom = _this._minpitchzoom;
        }
        map.easeTo(options);
        _this._btn.className =
          "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
      } else {
        map.easeTo({ pitch: 0, bearing: 0 });
        _this._btn.className =
          "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
      }
    };

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
map.addControl(geocoder, "top-left");
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl(), "top-left");
map.addControl(new PitchToggle({ minpitchzoom: 15 }), "top-left");
