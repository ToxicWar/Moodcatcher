angular.module('moodcatcher', ['ngRoute', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'IndexController',
				templateUrl: '/static/src/templates/index.html'
			}).when('/history', {
				controller: 'HistoryController',
				templateUrl: '/static/src/templates/history.html',
				resolve: {
					users: function($http) {
						return $http.get("/api/users");
					}
				}
			});
	})
	.run(function($rootScope, $location) {
		$rootScope.$on("$routeChangeError", function() {
			console.log("failed to change routes");
			$location.path("/");
		});
	});
