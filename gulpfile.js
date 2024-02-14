
const { src, dest, task, watch, parallel } = require('gulp');

const clean = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('node-sass'));
const webpack = require('gulp-webpack');
const stream = require('webpack-stream');

const package = require('./package.json');


task('sass_dev', function() {
	return src('src/pyams_content_themes/resources/src/sass/pyams.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('../../../../../node_modules', '../../../node_modules'))
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/css/dev'))
});

exports.sass_dev = task('sass_dev');


task('sass', function() {
	return src('src/pyams_content_themes/resources/src/sass/pyams.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('pkg/css/dist'))
});

exports.sass = task('sass');


task('sass_almond_dev', function() {
	return src('src/pyams_content_themes/resources/src/sass/pyams-almond.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('../../../../../node_modules', '../../../node_modules'))
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/css/dev'))
});

exports.sass_almond_dev = task('sass_almond_dev');


task('sass_almond', function() {
	return src('src/pyams_content_themes/resources/src/sass/pyams-almond.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('pkg/css/dist'))
});

exports.sass_almond = task('sass_almond');


task('sass_darkgreen_dev', function() {
	return src('src/pyams_content_themes/resources/src/sass/pyams-darkgreen.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('../../../../../node_modules', '../../../node_modules'))
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/css/dev'))
});

exports.sass_darkgreen_dev = task('sass_darkgreen_dev');


task('sass_darkgreen', function() {
	return src('src/pyams_content_themes/resources/src/sass/pyams-darkgreen.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('pkg/css/dist'))
});

exports.sass_darkgreen = task('sass_darkgreen');


task('build_dev', function() {
	const config = require('./webpack-dev.js');
	return src('src/pyams_content_themes/resources/src/js/pyams.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/js/dev'));
});

exports.build_dev = task('build_dev');


task('build', function() {
	const config = require('./webpack.js');
	return src('src/pyams_content_themes/resources/src/js/pyams.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/js/dist'));
});

exports.build = task('build');


exports.default = function() {
	watch('src/pyams_content_themes/resources/src/sass/*.scss',
		parallel('sass_dev', 'sass',
				 'sass_almond_dev', 'sass_almond',
				 'sass_darkgreen_dev', 'sass_darkgreen'));
	watch(['pkg/css/dist/*.css',
			'src/pyams_content_themes/resources/src/js/*.js'],
		parallel('build_dev', 'build'));
};
