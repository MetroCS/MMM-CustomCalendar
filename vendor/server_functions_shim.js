/*
 * MMM-CustomCalendar vendor shim.
 *
 * The core http_fetcher.js only needs `getUserAgent()` from MagicMirror's
 * internal `#server_functions` module. Rather than vendor that entire file
 * (which also implements the CORS proxy, config-path resolution, etc. and
 * pulls in extra dependencies), this shim reproduces just that one function,
 * copied verbatim from MagicMirror core's js/server_functions.js.
 */

/**
 * Gets the preferred `User-Agent`
 * @returns {string} `User-Agent` to be used
 */
function getUserAgent () {
	const defaultUserAgent = `Mozilla/5.0 (Node.js ${Number(process.version.match(/^v(\d+\.\d+)/)[1])}) MagicMirror/${global.version}`;

	if (typeof global.config === "undefined") {
		return defaultUserAgent;
	}

	switch (typeof global.config.userAgent) {
		case "function":
			return global.config.userAgent();
		case "string":
			return global.config.userAgent;
		default:
			return defaultUserAgent;
	}
}

module.exports = { getUserAgent };
