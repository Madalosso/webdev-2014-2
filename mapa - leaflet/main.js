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
