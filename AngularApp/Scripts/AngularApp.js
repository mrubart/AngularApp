var AngularApp = angular.module('AngularApp', ['ui.router','ui.bootstrap']);

AngularApp.controller('LandingPageController', LandingPageController);
AngularApp.controller('LoginController', LoginController);
AngularApp.controller('RegisterController', RegisterController);

AngularApp.factory('AuthHttpResponseInterceptor', AuthHttpResponseInterceptor);
AngularApp.factory('LoginFactory', LoginFactory);
AngularApp.factory('RegistrationFactory', RegistrationFactory);

var configFunction = function($stateProvider, $httpProvider, $locationProvider) {

	$locationProvider.hashPrefix('!').html5Mode(true);

	$stateProvider
		.state('stateOne', {
			url: '/stateOne?donuts',
			views: {
				"containerOne": {
					templateUrl: '/routesDemo/one'
				},
				"containerTwo": {
					templateUrl: function (params) { return '/routesDemo/two?donuts=' + params.donuts; }
				},
				"nestedView@stateOne": {
					templateUrl: '/routesDemo/four'
				}
			}
		})
		.state('stateTwo', {
			url: '/stateTwo',
			views: {
				"containerOne": {
					templateUrl: '/routesDemo/one'
				},
				"containerTwo": {
					templateUrl: 'routesDemo/three'
				}
			}
		})
		.state('stateThree', {
			url: '/stateThree?donuts',
			views: {
				"containerOne": {
					templateUrl: function (params) { return '/routesDemo/two?donuts=' + params.donuts; }
				},
				"containerTwo": {
					templateUrl: 'routesDemo/three'
				}
			}
		})
		.state('loginRegister', {
			url: 'loginRegister?returnUrl',
			views: {
				"containerOne": {
					templateUrl: '/Account/Login',
					controller: LoginController
				},
				"containerTwo": {
					templateUrl: '/Account/Register',
					controller: RegisterController
				}
			}
		});
	$httpProvider.interceptors.push('AuthHttpResponseInterceptor');
};

configFunction.$inject = ['$stateProvider', '$httpProvider', '$locationProvider'];

AngularApp.config(configFunction);