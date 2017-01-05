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
          // '<a target="_blank" href="#">Open in Google Maps</a>' + 
          '</div>');
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

