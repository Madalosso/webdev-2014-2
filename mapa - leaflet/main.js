//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles                                   :::
//:::                  'K' is kilometers (default)                            :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at http://www.geodatasource.com                          :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: http://www.geodatasource.com                        :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2014            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var map;
var popup = L.popup();
var PopUppoint =L.popup();
var latlng;
var markerStart=false;
var markerFinish=false;

var directionsServiceStart = new google.maps.DirectionsService();
var directionsDisplayStart = new google.maps.DirectionsRenderer();
var directionsServiceEnd = new google.maps.DirectionsService();
var directionsDisplayEnd = new google.maps.DirectionsRenderer();

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}                                                                           


function onMapClick(e) {
	PopUppoint
		.setLatLng(e.latlng)
		.setContent('<button onclick="defineStart()" id="pntStart" >Definir ponto inicial</button><button onclick="defineStop()" id="pntStop" >Definir ponto final</button>')
		.addTo(map);
	latlng=e.latlng;
}

function defineStart(){
	document.getElementById("endereco_start").value=latlng.lat+" "+latlng.lng;
	PopUppoint._close();
	if(!markerStart){
		markerStart = L.marker(latlng).addTo(map);
	}else{
		markerStart.setLatLng(latlng).update();
	}
	geocoder.geocode({'latLng':markerStart.getLatLng()}, function(results, status){
				if(status == google.maps.GeocoderStatus.OK){
					if(results[1]){
						map.setZoom(16);
						console.log("Endereco origem: "+results[1]);
						console.log(results[1]);
					}
				}
			});
}

function defineStop(){
	document.getElementById("endereco_finish").value=latlng.lat+" "+latlng.lng;
	PopUppoint._close();
	if(!markerFinish){
		markerFinish = L.marker(latlng).addTo(map);
	}else{
		markerFinish.setLatLng(latlng).update();
	}
	//console.log(distance(markerFinish.getLatLng(),markerStart.getLatLng(),"K"));
	//distancia = distance(-29.71815, -53.71523,-29.70686, -53.72052,"K");
}

function initialize(){
	geocoder = new google.maps.Geocoder();


	var bombeirosRota=["-29.71886265201572,-53.71382460926128","-29.710979606708158,-53.71650681827617","-29.7040278499012,-53.71554122303081","-29.701530318433107,-53.71811614368511","-29.697914379255007,-53.73255715702129","-29.69537941645241,-53.73837218616558","-29.6941864706482,-53.75053868625713","-29.694279670049234,-53.76173959110332","-29.69625547700679,-53.76901374195171","-29.694950703184524,-53.776910165291554","-29.693179911608507,-53.783368924599415","-29.690532986012805,-53.791136601906544","-29.68922813787889,-53.79875407550884","-29.690048330112337,-53.80141482685161","-29.68954503112626,-53.80416140888286","-29.692602067603854,-53.80920396183086","-29.687401322027615,-53.81096349094463","-29.6886316302318,-53.81594167087627"];
	var polyPoints=[];

	console.log("Numero rota :" + bombeirosRota.length);
	for(var i = 0 ; i < bombeirosRota.length ; i++){
		var splitado = bombeirosRota[i].split(",");
		polyPoints.push(new L.latLng(splitado[0],splitado[1]));
	}
	var polyline = L.polyline(polyPoints, {color: 'red'}).addTo(map);

	var bombeirosParadas=["-29.68880846193421,-53.81584524532393","-29.718992842325843,-53.714801067220804","-29.713495282696098,-53.71588467966387","-29.689964190252216,-53.80168318171211","-29.687205332907848,-53.811725372273216","-29.68986632667588,-53.80465506930341","-29.689283803416078,-53.794291013660185","-29.695435078587703,-53.773391240996716","-29.69413029410983,-53.77974271194989","-29.69392525500845,-53.75455140485853","-29.695267321532675,-53.7380933703278","-29.696665288432357,-53.73526095760543","-29.689153317743006,-53.79716634172679","-29.692368808186536,-53.80951523204287","-29.704120783350557,-53.7154769838932","-29.707680586964173,-53.71609925638522","-29.687606117561874,-53.81379603763463","-29.708947921141718,-53.71620654474589","-29.690644572481766,-53.790729040085125","-29.692135805090516,-53.787102693493566","-29.692583170557697,-53.78495692627965","-29.69549099754383,-53.766535514748256","-29.694437851977344,-53.76390694991119","-29.694167573901474,-53.76053809538536","-29.693999814730095,-53.75727652922022","-29.694559010878816,-53.742181056870336"];
	console.log("Numero paradas " + bombeirosParadas.length);
	var paradas=[];
	for(var i = 0 ; i<bombeirosParadas.length;i++){
		var splitado = bombeirosParadas[i].split(",")
		paradas.push(L.marker(L.latLng(splitado[0],splitado[1])));
		paradas[i].addTo(map);
	}


}
function findRota(){
	console.log("teste");
	//checar se o marcador foi definido ou não pelo usuario
	var start = markerStart.getLatLng();
	//directionsDisplayStart.setMap(map);
	var request={
				origin:start,
				destination:"-29.71886265201572,-53.71382460926128",
				travelMode: google.maps.TravelMode.DRIVING
			};
	directionsServiceStart.route(request, function(result, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplayStart.setDirections(result);
	      console.log(result.routes[0].legs[0].distance.text);
	    }else{
	    	console.log("ERROR REQUISITAR GMAPS: "+status);
	    }
	});
}

$("#calculaRota").click(function(){
	findRota();
});

$(document).ready(function(){


	map = L.map('map').setView([-29.70686, -53.72052], 15);//set coordenadas e zoom
	
	L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'examples.map-i875mjb7'
	}).addTo(map);
	

	map.on('click', onMapClick);

	initialize();
});