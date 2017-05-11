angular
  .module('hrApp')
  .factory('Resource', Resource);

Resource.$inject = ['$resource'];
function Resource($resource) {
  return new $resource('/api/resources/:id', { id: '@id'}, {
    update: { method: 'PUT'}
  });
}
