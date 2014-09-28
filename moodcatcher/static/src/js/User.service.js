angular.module('moodcatcher')
	.service('User', function ($http, $q) {

		function User(attrs) {
			this.authed = false;
			angular.extend(this, attrs);
		};
		
		User.prototype = {
			set: function (data) {
				angular.extend(this, data);
			},
			load: function () {
				var me = this;
				var def = $q.defer();
				$http.get("/api/user/me/").success(function (d) {
					console.log("me", true, d)
					me.set(d);
					me.authed = true;
					def.resolve(true);
				}).error(function (e) {
					console.log("me", false, e)
					me.authed = false;
					def.resolve(false, e);
				});
				return def.promise;
			},
			register: function () {
				var me = this;
				var def = $q.defer();
				$http.post("/api/users/", this)
					.success(function (d) {
						console.log("reg", true, d)
						me.set(d);
						me.authed = false;
						def.resolve(true);
						me.login().then(
							def.resolve.bind(def),
							def.reject.bind(def));
					})
					.error(function (e) {
						console.log("reg", false, e)
						me.authed = false;
						def.reject(false, e);
					});
				return def.promise;
			},
			login: function () {
				var me = this;
				var def = $q.defer();
				$http.post("/api/auth/", this)
					.success(function (d) {
						console.log("auth", true, d)
						me.set(d);
						me.authed = true;
						def.resolve(new User(d));
					})
					.error(function (err) {
						console.log("auth", false, err)
						me.register().then(
							def.resolve.bind(def),
							def.reject.bind(def))
					});
				return def.promise;
			},
			logout: function () {
				var me = this;
				var def = $q.defer();
				return $http.delete("/api/auth/")
					.success(function () {
						console.log("out", true)
						me.authed = false;
						def.resolve();
					})
					.error(function (err) {
						console.log("out", false, err)
						def.reject(err);
					});
			}
		};

		return User;
	});
