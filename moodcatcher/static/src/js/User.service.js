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
		}
		
		User.prototype = {
			register: function () {
				console.log(this);
				return $http.post("/api/users/", this);
			},
			login: function () {
				console.log(this);
				return $http.post("/api/auth/", this);
			},
			logout: function () {
				return $http.delete("/api/auth/");
			}
		};

		return User;
	});
