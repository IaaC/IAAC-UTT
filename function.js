//Mapbox Tiles
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVzaGFtc2hhd3F5IiwiYSI6ImNrdnBvY2UwcTFkNDkzM3FmbTFhenM0M3MifQ.ZqIuL9khfbCyOF3DU_IH5w";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/heshamshawqy/ckxynknb6e0r114ped9w2ifqc",
  center: [10.71523856573, 59.91248024216242],
  zoom: 12,
});
// disable map rotation using right click + drag
// disable map rotation using touch rotation gesture
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();



const aerial = [10.71523856573, 59.91248024216242];
const project01_location = [10.749895477789892, 59.92315353075296];
const project02_location = [10.726669019577955, 59.91242763463297];
const project03_location = [10.755055014344887, 59.898961322587056];
//59.89842420846762, 10.751849452110017
//59.898961322587056, 10.755055014344887

//PROJECT VIEWS
//------------------------------------------


//PROJECT 01
//------------------------------------------
map.on("load", () => {
  document.getElementById("p1-view").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project01_location,
      zoom: 17.5,
      pitch: 55.5,
      bearing: -200,
    });
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
  });
  
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
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
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
      bearing: 5,
    });
  });
  });

//PROJECT 02
//------------------------------------------
map.on("load", () => {
  document.getElementById("p2-view").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project02_location,
      zoom: 18,
      pitch: 60,
      bearing: -30,
    });
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
  });
  
  document.getElementById("p2-aerial").addEventListener("click", () => {
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
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
  });
  
  document.getElementById("p2-v1").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project02_location,
      zoom: 17,
      pitch: 50,
      bearing: 280,
    });
  });
  
  document.getElementById("p2-v2").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project02_location,
      zoom: 19,
      pitch: 100,
      bearing: 150,
    });
  });
  
  document.getElementById("p2-v3").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project02_location,
      zoom: 17.5,
      pitch: 50,
      bearing: 360,
    });
  });
  });

  //PROJECT 03
//------------------------------------------
map.on("load", () => {
  document.getElementById("p3-view").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project03_location,
      zoom: 17.5,
      pitch: 55.5,
      bearing: -200,
    });
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
  });
  
  document.getElementById("p3-aerial").addEventListener("click", () => {
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
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
  });
  
  document.getElementById("p3-v1").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project03_location,
      zoom: 15.5,
      pitch: 50,
      bearing: 200,
    });
  });
  
  document.getElementById("p3-v2").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project03_location,
      zoom: 15.5,
      pitch: 50,
      bearing: 430,
    });
  });
  
  document.getElementById("p3-v3").addEventListener("click", () => {
    map.flyTo({
      // camera properties
      center: project03_location,
      zoom: 17,
      pitch: 50,
      bearing: 5,
    });
  });
  });




// building animate

