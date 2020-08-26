module.exports = async ({ config, mode }) => {
	// Loads the story code for the Story pane
	config.module.rules.push({
		test: /\.stories\.tsx?$/,
		loaders: [require.resolve('ts-loader')],
		enforce: 'pre'
	});

	return config;
};
