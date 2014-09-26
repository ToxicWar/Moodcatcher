angular.module('moodcatcher', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'IndexController',
				templateUrl: 'templates/index.html'
			}).when('/history', {
				controller: 'HistoryController',
				templateUrl: 'templates/history.html'
			});
	});
