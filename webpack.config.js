module.exports = {
	stats: {
		errorDetails: true
	},
	entry: "./client/components/Main.js",
	output: {
		path: "./public/js/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
        	presets: ["react", "es2015", "stage-0"]
        }
      },
		]
	},
	resolve: {
		extensions: ['', '.js', '.json', 'jsx'],
    modulesDirectories: ['node_modules']
	}
};