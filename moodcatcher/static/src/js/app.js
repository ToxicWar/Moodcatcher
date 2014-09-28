angular.module('moodcatcher', ['ngRoute', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'IndexController',
				templateUrl: '/static/src/templates/index.html',
				resolve: {
					moodsCollection: function (MoodsCollection) {
						return MoodsCollection.get();
					}
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
			}).when('/category/:category', {
				controller: 'IndexController',
				templateUrl: '/static/src/templates/index.html',
				resolve: {
					moodsCollection: function (MoodsCollection, $route) {
						return MoodsCollection.getFilteredByCategory($route.current.params.category);
					}
				}
			})
	})
	.directive('mood', function ($modal) {
		return {
			restrict: 'E',
			templateUrl: '/static/src/templates/directives/mood.html',
			scope: {
				mood: '='
			},
			link: function (scope, elem, attrs) {
				elem.click(function () {
					$modal.open({
						templateUrl: '/static/src/templates/moodPopup.html',
						controller: function ($scope) {
							$scope.mood = scope.mood;
						}
					});
				});
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
					
					var img = elem.children('img').get(0);

					var reader = new FileReader();
					reader.onload = function(e) {
						var timg = new Image();
						timg.src = e.target.result;
						
						var canvas = squarifyImage(timg);
						var url = canvas.toDataURL();
						img.src = url;
						
						//$scope.file = files[0];
						$scope.file = url;
						$scope.$digest();
					};
					reader.readAsDataURL(files[0]);
				});
			}
		}
	})
	.directive('category', function () {
		return {
			scope: {
				category: '=',
				model: '='
			},
			link: function (scope, elem) {

				var img = new Image(),
					$img = angular.element(img);
				img.width = 38;
				img.height = 38;
				img.src = '/static/src/img/categories/' + scope.category + '.svg';
				elem.append(img);

				$img.addClass(scope.category);

				elem.on('click', function () {
					elem.parent().children().find('img').removeClass('selected');
					$img.addClass('selected');

					scope.model = scope.category;
				});


			}
		};
	})
	.directive('header', function($rootScope) {
		return {
			restrict: 'E',
			//transclude: true,
			//replace: true,
			link: function($scope, elem, attrs) {
				$rootScope.$watch('currentUser', function() {
					var user = $rootScope.currentUser;
					elem.find('.user-info').text(user ? user.username : " Анон ");
				});
			}
		}
	})
