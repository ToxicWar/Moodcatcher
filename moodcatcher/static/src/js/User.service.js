angular.module('moodcatcher')
	.service('User', function ($http) {

		function User(attrs) {
			angular.extend(this, attrs);
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
