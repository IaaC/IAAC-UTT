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

//ADD SELECTABLE REGIONS
//-------------------------------------------

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
      "fill-color": "#8C6E5D",
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
      "line-color": "#8C6E5D",
      "line-width": 2,
    },
  });

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on("mousemove", "state-fills", (e) => {
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
    context.fillStyle = `rgba(191, 69, 69, ${1 - t})`;
    context.fill();

    // Draw the inner circle.
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "#BF4545";
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
          properties: {
            description:
              "<h5><strong>HASEL COMPLEX</strong></h5><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quos odit asperiores ex, est nesciunt. Itaque cupiditate eligendi dicta asperiores nihil quae nostrum architecto maxime.</p><a href='project01.html' class='pop-link'> <strong>Explore Project</strong></a>",
            image: "img/img-01",
          },
          geometry: {
            type: "Point",
            coordinates: project01_location, // icon position [lng, lat]
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<h5><strong>FREDENSBORG MARKET</strong></h5><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quos odit asperiores ex, est nesciunt. Itaque cupiditate eligendi dicta asperiores nihil quae nostrum architecto maxime.</p><a href='project01.html' class='pop-link'> <strong>Explore Project</strong></a>",
          },
          geometry: {
            type: "Point",
            coordinates: project02_location, // icon position [lng, lat]
          },
        },

        {
          type: "Feature",
          properties: {
            description:
              "<h5><strong>VIKA HOSPITAL</strong></h5><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quos odit asperiores ex, est nesciunt. Itaque cupiditate eligendi dicta asperiores nihil quae nostrum architecto maxime.</p><a href='project01.html' class='pop-link'> <strong>Explore Project</strong></a>",
          },
          geometry: {
            type: "Point",
            coordinates: project03_location, // icon position [lng, lat]
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

// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

map.on("mouseenter", "layer-with-pulsing-dot", (e) => {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = "pointer";

  // Copy coordinates array.
  const coordinates = e.features[0].geometry.coordinates.slice();
  const description = e.features[0].properties.description;

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates).setHTML(description).addTo(map);
});

map.on("click", "layer-with-pulsing-dot", () => {
  map.getCanvas().style.cursor = "";
  popup.remove();
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
        "fill-extrusion-opacity": 1,
      },
    },
    labelLayerId
  );
});

//GLTF LOADER - RHINO MODEL
//-------------------------------------------
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
