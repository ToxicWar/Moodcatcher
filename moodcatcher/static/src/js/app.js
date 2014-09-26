angular.module('moodcatcher', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'IndexController',
				templateUrl: '/static/src/templates/index.html'
			}).when('/history', {
				controller: 'HistoryController',
				templateUrl: '/static/src/templates/history.html'
			});
	});
