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
			$scope.user.register().success(function(res) {
				console.log(res)
			}).error(alertErr);
		};
		
		$scope.login = function() {
			$scope.user.login().success(function(res) {
				console.log(res)
			}).error(alertErr);
		};
		
		$scope.logout = function() {
			$scope.user.logout().success(function(res) {
				console.log(res)
			}).error(alertErr);
		};
	});
