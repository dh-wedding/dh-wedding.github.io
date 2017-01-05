function getMapStyle() {
  var d = new Date();
  if (d.getHours() < 18 && d.getHours() > 5) {
    return mapStyle("default");
  }
  else {
    return mapStyle("night");
  }
}

function initMap() {
  var shg = {lat: 33.041742, lng: -87.752119};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: shg,
    zoom: 15,
    styles: getMapStyle(),
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: shg,
    map: map
  });
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.getDetails({
    placeId: 'ChIJg5LN-GvihYgRLHbXSraNU_s'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      // google.maps.event.addListener(marker, 'click', function() {
        var address = place.address_components;
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          // 'Place ID: ' + place.place_id + '<br>' +
          address[0].long_name + ' ' + address[1].long_name + '<br>'+
          address[2].long_name + ', ' + address[4].short_name + ' ' +
          address[6].long_name + '<br>' +
          '<a target="_blank" href="https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/33.2881759,-87.5627093/Southern%2BHouse%2B%2526%2BGarden,%2B15308%2BShepard%2BPark%2BRd,%2BKnoxville,%2BAL%2B35469/@33.1659011,-87.7799056,11z/data%3D!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x8885e26bf8cd9283:0xfb538db64ad7762c!2m2!1d-87.752119!2d33.041742?hl%3Den-US%26utm_source%3Dapp-invite%26mt%3D8%26pt%3D9008%26utm_medium%3DSIMPLE%26utm_campaign%3Ds2e-ai%26ct%3Ds2e-ai&apn=com.google.android.apps.maps&amv=703000000&isi=585027354&ibi=com.google.Maps&ius=comgooglemapsurl&utm_source=app-invite&mt=8&pt=9008&utm_medium=SIMPLE&utm_campaign=s2e-ai&ct=s2e-ai&invitation_id=493454522602-70b0b068-7564-4c1c-8016-902e7a8ee4be">Open in Google Maps</a>'+ '</div>');
        infowindow.open(map, marker);
      // });
    }
  });
}

function mapStyle(style) {
  switch (style) {
    case "night":
      return [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ];
    default:
      return [];
  }
}

