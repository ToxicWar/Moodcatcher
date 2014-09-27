angular.module('moodcatcher')
	.controller('AppController', function ($scope, $modal, $http, User) {
		$scope.user = new User({});
		
		function alertErr(err) {
			console.log(err)
			var errs = [];
			angular.forEach(err, function (vals,key) { errs.push(key+": "+(vals.join ? vals.join(',') : vals)) })
			alert(errs.join('\n'));
		}
		
		$scope.register = function() {
			var user = $scope.user;
			console.log(user)
			user.register().success(function(res) {
				console.log(res)
			}).error(alertErr);
		};
		
		$scope.login = function() {
			var user = $scope.user;
			console.log(user)
			user.login().success(function(res) {
				console.log(res)
			}).error(alertErr);
		};
	});
