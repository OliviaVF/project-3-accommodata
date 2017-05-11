angular
  .module('hrApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('infoIndex', {
      url: '/info',
      templateUrl: 'js/views/info/index.html',
      controller: 'InfoIndexCtrl as infoIndex'
    })
    .state('infoNew', {
      url: '/info/new',
      templateUrl: 'js/views/info/new.html',
      controller: 'InfoNewCtrl as infoNew'
    })
    .state('infoShow', {
      url: '/info/:id',
      templateUrl: 'js/views/info/show.html',
      controller: 'InfoShowCtrl as infoShow'
    })
    .state('infoEdit', {
      url: '/info/:id/edit',
      templateUrl: 'js/views/info/edit.html',
      controller: 'InfoEditCtrl as infoEdit'
    })
    .state('userShow', {
      url: '/users/:id',
      templateUrl: 'js/views/user/show.html',
      controller: 'UserShowCtrl as usersShow'
    })
    .state('login', {
      url: '/',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('donate', {
      url: '/donate',
      templateUrl: 'js/donate.html'
    });

  $urlRouterProvider.otherwise('/');
}
