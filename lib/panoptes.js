/** @module panoptes/lib/panoptes */

"use strict";

var chokidar = require("chokidar");

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
		ignored: /.*(?:[^\.][^j][^s]$)/
		});
	//ignoreInitial: true
	
	watcher.
	    on("add", watchedJSFileChanged).
	    on("change", watchedJSFileChanged).
	    on("error", fileWatchingErrored);
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
