angular.module('moodcatcher', ['ngRoute', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'IndexController',
				templateUrl: '/static/src/templates/index.html',
				resolve: {
					posts: function (MoodsCollection) {
						return MoodsCollection.get();
					}
				}
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
		$rootScope.$on("$routeChangeError", function(a, b, c, data) {
			console.log("failed to change routes", data.message);
			$location.path("/");
		});
	});
