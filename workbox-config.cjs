module.exports = {
	globDirectory: 'src',
	globPatterns: [
		'**/*.{css,js,vue}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};