/** @module panoptes/lib/panoptes */

"use strict";

var	Log = require("fell").Log;
var	Promise = require("bluebird");
var	chokidar = require("chokidar");
var	panoptesESLint = require("./panoptes-eslint");
var	panoptesJSCSChecker = require("./panoptes-jscs");

/**
 * Starts up panoptes.
 *
 * @alias module:panoptes/lib/panoptes
 * @returns {void}
 */
module.exports = function launchPanoptes() {
	var promises = [panoptesJSCSChecker.configureJSCS()];

	Promise.
	all(promises).
	then(startWatchingJSFiles).
	catch(launchingFailed);
};

/**
 * @param {string} directoryPath - Path for directory to test.
 * @returns {void}
 */
function shouldDirectoryBeIgnored(directoryPath) {
	return /.*node_modules$/.test(directoryPath) ||
		/.*\.git$/.test(directoryPath) ||
		/.*\.svn$/.test(directoryPath) ||
		/.*bundles$/.test(directoryPath);
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
	if (stats) {
		if (stats.isFile() && /.*\.js$/.test(path) === false) {
			return true;
		} else if (stats.isDirectory() && shouldDirectoryBeIgnored(path)) {
			return true;
		}
	}

	return false;
}

/**
 * @private
 * @param {Object} error - Error raised while file watching.
 * @returns {void}
 */
function fileWatchingErrored(error) {
	Log.error("Error while watching file.");
	Log.error(error);
}

/**
 * @private
 * @param {string} path - Path for file that changed.
 * @returns {void}
 */
function watchedJSFileChanged(path) {
	Log.info("{0} changed", path);

	panoptesJSCSChecker.checkFileWithJSCS(path);
	panoptesESLint(path);
}

/**
 * @private
 * @returns {void}
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
 * @returns {void}
 */
function launchingFailed(error) {
	Log.error("Unable to launch.");
	Log.error(error);
}