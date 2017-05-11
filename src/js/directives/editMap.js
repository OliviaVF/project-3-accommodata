/* global google:ignore */

angular
  .module('hrApp')
  .directive('editMap', editMap);


editMap.$inject = ['$window'];
function editMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="edit-map"></div>', //Better for small bits of html rather than creating a new file
    scope: {
      lat: '=',
      lng: '='
    },

    link($scope, element) {

      const center = { lat: parseFloat($scope.lat), lng: parseFloat($scope.lng) };

      const map = new $window.google.maps.Map(element[0], {
        zoom: 12,
        center: center,
        scrollwheel: false
      });

      new $window.google.maps.Marker({
        position: center,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: '/images/i.png'
      });

    }
  };

  return directive;
}
