angular.module('moodcatcher')
	.service('User', function ($http, $q) {

		function User(attrs) {
			angular.extend(this, attrs);
		}
		
		User.currentUser = null;
		
		User.me = function () {
			var def = $q.defer();
			$http.get("/api/user/me/").success(function (d) {
				console.log(d,1)
				var u = new User(d);
				def.resolve(u);
			}).error(function (e) {
				console.log(e,2)
				def.resolve(null);
			});
			return def.promise;
		};
		
		User.register = function () {
			console.log(this);
			return $http.post("/api/users/", this);
		};
		
		User.login = function () {
			var def = $q.defer();
			$http.post("/api/auth/", this).success(function (d) {
				def.resolve(new User(d));
			}).error(def.reject.bind(def));
			return def.promise;
		};
		User.logout = function () {
			return $http.delete("/api/auth/");
		};
		
		User.prototype = {};

		return User;
	});
