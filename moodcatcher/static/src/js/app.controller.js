angular.module('moodcatcher')
	.controller('AppController', function ($scope, $http, User, $rootScope, $location) {
		$rootScope.currentUser = null;
		User.me().then(function(u){ $rootScope.currentUser = u; console.log(u) });
		$scope.user = new User({});
		
		function alertErr(err) {
			var errs = [];
			angular.forEach(err, function (vals,key) { errs.push(key+": "+(vals.join ? vals.join(',') : vals)) })
			$scope.alert = errs.join('\n');
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

		$scope.alert = '';

		$rootScope.$on("$routeChangeError", function(a, b, c, data) {
			$scope.alert = data.message;
			$location.path("/");
		});
	});
