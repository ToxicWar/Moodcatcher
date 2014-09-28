angular.module('moodcatcher')
	.controller('IndexController', ['$scope', 'moodsCollection', '$http', '$location', function ($scope, moodsCollection, $http, $location) {

		$scope.moodsCollection = moodsCollection;

		$scope.loadMore = function () {
			moodsCollection.next();
		};
		
		/*$scope.addMood = function() {
			var modalInstance = $modal.open({
				templateUrl: '/static/src/templates/uploadPopup.html',
				controller: 'UploadPopupController',
				resolve: {
					categories: function (MoodsCollection) {
						return MoodsCollection.getCategories();
					}
				},
				size: 'lg'
			}).result.then(function(mood) {
				mood.save();
			});
		};*/

		/*$scope.getMood = function () {
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
		};*/

	}])
	.controller('UploadPopupController', ['$scope', 'Mood', 'categories', function($scope, Mood, categories) {
		$scope.mood = new Mood({});
		$scope.categories = categories;
		
		$scope.upload = function() {
			if (!$scope.mood.isValid()) {
				alert("Ну введите хоть что-нибудь!");
				return;
			}
			//$modalInstance.close($scope.mood);
		};
		$scope.cancel = function() {
			//$modalInstance.dismiss('cancel');
		};

		$scope.chooseCategory = function (category) {
			$scope.mood.category = category;
		};
	}])
	.controller('GetMoodPopupController', ['$scope', 'categories',
		function ($scope, categories) {

		$scope.categories = categories;
		$scope.chooseCategory = function (category) {
			//$modalInstance.close(category);
		};

		$scope.cancel = function () {
			//$modalInstance.dismiss('cancel');
		}
	}])
	.controller('CategoryController', ['$scope', function ($scope) {

	}]);
