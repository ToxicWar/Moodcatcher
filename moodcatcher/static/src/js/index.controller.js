angular.module('moodcatcher')
	.controller('IndexController', ['$scope', '$modal', 'moodsCollection', '$http', '$location', function ($scope, $modal, moodsCollection, $http, $location) {
		
		$scope.loadMore = function () {
			moodsCollection.next();
		};
		
		$scope.addMood = function() {
			var modalInstance = $modal.open({
				templateUrl: '/static/src/templates/uploadPopup.html',
				controller: 'UploadPopupController',
				size: 'lg'
			}).result.then(function(mood) {
				mood.save();
			});
		};

		$scope.getMood = function () {
			$modal.open({
				templateUrl: '/static/src/templates/getMoodPopup.html',
				controller: 'GetMoodPopupController',
				size: 'md',
				resolve: {
					categories: function (MoodsCollection) {
						return MoodsCollection.getCategories();
					}
				}
			}).result.then(function (category) {
				$location.path('/moods/category/' + category);
			});
		};

	}])
	.controller('UploadPopupController', ['$scope', '$modalInstance', 'Mood', function($scope, $modalInstance, Mood) {
		console.log($modalInstance)
		$scope.mood = new Mood({});
		
		$scope.upload = function() {
			if (!$scope.mood.isValid()) {
				alert("Ну введите хоть что-нибудь!");
				return;
			}
			$modalInstance.close($scope.mood);
		};
		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}])
	.controller('GetMoodPopupController', ['$scope', 'categories', '$modalInstance', '$location',
		function ($scope, categories, $modalInstance) {

		$scope.categories = categories;
		$scope.chooseCategory = function (category) {
			$modalInstance.close(category);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		}
	}])
	.controller('CategoryController', ['$scope', function ($scope) {

	}]);
