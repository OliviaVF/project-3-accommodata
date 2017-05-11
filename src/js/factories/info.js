angular
  .module('hrApp')
  .factory('Info', Info);

Info.$inject = ['$resource'];
function Info($resource) {
  return new $resource('/api/info/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
