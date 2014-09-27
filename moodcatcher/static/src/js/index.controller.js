angular.module('moodcatcher')
	.controller('IndexController', ['$scope', '$modal', function ($scope, $modal) {
		$scope.posts = data;
		
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
		}
	}])
	.controller('UploadPopupController', ['$scope', function ($scope) {
		$scope.upload = function() {
			alert("upload")
		};
		$scope.cancel = function() {
			alert("cancel")
		};
	}]);
