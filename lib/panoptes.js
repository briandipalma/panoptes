/** @module panoptes/lib/panoptes */

"use strict";

var	Log = require("fell").Log,
    Promise = require("bluebird"),
    chokidar = require("chokidar"),
    panoptesESLint = require("./panoptes-eslint"),
    panoptesJSCSChecker = require("./panoptes-jscs");

/**
 * Starts up panoptes.
 * 
 * @alias module:panoptes/lib/panoptes
 */
module.exports = function launchPanoptes() {
	var promises = [panoptesJSCSChecker.configureJSCS()];

	Promise.
	    all(promises).
	    then(startWatchingJSFiles).
	    catch(launchingFailed);
};

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
 * @private
 * @param {Object} error - Error raised while file watching.
 */
function fileWatchingErrored(error) {
	Log.error("Error while watching file.");
	Log.error(error);
}

/**
 * @private
 * @param {string} path - Path for file that changed.
 */
function watchedJSFileChanged(path) {
	Log.info("{0} changed", path);

	panoptesJSCSChecker.checkFileWithJSCS(path);
	panoptesESLint(path);
}

/**
 * @private
 */
function startWatchingJSFiles() {
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
 * @private
 * @param {Object} error - Error raised while launching panoptes.
 */
function launchingFailed(error) {
	Log.error("Unable to launch.");
	Log.error(error);
}