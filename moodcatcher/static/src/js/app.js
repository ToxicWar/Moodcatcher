angular.module('moodcatcher', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'IndexController',
				templateUrl: '/static/src/templates/index.html',
				resolve: {
					moodsCollection: function (MoodsCollection) {
						return MoodsCollection.get();
					}/*,
					_currentUser: function (User) {
						return User.me();
					}*/
				}
			}).when('/history', {
				controller: 'HistoryController',
				templateUrl: '/static/src/templates/history.html',
				resolve: {
					users: function($http) {
						return $http.get("/api/users");
					}
				}
			}).when('/moods/category/:category', {
				controller: 'CategoryController',
				templateUrl: '/static/src/templates/randomMoodByCategory.html',
				resolve: {
					mood: function (RandomMoodByCategory, $route) {
						return RandomMoodByCategory.get($route.current.params.category);
					}
				}
			});
	})
	.run(function ($rootScope) {
		//$rootScope.qwe="wert";
	})
	.directive('mood', function () {
		return {
			templateUrl: '/static/src/templates/directives/mood.html',
			scope: {
				mood: '='
			},
			replace: true,
			link: function (scope, elem, attrs) {

			}
		};
	})
	.directive('dragtarget', function() {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			template: "<div ng-transclude></div>",
			scope: {
				file: '='
			},
			link: function($scope, elem, attrs) {
				elem.on('dragover', function() {
					$(this).addClass('drag-over');
					return false;
				});
				elem.on('dragleave', function() {
					$(this).removeClass('drag-over');
					return false;
				});
				elem.on('drop', function(e) {
					e.preventDefault();
					$(this).removeClass('drag-over');
					var files = e.originalEvent.dataTransfer.files;
					
					var img = new Image();
					img.style.width = img.style.height = "100%";
					elem.append(img);
					
					var reader = new FileReader();
					reader.onload = function(e) {
						img.src = e.target.result;
					};
					reader.readAsDataURL(files[0]);

					$scope.file = files[0];
					$scope.$digest();
				});
			}
		}
	})
	.directive('category', function () {
		return {
			scope: {
				category: '='
			},
			link: function (scope, elem) {
				elem.on('click', function () {
					elem.parent().children().removeClass('selected');
					elem.addClass('selected');
				});
				elem.css('backgroundImage', 'url(/static/src/images/categories/' + scope.category + '.png)');
			}
		};
	});
