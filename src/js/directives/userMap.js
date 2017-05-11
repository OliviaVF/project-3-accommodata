/* global google:ignore */

angular
  .module('hrApp')
  .directive('userMap', userMap)
  .directive('autocomplete', autocomplete);

userMap.$inject = ['$window'];
function userMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="user-map"></div>', //Better for small bits of html rather than creating a new file
    scope: {
      chosenLocation: '=',
      info: '=',
      updateLatLng: '=method'
    },

    link($scope, element) {

      let infoMarkers = [];
      let userCircle = null;

      let currentLocationMarker = null;
      const map = new $window.google.maps.Map(element[0], {
        zoom: 16,
        center: {lat: 51.515559, lng: -0.071746},
        scrollwheel: false
      });

      function findDistance(p1, p2){

        //calculates distance between two points in km's
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
      }

      function getLocation() {
        currentLocationMarker = new $window.google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          icon: '/images/me.png'
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            userCircle = new google.maps.Circle({
              strokeColor: '#0000FF',
              strokeOpacity: 0.8,
              strokeWeight: 1.5,
              fillColor: '#0000FF',
              fillOpacity: 0.1,
              map: map,
              center: pos,
              radius: 100
            });


            currentLocationMarker.setPosition(pos);

            map.setCenter(pos);
            let nearbyMarker = false;
            infoMarkers.forEach((marker) => {
              const distanceFromPin = findDistance(new google.maps.LatLng(pos), new google.maps.LatLng(marker.position.toJSON()));
              if (distanceFromPin < 100) nearbyMarker = true;
            });

            $scope.updateLatLng(pos, nearbyMarker);

          }, function() {
            handleLocationError(true, currentLocationMarker, map.getCenter());
          });
        } else {
        // Browser doesn't support Geolocation
          handleLocationError(false, currentLocationMarker, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
        }
      }

      getLocation();

      $scope.$watch('chosenLocation', () => {
        if($scope.chosenLocation.lat && $scope.chosenLocation.lng) {
          currentLocationMarker.setPosition($scope.chosenLocation);
          map.setCenter($scope.chosenLocation);
          userCircle.setCenter($scope.chosenLocation);
          let nearbyMarker = false;
          infoMarkers.forEach((marker) => {
            const distanceFromPin = findDistance(new google.maps.LatLng($scope.chosenLocation), new google.maps.LatLng(marker.position.toJSON()));
            if (distanceFromPin < 100) nearbyMarker = true;
          });

          $scope.updateLatLng($scope.chosenLocation, nearbyMarker);
        }
      });

      function removeMarkers(markers) {
        markers.forEach((marker) => {
          marker.setMap(null);
        });

        return [];
      }

      function addInfoMarkers() {


        infoMarkers = removeMarkers(infoMarkers);
        $scope.info.forEach((info) => {
          const marker = new $window.google.maps.Marker({
            position: { lat: parseFloat(info.lat), lng: parseFloat(info.lng) },
            map: map,
            icon: '/images/i.png'
          });

          google.maps.event.addListener(marker, 'click', function () {

            const latLng = { lat: marker.position.lat(), lng: marker.position.lng() };
            $scope.updateLatLng(latLng);
          });
          infoMarkers.push(marker);
        });
      }

      $scope.$watch('info', (newVal) => {
        if(newVal && newVal.length) addInfoMarkers();
      });

    }
  };

  return directive;
}

autocomplete.$inject = ['$window'];
function autocomplete($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      lat: '=',
      lng: '='
    },
    link: function($scope, element, attrs, model) {
      const options = {
        types: []
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        $scope.lat = place.geometry.location.toJSON().lat;
        $scope.lng = place.geometry.location.toJSON().lng;
        model.$setViewValue(element.val());
      });
    }
  };
}