function rotateCamera(timestamp) {
  map.dragRotate.enable();
  map.touchZoomRotate.enable();
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 100) % 360, {
    duration: 0,
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
  map.on("mouseout", "state-fills", () => {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: "states", id: hoveredStateId },
        { hover: false }
      );
    }

    // Adding pop-ups
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
    popup.addClassName("region-popup");

    map.on("click", "state-fills", (e) => {
      popup
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.STATE_NAME)
        .addTo(map);
    });

    map.on("mousemove", "state-fills", () => {
      /*       map.getCanvas().style.cursor = ""; */
      popup.remove();
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

  map.addSource("dot-point-01", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              "<h5><strong>HASEL COMPLEX</strong></h5><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quos odit asperiores ex, est nesciunt. Itaque cupiditate eligendi dicta asperiores nihil quae nostrum architecto maxime.</p>",

            button: "Add move",
          },
          geometry: {
            type: "Point",
            coordinates: project01_location, // icon position [lng, lat]
          },
        },
      ],
    },
  });

  map.addSource("dot-point-02", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              "<h5><strong>FREDENSBORG MARKET</strong></h5><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quos odit asperiores ex, est nesciunt. Itaque cupiditate eligendi dicta asperiores nihil quae nostrum architecto maxime.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: project02_location, // icon position [lng, lat]
          },
        },
      ],
    },
  });

  map.addSource("dot-point-03", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              "<h5><strong>GRØNLIKAIA</strong></h5><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quos odit asperiores ex, est nesciunt. Itaque cupiditate eligendi dicta asperiores nihil quae nostrum architecto maxime.</p>",
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
    id: "layer-with-pulsing-dot-01",
    type: "symbol",
    source: "dot-point-01",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });

  map.addLayer({
    id: "layer-with-pulsing-dot-02",
    type: "symbol",
    source: "dot-point-02",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });

  map.addLayer({
    id: "layer-with-pulsing-dot-03",
    type: "symbol",
    source: "dot-point-03",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });

  map.on("click", ["layer-with-pulsing-dot-01"], (e) => {
    map.getCanvas().style.cursor = "pointer";
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 17.5,
      pitch: 55.5,
      bearing: -152,
    });
    navToggleP1();
    testiToggle();
    listToggle();
    map.setLayoutProperty("layer-with-pulsing-dot-01", "visibility", "none");
    map.setLayoutProperty("state-fills", "visibility", "none");
    map.setLayoutProperty("state-borders", "visibility", "none");
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
    remove.mapboxgl.popup();
  });

  map.on("click", ["layer-with-pulsing-dot-02"], (e) => {
    map.getCanvas().style.cursor = "pointer";
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 18,
      pitch: 60,
      bearing: -30,
    });
    navToggleP2();
    testiToggleP2();
    listToggle();
    map.setLayoutProperty("layer-with-pulsing-dot-02", "visibility", "none");
    map.setLayoutProperty("state-fills", "visibility", "none");
    map.setLayoutProperty("state-borders", "visibility", "none");
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
    remove.mapboxgl.popup();
  });
  map.on("click", ["layer-with-pulsing-dot-03"], (e) => {
    map.getCanvas().style.cursor = "pointer";
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 17.5,
      pitch: 55.5,
      bearing: -200,
    });
    navToggleP3();
    testiToggleP3();
    listToggle();
    map.setLayoutProperty("layer-with-pulsing-dot-03", "visibility", "none");
    map.setLayoutProperty("state-fills", "visibility", "none");
    map.setLayoutProperty("state-borders", "visibility", "none");
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
    remove.mapboxgl.popup();
  });
});

// Animate Dots pop-ups
var popup = new mapboxgl.Popup({
  closeButton: true,
  closeOnClick: true,
  closeOnMove: true,
  className: "dots-pop",
});

map.on(
  "mouseenter",
  [
    "layer-with-pulsing-dot-01",
    "layer-with-pulsing-dot-02",
    "layer-with-pulsing-dot-03",
  ],
  (e) => {
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
  }
);
map.on(
  "mouseleave",
  [
    "layer-with-pulsing-dot-01",
    "layer-with-pulsing-dot-02",
    "layer-with-pulsing-dot-03",
  ],
  (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "";
    popup.remove();
  }
);
map.on(
  "click",
  [
    "layer-with-pulsing-dot-01 , layer-with-pulsing-dot-02, layer-with-pulsing-dot-03",
  ],
  () => {
    map.getCanvas().style.cursor = "pointer";
    popup.remove();
  }
);

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
        "fill-extrusion-opacity": 0.6,
      },
    },
    labelLayerId
  );
});




//GLTF LOADER - RHINO MODEL
//-------------------------------------------

