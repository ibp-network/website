

//Get JSON from Gist
var clipBorder = JSON.parse(Get('./world.json'));
var jsonFile = JSON.parse(Get('https://raw.githubusercontent.com/ibp-network/config/main/members.json'));
var memberKeys = Object.entries(jsonFile.members);

//Arrays containing data for marker and popups
var locations = [];
var current_locations = [];
var pending_locations = [];
var future_locations = [];
var location_options = [current_locations, pending_locations, future_locations];
var all_locations = [];
var markerData = [];

/** FOR TOM - ADD FUTURE SERVICE AREA HERE  **/

var example_for_tom_location = { lat: -14.2350, lng: -51.9253, count: 6 }; //This is for the lat & lng of the node
var example_for_tom_markers = { name: 'Pending Service', website: '', logo: "img/default-logo-2.jpg", level: '', address: 0, member: "", status: 'OFFLINE' }; //This is the popup data

/*
locations = [example_for_tom_location];
markerData = [example_for_tom_markers];
*/

/*********                        ***********/

//Parameters for map zoom
let maxZoom = 4;
let minZoom = 3;

mapZoom();

window.addEventListener('resize', function(event){ 
  mapZoom();
}, true);


// Create a layer group to hold the markers
var markers = L.layerGroup();
var pendingMarkers = L.layerGroup();
var allMarkers;
for(var i = 0; i < memberKeys.length; i++){

  //If latitude key contains no value and builder is a hobbyist, then builder has no node
  if( memberKeys[i][1].region !== "" && 
      memberKeys[i][1].membership !== "hobbyist" && 
    ( memberKeys[i][1].longitude !== "0" && memberKeys[i][1].latitude !== "0" ) && (memberKeys[i][1].longitude.length > 0 && memberKeys[i][1].latitude.length > 0)){

    var value = {lat: 0, lng: 0, count: 6};
    var mData = {name: '', website: '', logo: 'logo', level: 1, address: 0, member: "PRO", status: 'ONLINE'};

    //Latitude and longitude parameters to be pushed onto locations array
    value.lat = parseFloat(memberKeys[i][1].latitude);
    value.lng = parseFloat(memberKeys[i][1].longitude);

    //Data needed for the popup of each marker, pushed onto markerData array
    mData.name      = memberKeys[i][1].name;
    if(memberKeys[i][1].logo === ""){
      mData.logo = "img/default-logo.png";
    }
    else{
      mData.logo      = memberKeys[i][1].logo;
    }
    mData.level     = memberKeys[i][1].current_level;
    mData.address   = memberKeys[i][1].services_address;
    mData.website   = memberKeys[i][1].website;

    //If status is inactive, show the node as offline
    if(memberKeys[i][1].active === '0'){
      
      pending_locations.push(value); 
      mData.status = 'OFFLINE'
    }
    else if(memberKeys[i][1].active !== '0'){
      current_locations.push(value);
    }

    //Push respective data onto respective arrays
    locations.push(value);
    all_locations.push(value);
    markerData.push(mData);
  }

}
console.log(pending_locations);
/*** TEMPORARY POINTS ADDED ***/ 

function tempData(location, nodeInfo){
  locations.push(location);
  all_locations.push(location);
  pending_locations.push(location);
  markerData.push(nodeInfo);
}

/*
//New Zealand
var value = {lat: -40.9006, lng: 174.8860, count: 6};
var mData = {name: 'Pending Service', website: '', logo: "img/default-logo-2.jpg", level: '', address: 0, member: "", status: 'OFFLINE'};
tempData(value, mData);

//Brazil
value = {lat: -14.2350, lng: -51.9253, count: 6};
mData = {name: 'Pending Service', website: '', logo: "img/default-logo-2.jpg", level: '', address: 0, member: "", status: 'OFFLINE'};
tempData(value, mData);

//Arizona
value = {lat: 34.0489, lng: -111.0937, count: 6};
mData = {name: 'Pending Service', website: '', logo: "img/default-logo-2.jpg", level: '', address: 0, member: "", status: 'OFFLINE'};
tempData(value, mData);
*/


//Object storing data of locations of each node

var locationData = {
  data: locations
};

//Baselayer of the map using a free OSM tile layer
var baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: maxZoom,
            minZoom: minZoom
            });

