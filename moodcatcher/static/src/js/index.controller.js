angular.module('moodcatcher')
	.controller('IndexController', ['$scope', '$modal', 'posts', '$http', function ($scope, $modal, posts, $http) {
		
		$scope.loadMore = function () {
			posts.next();
		};
		
		$scope.addMood = function() {
			var modalInstance = $modal.open({
				templateUrl: '/static/src/templates/uploadPopup.html',
				controller: 'UploadPopupController',
				size: 'lg'
			}).result.then(function(mood) {
				console.log(mood)
				mood.save();
//				var obj = {}
//				var fd = new FormData();
//				if (data.text) fd.append("text", data.text);
//				if (data.file) fd.append("image", data.file);//file.name
//				$http.post("/api/moods/", {text});
			});
		};
		
		$scope.getMood = function () {
			
		};
	}])
	.controller('UploadPopupController', ['$scope', '$modalInstance', 'Mood', function($scope, $modalInstance, Mood) {
		console.log($modalInstance)
		$scope.mood = new Mood({});
		
		$scope.upload = function() {
			$modalInstance.close($scope.mood);
		};
		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}]);
