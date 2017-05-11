angular
  .module('hrApp')
  .controller('UserCtrl', UserCtrl)
  .controller('UserShowCtrl', UserShowCtrl);

UserCtrl.$inject = ['$rootScope', '$state', '$auth', 'User'];
function UserCtrl($rootScope, $state, $auth, User) {
  const vm = this;
  const { userId } = $auth.getPayload();

  if(userId) vm.user= User.get({ id: userId });
}

UserShowCtrl.$inject = ['User', 'Info', '$stateParams', '$state'];
function UserShowCtrl(User, Info, $stateParams, $state) {
  const vm = this;

  User.get($stateParams, (user) => {
    vm.user = user;
    vm.userInfo = Info.query({ createdBy: user.id });
  });

  vm.selectedInfo = null;

  function userDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('login'));
  }

  vm.delete = userDelete;

  function deleteInfo() {
    Info
      .delete({ id: vm.selectedInfo.id })
      .$promise
      .then(() => {
        const index = vm.userInfo.indexOf(vm.selectedInfo);
        if(index > -1) vm.userInfo.splice(index, 1);
        vm.selectedInfo = null;
      });
  }

  vm.deleteInfo = deleteInfo;
}
