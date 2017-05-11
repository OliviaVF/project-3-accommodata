angular
  .module('hrApp')
  .controller('MainCtrl', MainCtrl);



MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;
  vm.navIsOpen = false;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.navIsOpen = false;
    if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;


  const protectedStates = ['infoNew'];

  function secureState(e, toState) {
    vm.message = null;
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to go there!';
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);
}
