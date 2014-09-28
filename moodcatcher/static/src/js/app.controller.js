angular.module('moodcatcher')
	.controller('AppController', function ($scope, $http, User, $rootScope, $location, MoodsCollection) {
		$rootScope.currentUser = new User({});
		$rootScope.currentUser.load().then(function(u){ console.log($rootScope.currentUser) });

		$scope.categories = MoodsCollection.getCategories();

		function alertErr(err) {
			var errs = [];
			angular.forEach(err, function (vals,key) { errs.push(key+": "+(vals.join ? vals.join(',') : vals)) })
			$scope.alert = errs.join('\n');
		}
		
		
		$scope.register = function() {
			$rootScope.currentUser.register()
				.success(function(u) {})
				.error(alertErr);
		};
		
		$scope.login = function() {
			$rootScope.currentUser.login().then(
				function(u) {},
				alertErr);
		};
		
		$scope.logout = function() {
			$rootScope.currentUser.logout()
				.success(function(res) {})
				.error(alertErr);
		};

		$scope.alert = '';

		$rootScope.$on("$routeChangeError", function(a, b, c, data) {
			$scope.alert = data.message;
			$location.path("/");
		});

		$scope.filterByCategory = function (category) {
			$location.path('/category/' + category);
		}
	});
