angular.module('moodcatcher')
	.controller('IndexController', ['$scope', 'posts', function ($scope, posts) {
		$scope.posts = posts;

		$scope.loadMore = function () {
			posts.next();
		};

		$scope.addMood = function () {

		};

		$scope.getMood = function () {

		};

	}]);