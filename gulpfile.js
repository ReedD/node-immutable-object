'use strict';

const gulp    = require('gulp'),
      jshint  = require('gulp-jshint');

var jsGlob = [
	'!node_modules/**',
	'!coverage/**',
	'**/*.js'
];

gulp.task('default', function() {
	return gulp.src(jsGlob)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});
