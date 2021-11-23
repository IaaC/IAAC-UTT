//01-calling leaflet map function (html id) [coordinates],[zoom level]
//var map = L.map('map').setView([59.91330585167756, 10.740362280359246], 16);

/* //01-Mapbox Styles
L.tileLayer('https://api.mapbox.com/styles/v1/heshamshawqy/ckvppcy286hqi15qt2kzc9ds8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGVzaGFtc2hhd3F5IiwiYSI6ImNrdnBvcXVraGFjM3oybnM3d2F0bm41amsifQ.M6GEYFT8fWMIedbOUSxNmw', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);
 */

//02-OSM 
/* L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map); */


//03-OSMbuildings 3D buildings
var map = new OSMBuildings({
  container: 'map',
  position: { latitude: 59.91330585167756, longitude: 10.740362280359246 },
  zoom: 16,
  minZoom: 15,
  maxZoom: 20,
  tilt: 40,
  rotation: 300,
  attribution: '© Data <a href="https://openstreetmap.org/copyright/">OpenStreetMap</a> © Map <a href="https://mapbox.com/">Mapbox</a> © 3D <a href="https://osmbuildings.org/copyright/">OSM Buildings</a>'
});


//map.addMapTiles('https://api.mapbox.com/styles/v1/heshamshawqy/ckvppcy286hqi15qt2kzc9ds8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGVzaGFtc2hhd3F5IiwiYSI6ImNrdnBvcXVraGFjM3oybnM3d2F0bm41amsifQ.M6GEYFT8fWMIedbOUSxNmw');
map.addMapTiles('https://api.mapbox.com/styles/v1/heshamshawqy/ckvptxpz77qp514mzq792dwnw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGVzaGFtc2hhd3F5IiwiYSI6ImNrdnBvcXVraGFjM3oybnM3d2F0bm41amsifQ.M6GEYFT8fWMIedbOUSxNmw');
map.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/dixw8kmb/tile/{z}/{x}/{y}.json');

let rotation = 0;

function rotate () {
  map.setRotation(rotation);
  rotation = (rotation+1) % 360;
  requestAnimationFrame(rotate);
}


/* //02-List of landmarks in Oslo
var landmarks = [
  [59.917376800081016, 10.727412103786524],
  [59.92178435505572, 10.744328682817676],
  [59.91318184238957, 10.746681091784481],
  [59.9081256760754, 10.737153886137383],
  [59.91279458879743, 10.733634828195664]
 
];

var myIcon = L.icon({
  iconUrl: 'img/noun_Location_3101732.png',
  iconRetinaUrl:'img/marker-24@2x.png',
  iconSize: [80, 80],
  //Changing the postiton of the icon and the popup accordingly 
  iconAnchor: [40,40],
  popupAnchor: [24,-24]
  
});

//Delcaring an Array to be able to add labels
var markersArray = [];

//Setting a for loop to show all of these landmarks on the map
for (var i=0; i<landmarks.length; i++) {
  markersArray[i]= new L.marker(landmarks[i], {icon: myIcon}).addTo(map);}

//Adding events on the map
var latlng;

  markersArray[0].on('click', function(e) {
  document.getElementById('name').innerHTML = 'Royal Palace';
  document.getElementById('coordinates').innerHTML = 'Latitude: ' + e.latlng['lat']+',Longitude: '+e.latlng['lng'];
  document.getElementById('link_anchor').innerHTML = 'Wikipedia page';
  document.getElementById('link_anchor').setAttribute('href','https://en.wikipedia.org/wiki/Royal_Palace,_Oslo' );

  latlng = e.latlng
  });
//Adding event listner on click
  document.getElementById('center_button').addEventListener('click', function(){
    map.panTo(latlng);
  }) */

/* //Setting image parameters
var popup = L.popup({
  minWidth: 250
}).setContent('<img src="img/royal.jpg"><h3><a href="https://en.wikipedia.org/wiki/Royal_Palace,_Oslo">Royal Palace</h3></a><p>Click to visit the Wiki page</p>');

//Adding Tags/Labels
markersArray[0].bindPopup(popup)

//Add Polygon
var polygon = new L.polygon(landmarks, {
 color: '#933a25',
 weight: 7 ,
//  fill: false, 
 fillColor:'#ffffff',
 fillOpacity: 0.4
}).addTo(map);

//Add Circles on all of the points
var circleArray = [];
for (var i=0; i<landmarks.length; i++) {
  circleArray[i]= new L.circle(landmarks[i],100, { fill: false, color: '#000000', weight: 3  }).addTo(map);} */

  

  //Good reference (OSM buildings business)
  //https://3dbuildings.com/data/#14.71/36.11382/-86.86708/161.9/60