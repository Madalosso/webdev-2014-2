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
/*
var map,dialog;
var markTemp,markOrigem,markDestino;
var posTemp;
var geocoder;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
function initialize(){
	geocoder = new google.maps.Geocoder();
	var posHouse = new google.maps.LatLng(-29.706822, -53.720390);
	var mapProp = {
	  center:new google.maps.LatLng(-29.706822, -53.720390),
	  zoom:16,
	  mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
	google.maps.event.addListener(map, 'click', function(event) {
	    addDialog(event.latLng);
	  });

	  dialog = new google.maps.InfoWindow({
	    content:"<button id='btSource' onClick='setOrigem()'>Set Origin</button><button id='btDestino' onClick='setDestino()'>Set Destiny</button>"
	  });
}

function setOrigem(){
	if(markOrigem==null){
		markOrigem= new google.maps.Marker({position:posTemp,});
	}else{
		markOrigem.setPosition(posTemp);
	}
	markOrigem.setMap(map);
	dialog.close();

	geocoder.geocode({'latLng':posTemp}, function(results, status){
		if(status == google.maps.GeocoderStatus.OK){
			if(results[1]){
				map.setZoom(16);
				console.log("Endereco origem: "+results[1]);
				console.log(results[1]);
			}
		}
	});
}

function setDestino(){
	if(markDestino==null){
		markDestino= new google.maps.Marker({position:posTemp,});
	}else{
		markDestino.setPosition(posTemp);
	}
	markDestino.setMap(map);
	dialog.close();


	geocoder.geocode({'latLng':posTemp}, function(results, status){
		if(status == google.maps.GeocoderStatus.OK){
			if(results[1]){
				map.setZoom(16);
				console.log("Endereco Destino: "+results[1]);
				console.log(results[1]);
			}
		}
	});
}

function addDialog(pos){
	console.log(pos);
	if(markTemp==null){
		markTemp= new google.maps.Marker({position:pos,});
	}else{
		markTemp.setPosition(pos);
	}
	dialog.open(map,markTemp);
	markTemp.setMap(map);
	posTemp = pos;
	console.log("position: "+posTemp);
}

function findRota(){
	var start =  markOrigem.getPosition();
	var end = markDestino.getPosition();
	directionsDisplay.setMap(map);
	var request={
		origin:start,
		destination:end,
		travelMode: google.maps.TravelMode.WALKING
	};
	directionsService.route(request, function(result, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(result);
	    }
		});
}                                                                 
window.addEvent('load',function(){
	google.maps.event.addDomListener(window, 'load', initialize);
});

*/
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