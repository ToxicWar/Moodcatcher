var gulp = require('gulp'),
	jasmine = require('gulp-jasmine');

gulp.task('default', function () {
	return gulp.src(['bower_components/angular/angular.js', 'src/js/*.js', 'specs/*.js'])
		.pipe(jasmine());
});