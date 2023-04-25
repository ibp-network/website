var clipBorder = world;

var baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 0,
            minZoom: 20
            });

var map = new L.Map('map', {
  layers: [baseLayer],
  center: new L.LatLng(25.6586, -80.3568),
  zoom: 20,
  preferCanvas: true
});

var heatmapCfg = {
  radius: 2,
  maxOpacity: 0.8,
  scaleRadius: true,
  useLocalExtrema: false,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'count'
};

var clippedHeatmapLayer = new HeatmapOverlay(heatmapCfg);
clippedHeatmapLayer.addTo(map);

var heatmapLayer = new HeatmapOverlay(heatmapCfg);
heatmapLayer.addTo(map);

heatmapLayer.setData(testData);

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

// Create a layer group to hold the markers
var markers = L.layerGroup();
// Add markers to the layer group
for (var i = 0; i < testData.data.length; i++) {
  //var marker = L.marker([data[i][0], data[i][1]]).bindPopup('Marker ' + data[i][2]);
  var marker = L.marker([testData.data[i].lat, testData.data[i].lng]);
  markers.addLayer(marker);
}
markers.addTo(map);


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

map.on('moveend', function() {
  setTimeout(showClippedCanvas, 50);
});

setTimeout(showClippedCanvas, 50);
