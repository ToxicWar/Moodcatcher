var gulp = require('gulp'),
		jasmine = require('gulp-jasmine');

gulp.task('default', function () {
	return gulp.src('src/specs/appSpecs.js')
				.pipe(jasmine());
});