//Map object that has default baselayer and initialized options. Additional layers are added to this object
var map = new L.Map('map', {
  layers: [baseLayer],
  center: new L.LatLng(25.6586, -80.3568),
  zoom: minZoom,
  preferCanvas: true,
  maxBounds: L.latLngBounds(L.latLng(90, -200), L.latLng(-90, 200)),
  worldCopyJump: false,
  maxBoundsViscosity: 1,
  zoomControl: false
});

var zoom  = L.control.zoom({position: 'bottomright'});
zoom.addTo(map);

//Configuration of the heatmap settings.
var heatmapCfg = {
  radius: 36,
  maxOpacity: 0.3,
  scaleRadius: true,
  useLocalExtrema: false,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count',
  blur: 0.75,
  gradient: {
    '.05': 'blue',
    '.9': 'green',
    '1': 'yellow'
  }
};

//Add Heatmap Overlay object to map
var clippedHeatmapLayer = new HeatmapOverlay(heatmapCfg);
clippedHeatmapLayer.addTo(map);

//Heatmap Overlay pre-clip add to map
var heatmapLayer = new HeatmapOverlay(heatmapCfg);
heatmapLayer.addTo(map);
heatmapLayer.setData(locationData);

var overlayPane = map.getPanes().overlayPane;
var heatmapCanvas = overlayPane.childNodes[1].childNodes[0];
heatmapCanvas.style.display = 'none';

var clippedHeatmapCanvas = overlayPane.childNodes[0].childNodes[0];
var clipPane = map.createPane('clip-pane');
clipPane.style.zIndex = 350;
clipPane.style.display = 'none';

var clipLayer = L.geoJSON(clipBorder, {
  pane: 'clip-pane',
  style: {
    stroke: false,
    fill: true,
    fillColor: '#ffffff',
    fillOpacity: 1
  }
});
clipLayer.addTo(map);

//Default icon settings
var icon = L.icon({
  iconUrl: 'img/Node.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [25, -10]
});

//Offline node icon settings
var offIcon = L.icon({
    iconUrl: 'img/offlineNode.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [25, -10]
});

//Future node icon settings
var futureIcon = L.icon({
  iconUrl: 'img/futureNode.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [25, -10]
});

//Icon when clicked
var clickedIcon = L.icon({
  iconUrl: 'img/pinkNode.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [25, -10]
});

//Iterate through number of valid locations and assign a marker + popup
for (var i = 0; i < locationData.data.length; i++) {

  //Markup for popup
  var popup =
  `<div class='popup-container'>
    <div>
      <img class='map-logo' src=${markerData[i].logo}>
      <div>
        <p class='map-classifier'>Builder:</p>
        <div class="row">
          <p class='map-name'>${markerData[i].name} </p> <p class='map-level'>&nbsp;${markerData[i].member}&nbsp;${markerData[i].level}</p>
        </div>
        <p class='map-classifier'>Website:</p>
        <a class='map-name' href='${markerData[i].website}' target='_blank'>${markerData[i].website} </a>
      </div>
    </div>
    <p class='map-status'>${markerData[i].status} </p>
  </div>`;

  //Bind popup to marker then add to LayerGroup object
  var markerIcon = icon;
  var marker = L.marker([locationData.data[i].lat, locationData.data[i].lng], {icon: markerIcon}).bindPopup(popup).openPopup();
  
  /* TEMPORARY REMOVED -- NEED PARAMETER FOR DETERMINING PENDING SERVICE */
  /*
  if(markerData[i].status == 'OFFLINE' && markerData[i].level == 0){
    markerIcon = offIcon;
    marker = L.marker([locationData.data[i].lat, locationData.data[i].lng], {icon: markerIcon}).bindPopup(popup).openPopup();
    pendingMarkers.addLayer(marker);
  }
  else{
    markers.addLayer(marker);
  }
  */
  markers.addLayer(marker);
}

//Event listener for when a marker is clicked and unclicked
markers.eachLayer(function(marker){
  marker.on('popupopen', function(){
    //marker.setIcon(clickedIcon);

    markers.eachLayer(function(otherMarker){
      if(otherMarker !== marker.target){
        otherMarker.setOpacity(0.25);

        pendingMarkers.eachLayer(function(otherMarker){
          otherMarker.setOpacity(0.25);
        });
      }
    });

    marker.setOpacity(1);

  });

  marker.on('popupclose', function(){
    //marker.setIcon(icon);

    markers.eachLayer(function(otherMarker){
      if(otherMarker !== marker.target){
        otherMarker.setOpacity(1);

        pendingMarkers.eachLayer(function(otherMarker){
          otherMarker.setOpacity(1);
        });
      }
    });

  });
});

