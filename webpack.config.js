// This file configures webpack for generating all fo the finished JavaScript and resources for the application. It 
// reads our Vue files, generates a working JavaScript bundle including any associated CSS and static assets, and 
// drops them all in the "public" folder to be served up by our application.

// The vue-loader allows us to use single file components with Vue. See the vue-loader and Vue SFC documentation for more.
const { VueLoaderPlugin } = require('vue-loader');

// This plugin runs eslint to lint our JavaScript against any JS and Vue files webpack looks at
const ESLintPlugin = require('eslint-webpack-plugin');

// This plugin allows us to copy static assets from our src to the public directory without having to process them. 
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	//  See webpack for configuration differences between 'development' and 'production'
	mode: 'development',
	// Entry is the JS file that will be used as the entry point for our application. ie. the top-level JS file
	entry: './src/ui.js',
	// Output is where all webpack transformed files will end up. In this case, the public directory with main.js as the primary bundle.
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js'
	},
	module: {
		// Rules dictate what webpack loaders should be used with each file type. See the webpack configuration documentation for more details.
		// test is a regex for the type of file while loader/use specifies what loaders to use. 
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		// Here we initialize all of the plugins we intend to use. See their documentation for more details.
		new VueLoaderPlugin(),
		// Initialize eslint (which will use our eslintrc), apply it to our js and vue files, and auto-fix any issues if they can be fixed.
		new ESLintPlugin({ fix: true, extensions: ['js', 'vue'] }),
		// Copy anything in src/static to our public directory. We do this for our base HTML file.
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/static' }
			]
		})
	]
};