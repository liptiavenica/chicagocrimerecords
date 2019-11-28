var map = L.map('map').setView([41.8752130174, -87.6292057552], 10);


var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

var heat;

var currentZoom = map.getZoom();

function getRadius(){
            var radius;
            if (currentZoom === 10){
                radius=25
            }
            else if (currentZoom === 11) {
                radius = 27;
            }
            else if (currentZoom === 12) {
                radius = 29;
            }
            else if (currentZoom === 13) {
                radius = 31;
            }
            else if (currentZoom === 14) {
                radius = 33;
            }
            else if (currentZoom === 15) {
                radius = 35;
            }
            else if (currentZoom === 16) {
                radius = 37;
            }
            else if (currentZoom === 17) {
                radius = 39;
            }
            else if (currentZoom === 18) {
                radius = 41;
            }
            return radius;
}

drawMap()

function drawMap (crimeIndex = crimeIdx(crimeWeight = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])) {

    if (heat) map.removeLayer(heat);

    var dataCrime = data.map(function (p,i) { return [p["Latitude"], p["Longitude"],crimeIndex[i]] });

    heat = L.heatLayer(dataCrime, {
        radius: getRadius(),
        blur: 20, 
        maxZoom: 16,
        minOpacity: 0.5
    }).addTo(map);

    map.on('zoomend', function(ev) {
        currentZoom = map.getZoom()

        heat.setOptions({
            radius: getRadius(),
            blur: 20,
            minOpacity: 0.5
        });
        heat.redraw();
    });

    return dataCrime
        
}

