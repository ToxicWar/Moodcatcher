angular.module('moodcatcher')
	.service('Mood', function () {

		function Mood(attrs) {
			angular.extend(this, attrs);
		}

		Mood.prototype = {

		};

		return Mood;
	})
	.service('MoodsCollection', function (Mood, $q, $http) {

		function MoodsCollection (response) {
			this.items = response.results.map(function (item) {
				return this.createInstance(item);
			}.bind(this));
			this.count = response.count;
			this.page = 1;
		}

		MoodsCollection.prototype = {
			next: function () {
				return MoodsCollection.load(++this.page).success(function (response) {
					this.append(response);
				}.bind(this));
			},
			append: function (item) {
				this.items.push(this.createInstance(item))
			},
			createInstance: function (data) {
				return new Mood(data);
			}
		};

		MoodsCollection.get = function () {
			var def = $q.defer();

			MoodsCollection.load(1).success(function (response) {
				def.resolve(new MoodsCollection(response));
			}).error(function () {
				def.reject({
					message: 'Moods can not be loaded.'
				});
			});

			return def.promise;
		};

		MoodsCollection.load = function (page) {
			return $http.get('/moods?page=' + page);
		};

		return MoodsCollection;
	});