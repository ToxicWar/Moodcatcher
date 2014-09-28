angular.module('moodcatcher')
	.service('Mood', function ($http, $q) {

		function Mood(attrs) {
			angular.extend(this, {
				category: 'normal'
			}, attrs);
		}

		Mood.prototype = {
			isValid: function() {
				return this.text || this.image;
			},
			save: function () {
				var fd = new FormData();

				this.text && fd.append('text', this.text);
				this.image && fd.append('image', this.image);
				this.category && fd.append('category', this.category);

				var def = $q.defer();
				$http({
					url: "/api/moods/",
					method: "POST",
					data: fd,
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				}).success(function (response) {
					def.resolve(new Mood(response));
				}).error(function () {
					def.reject({

					});
				});

				return def.promise;
			},
			getDefaultImage: function () {
				return '/static/src/img/categories/' + this.category + '.svg';
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
			this.perpage = 10;
		}

		MoodsCollection.prototype = {
			next: function () {
				return MoodsCollection.load(++this.page).success(function (response) {
					response.results.forEach(function (item) {
						this.append(item);
					}.bind(this));
				}.bind(this));
			},
			append: function (item) {
				this.items.push(this.createInstance(item))
			},
			createInstance: function (data) {
				return new Mood(data);
			},
			hasMore: function () {
				return this.page * this.perpage < this.count;
			},
			slice: function () {
				return this.items.slice(0, this.page * this.perpage);
			},
			isEmpty: function () {
				return !this.items.length;
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

		MoodsCollection.getFilteredByCategory = function (cat) {
			var def = $q.defer();

			this.load(1, cat).success(function (response) {
				def.resolve(new MoodsCollection(response));
			}).error(function () {
				def.reject();
			});

			return def.promise;
		}

		MoodsCollection.load = function (page, category) {
			var url = '/api/moods/?page=' + page;
			if (category) {
				url += '&category_id=' + category;
			}
			return $http.get(url);
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

			$http.get('/api/moods/?category_id=' + category)
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
