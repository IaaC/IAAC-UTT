//Mapbox Tiles
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVzaGFtc2hhd3F5IiwiYSI6ImNrdnBvY2UwcTFkNDkzM3FmbTFhenM0M3MifQ.ZqIuL9khfbCyOF3DU_IH5w";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/heshamshawqy/ckxynknb6e0r114ped9w2ifqc",
  center: [10.75023856573, 59.91248024216242],
  zoom: 12,
});

const aerial = [10.75023856573, 59.91248024216242];
const project01_location = [10.749895477789892, 59.92315353075296];
const project02_location = [10.726669019577955, 59.91242763463297];
const project03_location = [10.789910419474456, 59.91557188035373];

//INITIAL POSITION
//-------------------------------------------
map.on("load", () => {
  map.flyTo({
    // camera properties
    center: project01_location,
    zoom: 18,
    pitch: 60,
    bearing: 215,
  });
});

//PROJECT VIEWS
//-------------------------------------------

document.getElementById("p1-aerial").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: aerial,
    zoom: 12,
    bearing: 0,
    pitch: -180,

    // The zooming curve
    speed: 0.8, // make the flying slow
    curve: 2, // change the speed at which it zooms out
  });
});

document.getElementById("p1-v1").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: project01_location,
    zoom: 17,
    pitch: 50,
    bearing: 280,
  });
});

document.getElementById("p1-v2").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: project01_location,
    zoom: 19,
    pitch: 100,
    bearing: 200,
  });
});

document.getElementById("p1-v3").addEventListener("click", () => {
  map.flyTo({
    // camera properties
    center: project01_location,
    zoom: 17,
    pitch: 50,
    bearing: 220,
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
function doalert(checkboxElem) {
  if (checkboxElem.checked) {
    rotateCamera(0);
  } else {
    cancelAnimationFrame(requestId);
  }
}

const size = 150;

//ADD ANIMATED POINTS
//-------------------------------------------
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  // Call once before every frame where the icon will be used.
  render: function () {
    const duration = 2000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.4;
    const outerRadius = (size / 2) * 0.8 * t + radius;
    const context = this.context;

    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(0, 170, 109, ${1 - t})`;
    context.fill();

    // Draw the inner circle.
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "#04aa6d";
    context.strokeStyle = "white";
    context.lineWidth = 3 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // Update this image's data with data from the canvas.
    this.data = context.getImageData(0, 0, this.width, this.height).data;

    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint();

    // Return `true` to let the map know that the image was updated.
    return true;
  },
};

map.on("load", () => {
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

  map.addSource("dot-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [10.749895477789892, 59.92315353075296], // icon position [lng, lat]
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [10.726669019577955, 59.91242763463297], // icon position [lng, lat]
          },
        },

        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [10.789910419474456, 59.91557188035373], // icon position [lng, lat]
          },
        },
      ],
    },
  });

  map.addLayer({
    id: "layer-with-pulsing-dot",
    type: "symbol",
    source: "dot-point",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });

  map.on("click", ["layer-with-pulsing-dot"], (e) => {
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 16,
      pitch: 50,
    });
  });
});

//CONTEXT 3D BUILDINGS
//-------------------------------------------
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
        "fill-extrusion-color": "#5D718C",

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
        "fill-extrusion-opacity": 0.5,
      },
    },
    labelLayerId
  );
});

//GLTF LOADER - RHINO MODEL
//-------------------------------------------
map.on("load", () => {
  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = project01_location;
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 260, 0];

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
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(-280, 0, 100).normalize();
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      ambientLight.castShadow = true;
      this.scene.add(ambientLight);

      //GLTF IMPORT
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      var loader = new THREE.GLTFLoader();
      loader.load("3d_models/01.glb", (gltf) => {
        this.scene.scale.set(0.65, 0.65, 0.65);
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

// Add geocoder to the map(search buttom)
//-------------------------------------------
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
//-------------------------------------------
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
//-------------------------------------------
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