//PROJECT01
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
    id: "3d-model5",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(120, 0, 100).normalize();
      directionalLight.castShadow = false;
      this.scene.add(directionalLight);

      const directionalLight_2 = new THREE.DirectionalLight(0xe6b484, 0.5);
      directionalLight_2.position.set(30,120, 60).normalize();
      directionalLight_2.castShadow = false;
      this.scene.add(directionalLight_2);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      ambientLight.castShadow = true;
      this.scene.add(ambientLight);

      const path = "pisa/";
      const format = '.png';
      const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      const textureCube = new THREE.CubeTextureLoader().load( urls );

      scene = new THREE.Scene();
      scene.background = textureCube;


      //GLTF IMPORT
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      
      var loader = new THREE.GLTFLoader();
      loader.load("3d_models/03.glb", (gltf) => {
        this.scene.scale.set(1, 1, 1);
        this.scene.add(gltf.scene);

        var model = gltf.scene;
        var newMaterial = new THREE.MeshPhysicalMaterial({
          
          color: 0x848380,
          /* envMap: textureCube, */
          clearcoat: 1,
          clearcoatRoughness: 0.2,
          roughness: 1,
        });
        model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
        });
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
    id: "3d-model6",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(120, 0, 100).normalize();
      directionalLight.castShadow = false;
      this.scene.add(directionalLight);

      const directionalLight_2 = new THREE.DirectionalLight(0xe6b484, 0.5);
      directionalLight_2.position.set(30,120, 60).normalize();
      directionalLight_2.castShadow = false;
      this.scene.add(directionalLight_2);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      ambientLight.castShadow = true;
      this.scene.add(ambientLight);

      const path = "pisa/";
      const format = '.png';
      const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      const textureCube = new THREE.CubeTextureLoader().load( urls );

      scene = new THREE.Scene();
      scene.background = textureCube;


      //GLTF IMPORT
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      
      var loader = new THREE.GLTFLoader();
      loader.load("3d_models/03Glass.glb", (gltf) => {
        this.scene.scale.set(1, 1, 1);
        this.scene.add(gltf.scene);

        var model = gltf.scene;
        var newMaterial = new THREE.MeshPhysicalMaterial({
          
          color: 0x2d5c72,
          /* envMap: textureCube, ,*/
          transparent: true,
          opacity: 0.4
        });
        model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
        });
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
//PROJECT02
//-------------------------------------------
map.on("load", () => {
  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = project02_location;
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 20, 0];

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
    id: "3d-model3",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(120, 0, 100).normalize();
      directionalLight.castShadow = false;
      this.scene.add(directionalLight);

      const directionalLight_2 = new THREE.DirectionalLight(0xe6b484, 0.5);
      directionalLight_2.position.set(30,120, 60).normalize();
      directionalLight_2.castShadow = false;
      this.scene.add(directionalLight_2);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      ambientLight.castShadow = true;
      this.scene.add(ambientLight);

      const path = "pisa/";
      const format = '.png';
      const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      const textureCube = new THREE.CubeTextureLoader().load( urls );

      scene = new THREE.Scene();
      scene.background = textureCube;


      //GLTF IMPORT
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      
      var loader = new THREE.GLTFLoader();
      loader.load("3d_models/02.glb", (gltf) => {
        this.scene.scale.set(0.65, 0.65, 0.65);
        this.scene.add(gltf.scene);

        var model = gltf.scene;
        var newMaterial = new THREE.MeshPhysicalMaterial({
          
          color: 0x848380,
          /* envMap: textureCube, */
          clearcoat: 1,
          clearcoatRoughness: 0.2,
          roughness: 1,
        });
        model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
        });
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
map.on("load", () => {
  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = project02_location;
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 20, 0];

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
    id: "3d-model4",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(120, 0, 100).normalize();
      directionalLight.castShadow = false;
      this.scene.add(directionalLight);

      const directionalLight_2 = new THREE.DirectionalLight(0xe6b484, 0.5);
      directionalLight_2.position.set(30,120, 60).normalize();
      directionalLight_2.castShadow = false;
      this.scene.add(directionalLight_2);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      ambientLight.castShadow = true;
      this.scene.add(ambientLight);

      const path = "pisa/";
      const format = '.png';
      const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      const textureCube = new THREE.CubeTextureLoader().load( urls );

      scene = new THREE.Scene();
      scene.background = textureCube;


      //GLTF IMPORT
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      
      var loader = new THREE.GLTFLoader();
      loader.load("3d_models/02Glass.glb", (gltf) => {
        this.scene.scale.set(0.65, 0.65, 0.65);
        this.scene.add(gltf.scene);

        var model = gltf.scene;
        var newMaterial = new THREE.MeshPhysicalMaterial({
          
          color: 0x2d5c72,
          /* envMap: textureCube, ,*/
          transparent: true,
          opacity: 0.4
        });
        model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
        });
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
//PROJECT03
//-------------------------------------------
map.on("load", () => {
  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = [10.7514, 59.89842420846750];
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, -81.55, 0];

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
    id: "3d-model00",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(120, 350, 100).normalize();
      directionalLight.castShadow = false;
      this.scene.add(directionalLight);

      const directionalLight_2 = new THREE.DirectionalLight(0xe6b484, 0.5);
      directionalLight_2.position.set(250,450, 60).normalize();
      directionalLight_2.castShadow = false;
      this.scene.add(directionalLight_2);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      ambientLight.castShadow = true;
      this.scene.add(ambientLight);

      const path = "pisa/";
      const format = '.png';
      const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      const textureCube = new THREE.CubeTextureLoader().load( urls );

      scene = new THREE.Scene();
      scene.background = textureCube;


      //GLTF IMPORT
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      
      var loader = new THREE.GLTFLoader();
      loader.load("3d_models/00_Parallelloppdrag.glb", (gltf) => {
        this.scene.scale.set(1.3, 1.3, 1.3);
        this.scene.add(gltf.scene);

        var model = gltf.scene;
        var newMaterial = new THREE.MeshPhysicalMaterial({
          
          color: 0x848380,
          /* envMap: textureCube, */
          clearcoat: 1,
          clearcoatRoughness: 0.2,
          roughness: 1,
        });
        model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
        });
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
map.on("load", () => {
  // parameters to ensure the model is georeferenced correctly on the map
  const modelOrigin = [10.7514, 59.89842420846750];
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, -81.55, 0];

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
    id: "3d-model210",
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      // create two three.js lights to illuminate the model
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(120, 350, 100).normalize();
      directionalLight.castShadow = false;
      this.scene.add(directionalLight);

      const directionalLight_2 = new THREE.DirectionalLight(0xe6b484, 0.5);
      directionalLight_2.position.set(250,450, 60).normalize();
      directionalLight_2.castShadow = false;
      this.scene.add(directionalLight_2);

      // add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      ambientLight.castShadow = true;
      this.scene.add(ambientLight);

      const path = "pisa/";
      const format = '.png';
      const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      const textureCube = new THREE.CubeTextureLoader().load( urls );

      scene = new THREE.Scene();
      scene.background = textureCube;


      //GLTF IMPORT
      // use the three.js GLTF loader to add the 3D model to the three.js scene
      
      var loader = new THREE.GLTFLoader();
      loader.load("3d_models/01_Parallelloppdrag.glb", (gltf) => {
        this.scene.scale.set(1.3, 1.3, 1.3);
        this.scene.add(gltf.scene);

        var model = gltf.scene;
        var newMaterial = new THREE.MeshPhysicalMaterial({
          
          color: 0x303030,
          /* envMap: textureCube, */
          clearcoat: 1,
          clearcoatRoughness: 0.2,
          roughness: 1,
        });
        model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
        });
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
// Mapbox Controls
//-------------------------------------------

map.addControl(new mapboxgl.NavigationControl(), "top-right");


document.getElementById("p1-view").addEventListener("click", () => {
  map.setLayoutProperty("layer-with-pulsing-dot-01", "visibility", "none");
  map.setLayoutProperty("layer-with-pulsing-dot-02", "visibility", "none");
  map.setLayoutProperty("layer-with-pulsing-dot-03", "visibility", "none");
  map.setLayoutProperty("state-fills", "visibility", "none");
  map.setLayoutProperty("state-borders", "visibility", "none");
});

document.getElementById("p2-view").addEventListener("click", () => {
  map.setLayoutProperty("layer-with-pulsing-dot-01", "visibility", "none");
  map.setLayoutProperty("layer-with-pulsing-dot-02", "visibility", "none");
  map.setLayoutProperty("layer-with-pulsing-dot-03", "visibility", "none");
  map.setLayoutProperty("state-fills", "visibility", "none");
  map.setLayoutProperty("state-borders", "visibility", "none");
});
document.getElementById("p3-view").addEventListener("click", () => {
  map.setLayoutProperty("layer-with-pulsing-dot-01", "visibility", "none");
  map.setLayoutProperty("layer-with-pulsing-dot-02", "visibility", "none");
  map.setLayoutProperty("layer-with-pulsing-dot-03", "visibility", "none");
  map.setLayoutProperty("state-fills", "visibility", "none");
  map.setLayoutProperty("state-borders", "visibility", "none");
});
document.getElementById("p1-aerial").addEventListener("click", () => {
  map.setLayoutProperty("layer-with-pulsing-dot-01", "visibility", "visible");
  map.setLayoutProperty("layer-with-pulsing-dot-02", "visibility", "visible");
  map.setLayoutProperty("layer-with-pulsing-dot-03", "visibility", "visible");
  map.setLayoutProperty("state-fills", "visibility", "visible");
  map.setLayoutProperty("state-borders", "visibility", "visible");
});

document.getElementById("p2-aerial").addEventListener("click", () => {
  map.setLayoutProperty("layer-with-pulsing-dot-01", "visibility", "visible");
  map.setLayoutProperty("layer-with-pulsing-dot-02", "visibility", "visible");
  map.setLayoutProperty("layer-with-pulsing-dot-03", "visibility", "visible");
  map.setLayoutProperty("state-fills", "visibility", "visible");
  map.setLayoutProperty("state-borders", "visibility", "visible");
});

document.getElementById("p3-aerial").addEventListener("click", () => {
  map.setLayoutProperty("layer-with-pulsing-dot-01", "visibility", "visible");
  map.setLayoutProperty("layer-with-pulsing-dot-02", "visibility", "visible");
  map.setLayoutProperty("layer-with-pulsing-dot-03", "visibility", "visible");
  map.setLayoutProperty("state-fills", "visibility", "visible");
  map.setLayoutProperty("state-borders", "visibility", "visible");
});
