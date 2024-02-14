
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: {
		'pyams': './src/pyams_content_themes/resources/src/js/pyams.js',
		'pyams-almond': './src/pyams_content_themes/resources/src/js/pyams-almond.js',
		'pyams-darkgreen': './src/pyams_content_themes/resources/src/js/pyams-darkgreen.js'
	},
	output: {
		path: path.resolve(__dirname, 'pkg', 'js', 'dev'),
		filename: '[name].js',
		assetModuleFilename: '../../assets/[name][ext]'
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			moment: 'moment'
		})
	],
	resolve: {
		alias: {
			'jquery': path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				type: 'asset/resource'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				type: 'asset/resource'
			}
		]
	},
	devtool: 'source-map'
}
