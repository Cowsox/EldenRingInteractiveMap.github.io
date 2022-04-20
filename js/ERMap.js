let url = ('https://' + window.location.hostname + '/');

let mapSize = 19280;
let tileSize = 256;
let mapScale = mapSize / tileSize;
let mapOffset = mapSize / mapScale / 2;
let halfTile = tileSize / 2;
let mapBounds = 1200;
let myBounds = [[0, 0],[mapBounds, mapBounds]];

L.CRS.MySimple = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(1/10, 0, -1/10, 142.5)
});

var map = L.map('map', {crs: L.CRS.MySimple}).setView([50,50],3);

var catacomb = L.icon({
  iconUrl: 'Locations/catacomb.png',
  iconSize: [100,100],
  iconAnchor: [50,50],
  popupAnchor: [10,10],
  shadowUrl: '',
  shadowSize: [,],
  shadowAnchor: [,]
});
var cathedral = L.icon({
  iconUrl: 'Locations/cathedral.png',
  iconSize: [100,100],
  iconAnchor: [50,50],
  popupAnchor: [10,10],
  shadowUrl: '',
  shadowSize: [,],
  shadowAnchor: [,]
});
var cave = L.icon({
  iconUrl: 'Locations/cave.png',
  iconSize: [100,100],
  iconAnchor: [50,50],
  popupAnchor: [10,10],
  shadowUrl: '',
  shadowSize: [,],
  shadowAnchor: [,]
});

var C1 = L.latLng(-1000, -1000),
  C2 = L.latLng(1000, 1000),
  bounds = L.latLngBounds(C1, C2);

var Cave1 = [1, 1];

//const legend = L.control({position: "bottomleft" });

//legend.onAdd = function () {
//	let dive = L.DomUtil.create("div", "description");
//	L.DomEvent.disableClickPropagation(div);
//	const text = "Move the mouse";
//	div.insertAdjacentHTML("beforeend", text);
//	return div;
//};

//legend.addTo(map);

L.tileLayer('./{z}/tile_{x}_{y}.png', {bounds: myBounds, zoomControl: false, noWrap: true, zoom: 8, zoomSnap: 0, maxZoom: 7, tileSize: 256, zoomOffset: 0, width: 19290, height: 18238, attribution: 'Cowsox'}).addTo(map);
// L.tileLayer('Unique/Elden_Ring_Map_Upscaled/{z}/{z}-{x}-{y}.jpg', {noWrap: true, crs: L.CRS.Simple, zoom: 5, bounds: bounds, MaxBounds: bounds, zoomSnap: 0, maxZoom: 6, tileSize: 256, zoomOffset: 0, width: 15175, height: 14280, attribution: 'Cowsox'}).addTo(map);
L.marker(Cave1, {icon: cathedral}).addTo(map).bindPopup("0-0");
L.marker([10,10], {
  icon: cave,
}).addTo(map).bindPopup("-100-100");
L.marker([0, 0]).addTo(map).bindPopup("Origin");

map.setMaxBounds([[-1000, -1000], [5000, 5000]]);

map.on("click", addMarker);

function addMarker(e) {
  const markerPlace = document.querySelector(".marker-position");
  markerPlace.textContent = `new marker: ${e.latlng.lat}, ${e.latlng.lng}`;

  const marker = new L.marker(e.latlng, {
    draggable: true,
  })
    .addTo(map)
    .bindPopup(buttonRemove);

  marker.on("popupopen", removeMarker);

  marker.on("dragend", dragedMarker);
}

let mapMarkers = 
[
  {
    icon:"cave",
    width: "12",
    height: "12"},
];

const buttonRemove = 
  '<button type="button" class="remove">delete</button><span id="coord"></span><select><option value="0"></select>';

const markerPlace = document.querySelector(".marker-position");

function removeMarker() {
  const marker = this;
  const btn = document.querySelector(".remove");
  btn.addEventListener("click", function () {
    markerPlace.textContent = "gone";
    map.removeLayer(marker);
  });
  document.getElementById("coord").innerHTML = `${this.getLatLng().lat}, ${this.getLatLng().lng}`
}

function dragedMarker() {
  markerPlace.textContent = `change position: ${this.getLatLng().lat}, ${this.getLatLng().lng}`;
}
