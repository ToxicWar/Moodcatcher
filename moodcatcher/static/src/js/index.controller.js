angular.module('moodcatcher')
	.controller('IndexController', ['$scope', '$modal', 'posts', function ($scope, $modal, posts) {
		$scope.posts = data;
		
		$scope.loadMore = function () {
			posts.next();
		};
		
		$scope.addMood = function() {
			var modalInstance = $modal.open({
				templateUrl: '/static/src/templates/uploadPopup.html',
				controller: 'UploadPopupController',
				size: 'lg',
				/*resolve: {
					items: function () {
						return $scope.items;
					}
				}*/
			});
		};
		
		$scope.getMood = function () {
			
		};
	}])
	.controller('UploadPopupController', ['$scope', function ($scope) {
		$scope.upload = function() {
			alert("upload")
		};
		$scope.cancel = function() {
			alert("cancel")
		};
	}]);
