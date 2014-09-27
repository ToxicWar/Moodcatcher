angular.module('moodcatcher')
	.service('Mood', function ($http) {

		function Mood(attrs) {
			angular.extend(this, attrs);
		}

		Mood.prototype = {
			save: function () {
				var fd = new FormData();
				console.log(this);
				this.text && fd.append('text', this.text);
				this.image && fd.append('image', this.image);

				$http({
					url: "/api/moods/",
					method: "POST",
					data: fd,
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				});
			}
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
			return $http.get('/api/moods?page=' + page);
		};

		MoodsCollection.getCategories = function () {
			return {
				normal: 'обычное',
				aggresive: 'агрессивное',
				peaceful: 'спокойное',
				energetic: 'энергичное',
				positive: 'позитивное',
				sad: 'грустное',
				creative: 'созидательное'
			};
		};

		return MoodsCollection;
	})
	.service('RandomMoodByCategory', function ($http, $q, Mood) {
		function RandomMoodByCategory(category, data) {
			this.categoryId = category;
			this.mood = new Mood(data);
		}

		RandomMoodByCategory.prototype = {
			next: function () {
				return RandomMoodByCategory.get(this.categoryId);
			}
		};

		RandomMoodByCategory.get = function (category) {
			var def = $q.defer();

			$http.get('/api/moods/getbycategoryid/' + category)
				.success(function (response) {
					if(!response.results.length) {
						def.reject({
							message: 'No mood for category has been found'
						});
					} else {
						def.resolve(new RandomMoodByCategory(category, response.results[0]));
					}
				})
				.error(function () {
					def.reject({
						message: 'Can not load mood for category'
					});
				});

			return def.promise;
		};

		return RandomMoodByCategory;
	});
