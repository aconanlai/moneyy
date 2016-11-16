module.exports = {
	stats: {
		errorDetails: true
	},
	entry: "./client/client.js",
	output: {
		path: "./client/js/",
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
        },
      },
			{
        test: /\.css$/,
        loader: 'style-loader',
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
		],
	},
	resolve: {
		extensions: ['', '.js', '.json', 'jsx'],
    modulesDirectories: ['node_modules']
	}
};