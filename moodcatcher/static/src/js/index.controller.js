angular.module('moodcatcher')
	.controller('IndexController', function ($scope, $modal, moodsCollection, $http, $location) {

		$scope.moodsCollection = moodsCollection;

		$scope.addMood = function() {
			$modal.open({
				templateUrl: '/static/src/templates/uploadPopup.html',
				controller: 'UploadPopupController',
				resolve: {
					categories: function (MoodsCollection) {
						return MoodsCollection.getCategories();
					}
				},
				size: 'lg'
			}).result.then(function(mood) {
				mood.save().then(function (mood) {
					moodsCollection.items.unshift(mood);
				})
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

	})
	.controller('UploadPopupController', function($scope, $modalInstance, Mood, categories) {
		$scope.mood = new Mood({
			category: 'normal'
		});
		$scope.categories = categories;

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

		$scope.chooseCategory = function (category) {
			$scope.mood.category = category;
		};
	})
	.controller('GetMoodPopupController', function ($scope, categories, $modalInstance) {

		$scope.categories = categories;
		$scope.chooseCategory = function (category) {
			$modalInstance.close(category);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		}
	});
