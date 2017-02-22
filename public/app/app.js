var app = angular.module('myApp', ['ngRoute','Elo']);

	// configure our routes
	app.config(function($routeProvider) {

		$routeProvider

            .when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'ProductsCtrl',
				title:'ADP HackerEarth Contest'
			})
			// route for the home page
			.when('/king/:id*', {
				templateUrl : 'pages/view.html',
				controller  : 'SingleProductController as vm',
				title:'Single King Information'
			})

            // route for the home page
			.when('/elo', {
				templateUrl : 'pages/elo.html',
				controller  : 'SingleProductController as vm',
				title:'Elo Tool'
			})

			.otherwise({
				redirectTo:'/'
			});
	});