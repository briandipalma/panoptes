/** @module panoptes/lib/panoptes */

"use strict";

var chokidar = require("chokidar"),
    panoptesJSCSChecker = require("./panoptes-jscs");

/**
 * Starts up panoptes.
 * 
 * @alias module:panoptes/lib/panoptes
 */
function launchPanoptes() {
	startWatchingJSFiles();
}

/**
 * Start watching JS files.
 * 
 * @private
 */
function startWatchingJSFiles() {
	console.info("Watching files");

	var watcher = chokidar.watch(".", {
			persistent: true,
			ignoreInitial: true,
			ignored: ignoreAllFilesExceptJSFiles
		});
	
	watcher.
	    on("add", watchedJSFileChanged).
	    on("change", watchedJSFileChanged).
	    on("error", fileWatchingErrored);
}

/**
 * Test function which returns whether a file or directory should be watched.
 * If it's a file and it ends with ".js" or if it's a directory it will be watched.
 * 
 * @private
 * @param {string} path - Path for file that could be watched.
 * @param {fs.Stats} [stats] - File stats for file that could be watched.
 * @returns {boolean} Returns false for files or directories that will be watched.
 */
function ignoreAllFilesExceptJSFiles(path, stats) {
	if (stats && stats.isFile() && (/.*js$/.test(path) === false)) {
		return true;
	}

	return false;
}

/**
 * Called when a watched file is changed.
 * 
 * @private
 * @param {string} path - Path for file that changed.
 * @param {fs.Stats} stats - File stats for the changed file.
 */
function watchedJSFileChanged(path, stats) {
	console.info("File changed", path);
	
	//Read the file - Promise?
	//Pass the Promise to the JSCS module.
	panoptesJSCSChecker(path);
	
	//Pass the Promise to the ESLint module.
}

/**
 * Called when an error is raised while file watching.
 * 
 * @private
 * @param {Object} error - Error raised while file watching.
 */
function fileWatchingErrored(error) {
	console.error(error);
}

module.exports = launchPanoptes;
