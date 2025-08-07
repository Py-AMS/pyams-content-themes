
const { src, dest, task, watch, parallel } = require('gulp');

const clean = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('node-sass'));
const stream = require('webpack-stream');
const webpack = require('gulp-webpack');

const package = require('./package.json');


task('sass_dev', function() {
	return src('pkg/sass/pyams.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('../../node_modules', '../../../../../../node_modules'))
		.pipe(replace('$version$', package.version))
		.pipe(dest('src/pyams_content_themes/resources/static/css/dev'))
});

exports.sass_dev = task('sass_dev');


task('sass', function() {
	return src('pkg/sass/pyams.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('src/pyams_content_themes/resources/static/css/dist'))
});

exports.sass = task('sass');


task('sass_almond_dev', function() {
	return src('pkg/sass/pyams-almond.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('../../node_modules', '../../../../../../node_modules'))
		.pipe(replace('$version$', package.version))
		.pipe(dest('src/pyams_content_themes/resources/static/css/dev'))
});

exports.sass_almond_dev = task('sass_almond_dev');


task('sass_almond', function() {
	return src('pkg/sass/pyams-almond.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('src/pyams_content_themes/resources/static/css/dist'))
});

exports.sass_almond = task('sass_almond');


task('sass_darkgreen_dev', function() {
	return src('pkg/sass/pyams-darkgreen.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('../../node_modules', '../../../../../../node_modules'))
		.pipe(replace('$version$', package.version))
		.pipe(dest('src/pyams_content_themes/resources/static/css/dev'))
});

exports.sass_darkgreen_dev = task('sass_darkgreen_dev');


task('sass_darkgreen', function() {
	return src('pkg/sass/pyams-darkgreen.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('src/pyams_content_themes/resources/static/css/dist'))
});

exports.sass_darkgreen = task('sass_darkgreen');


task('build_dev', function() {
	const config = require('./webpack-dev.js');
	return src('pkg/js/pyams.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('src/pyams_content_themes/resources/static/js/dev'));
});

exports.build_dev = task('build_dev');


task('build', function() {
	const config = require('./webpack.js');
	return src('pkg/js/pyams.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('src/pyams_content_themes/resources/static/js/dist'));
});

exports.build = task('build');


exports.all = parallel(
	'sass_dev', 'sass',
	'sass_almond_dev', 'sass_almond',
	'sass_darkgreen_dev', 'sass_darkgreen',
	'build_dev', 'build'
);


exports.default = function() {
	watch('pkg/sass/*.scss',
		parallel('sass_dev', 'sass',
				 'sass_almond_dev', 'sass_almond',
				 'sass_darkgreen_dev', 'sass_darkgreen'));
	watch([
		'pkg/js/*.js',
		'src/pyams_content_themes/resources/static/css/*/*.css'
	], parallel('build_dev', 'build'));
};