pendingMarkers.eachLayer(function(marker){
  marker.on('popupopen', function(){
    //marker.setIcon(clickedIcon);

    pendingMarkers.eachLayer(function(otherMarker){
      if(otherMarker !== marker.target){
        otherMarker.setOpacity(0.25);

        markers.eachLayer(function(otherMarker){
          otherMarker.setOpacity(0.25);
        });
      }
    });

    marker.setOpacity(1);

  });

  marker.on('popupclose', function(){
    //marker.setIcon(icon);

    pendingMarkers.eachLayer(function(otherMarker){
      if(otherMarker !== marker.target){
        otherMarker.setOpacity(1);

        markers.eachLayer(function(otherMarker){
          otherMarker.setOpacity(1);
        });
      }
    });

  });
});

/*
futureMarkers.eachLayer(function(marker){
  marker.on('popupopen', function(){
    //marker.setIcon(clickedIcon);

    pendingMarkers.eachLayer(function(otherMarker){
      if(otherMarker !== marker.target){
        otherMarker.setOpacity(0.25);
      }
    });

    marker.setOpacity(1);

  });

  marker.on('popupclose', function(){
    //marker.setIcon(icon);

    pendingMarkers.eachLayer(function(otherMarker){
      if(otherMarker !== marker.target){
        otherMarker.setOpacity(1);
      }
    });

  });
});
*/

markers.addTo(map);
pendingMarkers.addTo(map);

allMarkers = {
  "<h3> Current Service Region </h3>": markers,
  "<h3> Pending Service Region </h3>": pendingMarkers
};

var layerControl = L.control.layers(null, allMarkers);
layerControl.setPosition('bottomleft');
//layerControl.addTo(map);


var allChecks = document.querySelectorAll('div.leaflet-control-layers-overlays > label > div');
var checkboxes = document.querySelectorAll('input.leaflet-control-layers-selector');
console.log(checkboxes);
console.log(allChecks);
for(var i = 0; i < allChecks.length; i++){
  allChecks[i].setAttribute('data-index', i);
  allChecks[i].addEventListener('mouseup', function(e){
    

    if(this.firstElementChild.checked){
      //Hide Heat
      
      removeHeatLocation(location_options[this.dataset.index])

      
    }
    else{
      //Show Heat
      addHeatLocation(location_options[this.dataset.index])
      

    }
    var heatLocation = {
      data: all_locations
    }
    heatmapLayer.setData(heatLocation);
    showClippedCanvas();
    e.preventDefault();
  });
}

function removeHeatLocation(arr){
  all_locations = all_locations.filter( (el) => !arr.includes(el));
}

function addHeatLocation(arr){
  all_locations = all_locations.concat(arr);
  all_locations = all_locations.filter((item, idx) => all_locations.indexOf(item) === idx);
}
//Show heatmap after clipping. Normally redrawn when map is moved as clip region needs to be redrawn.
map.on('moveend', function() {
  setTimeout(showClippedCanvas, 25);
});
setTimeout(showClippedCanvas, 25);

//Function that shows the final clipping of the heatmap
function showClippedCanvas() {
  
  var workCanvas = document.createElement('canvas');
  var workCtx = workCanvas.getContext('2d');

  workCanvas.width  = heatmapCanvas.width;
  workCanvas.height = heatmapCanvas.height;

  var clipCanvas = clipPane.childNodes[0];
  var clipCanvasW = parseInt(clipCanvas.style.width, 10);
  var clipCanvasH = parseInt(clipCanvas.style.height, 10);
  var xOffset = (clipCanvasW - heatmapCanvas.width) / 2;
  var yOffset = (clipCanvasH - heatmapCanvas.height) / 2;

  workCtx.drawImage(clipCanvas, -xOffset, -yOffset, clipCanvasW, clipCanvasH);
  workCtx.globalCompositeOperation = 'source-in';
  workCtx.drawImage(heatmapCanvas, 0, 0);

  var targetCtx = clippedHeatmapCanvas.getContext('2d');
  targetCtx.clearRect(0, 0, heatmapCanvas.width, heatmapCanvas.height);
  targetCtx.drawImage(workCanvas, 0, 0);
}


//Helper function to GET files from a given URL
function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",url,false);
        Httpreq.send(null);

    return Httpreq.responseText;
}

function mapZoom(){
  maxZoom = 4;
  minZoom = 3;
  if(screen.width < 550){
    minZoom = 1;
    maxZoom = 7;
  }
}
