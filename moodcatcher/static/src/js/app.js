angular.module('moodcatcher', ['ngRoute', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'IndexController',
				templateUrl: '/static/src/templates/index.html',
				resolve: {
					posts: function (MoodsCollection) {
						return [];//MoodsCollection.get();
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
			});
	})
	.run(function($rootScope, $location) {
		$rootScope.$on("$routeChangeError", function(a, b, c, data) {
			console.log("failed to change routes", data.message);
			$location.path("/");
		});
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
						$scope.file = img.src;
						$scope.$digest();
					};
					reader.readAsDataURL(files[0]);
				});
				//elem[0].ondrop = function(e){ debugger }
				//console.log($scope, elem, attrs, elem[0])
			}
		}
	});
