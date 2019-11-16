//icon-icon taro disini
var customIcons = {
    'arson': 'arson.png',
	'assault': 'assault.png',
	'battery': 'battery.png',
	'burglary': 'burglary.png',
	'criminaldamage': 'criminaldamage.png',
	'crimsexualassault': 'crimsexualassault.png',
	'criminaltrespass': 'criminaltrespass.png',
	'deceptivepractice': 'deceptivepractice.png',
	'interferencewithpublicofficer': 'interferencewithpublicofficer',
	'intimidation': 'intimidation.png',
	'motorvehicletheft': 'motorvehicletheft.png',
	'narcotics': 'narcotics.png',
	'offenseinvolvingchildren': 'offenseinvolvingchildren.png',
	'othernarcoticviolation': 'othernarcoticviolation.png',
	'otheroffense': 'otheroffense.png',
	'prostitution': 'prostitution.png',
	'publicpeaceviolation': 'publicpeaceviolation.png',
	'publicindecency': 'publicindecency.png',
	'robbery': 'robbery.png',
	'sexoffense': 'sexoffense.png',
	'kidnapping' : 'kidnapping.png',
	'homicide' : 'homicide.png',
	'humantrafficking' : 'humantrafficking.png',
	'stalking' : 'stalking.png',
    'theft': 'theft.png',
	'weaponsviolation': 'weaponsviolation.png',
	'obscenity' : 'obscenity.png',
	'non-criminal' : 'non-criminal.png',
	'gambling' : 'gambling.png',
	'liquorlawviolation' : 'liquorlawviolation.png'
};

var markerGroups = {
	"arson": [],
	"kidnapping":[],
	"homicide":[],
	"stalking":[],
	"assault": [],
	"battery": [],
    "burglary": [],
	"criminaldamage": [],
	"crimsexualassault": [],
	"criminaltrespass": [],
    "deceptivepractice": [],
	"interferencewithpublicofficer": [],
	"intimidation": [],
	"motorvehicletheft": [],
    "narcotics": [],
	"offenseinvolvingchildren": [],	
	"othernarcoticviolation":[],
	"otheroffense": [],
	"prostitution": [],
    "publicpeaceviolation": [],
	"robbery": [],
	"sexoffense": [],
	"humantrafficking" : [],
	"theft": [],
    "weaponsviolation": [],
	"obscenity": [],
	"non-criminal": [],
	"gambling": [],
    "liquorlawviolation": []
};

var data, primary_data, map, overlays, markerClusters;

function print() {
	overlays = [];
	//base layer
	//"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	var base  = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18, id: 'mapbox.streets'});

	map = L.map('map', {
		center: [41.878114, -87.629798],
		zoom: 10,
	});
	map.addLayer(base);

	//layer for marker clustering
	markerClusters = L.markerClusterGroup.layerSupport().addTo(map);
	
	var LeafIcon = L.Icon.extend({
		options: {
			iconSize:     [25, 25],
			iconAnchor:   [22, 94],
			popupAnchor:  [-3, -76]
		}
	});
	
    for (i = 0; i < data.length; i++) {
		if(typeof data[i].location !== "undefined" && typeof data[i].primary_type !== "undefined"){
			//buat list checkbox filternya dengan menggunakan layer group leaflet
			var index = "<img src='../assets/image/"+ data[i].primary_type.toLowerCase() + ".png' width='25px' height='25px'>" + data[i].primary_type;
			
			if (!overlays[index]) {
				overlays[index] = L.layerGroup().addTo(markerClusters);;
			}

			//buat markernya
			var customIcon;
			//set iconnya kalau tidak ada biarkan default
			if(customIcons[convertString(data[i].primary_type)] != undefined){
				customIcon = new LeafIcon({iconUrl: "../assets/marker/" + customIcons[convertString(data[i].primary_type)]})
			}
				
			var mark = L.marker([data[i].location.latitude, data[i].location.longitude], {icon: customIcon}).bindPopup("<table id='popuptext'><tr><th>" + this.data[i].primary_type + "</th></tr><tr><td>Date</td><td>: " + this.data[i].date.substr(0,10) + "</td></tr><tr><td>Time</td><td>: " + this.data[i].date.substr(11,16) + "</td></tr><tr><td>Address</td><td>: " + this.data[i].location_description + "</td></tr><tr><td></td><td> &nbsp; " + this.data[i].block + "</td></tr><tr><td>District</td><td>: " + this.data[i].district + "</td></tr><tr><td>Description</td><td>: " + this.data[i].description + "</td></tr><tr><td>Status</td><td>: <img src='../assets/marker/" + this.data[i].arrest + ".png'></td></tr></table>", {minWidth : 450})
			
			mark.addTo(overlays[index]);
		}
    }
	
	//Render Layer Control & Move to Sidebar
	var layerControl = L.control.layers(null, overlays, {
		position: "topright",
		collapsed: false
	}).addTo(map);
	
	var oldLayerControl = layerControl.getContainer();
	var newLayerControl = $("#filter-list");
	newLayerControl.append(oldLayerControl);
	
	//hide loader when the map is complete
	$("#loader").hide();
	
	data= primary_data;
}


function filterDateTime() {
	//show loader when the filter button is clic
	$("#loader").show();
	
    var request;
	var datefrom = document.getElementById('datepickerfrom').value;
	var dateto = document.getElementById('datepickerto').value;
	var timefrom = "T" + document.getElementById('timefrom').value + ":00:00";
	var timeto = "T" + document.getElementById('timeto').value + ":00:00";
	
	var api = 'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=date%20between%20%27'+datefrom+timefrom+'%27%20and%20%27'+dateto+timeto+'%27&$limit=20000&$offset=0';
	console.log(api);
	
	//karena sebelumnya map sudah diload, untuk meload ulang harus remove dulu yg sebelumnya
	if(map != undefined)
	{
		map.remove(); 
	}
	
	$(document).ready(function() {
		$.ajax({
			 url: api,
			 method: 'GET',
			 success: function(response) {
				primary_data = response;
				data = response;
				print();
			}
		});
	});
}

//filter status
function filterStatus() {
    var request;
	var arr;
	var dom;
	var input = document.getElementById('status').value;
	var input2 = document.getElementById('domestic').value;

	if(input == "1"){
		arr = true;
	}else{
		arr = false;
	}
	
	if(input2 == "1"){
		dom = true;
	}else{
		dom = false;
	}

	var filteredData = []
	var filteredData2 = []
	//filter data status
    for (k = 0; k < data.length; k++) {
		var arrest = data[k].arrest;
		if(input==0){
			filteredData.push(data[k]);
		}else if(arrest==arr){
			filteredData.push(data[k]);
		}
	}
	//filter data domestic
	 for (t = 0; t < filteredData.length; t++) {
		var domestic = filteredData[t].domestic;
		if(input2==0){
			filteredData2.push(filteredData[t]);
		}else if(domestic==dom){
			filteredData2.push(filteredData[t]);
		}
	}
	
	
	data = filteredData2;
	if(map != undefined)
	{
		map.remove(); 
	}	
	print();
	
	
}


//fungsi convertString
function convertString(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toLowerCase();
  }).replace(/\s+/g, '');
}

// Clear all button
function clearAll()
{
	document.getElementById("clearall").addEventListener('click', function (event) {
		for (var i in overlays) {
			console.log(i);
			map.removeLayer(overlays[i]);
		}
	});
}

