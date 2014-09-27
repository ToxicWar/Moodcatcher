angular.module('moodcatcher')
	.controller('RandomMoodByCategoryController', ['$scope', 'mood', function ($scope, mood) {
		$scope.randomMood = mood;

		$scope.next = function () {
			$scope.randomMood = $scope.randomMood.next();
		};
	}]);