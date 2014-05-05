/** @module panoptes/src/index */

import {
	configureJSCS,
	checkFileWithJSCS
} from "jscs-checker";
import {chokidar} from "chokidar";

/**
 * Starts up panoptes.
 *
 * @alias module:panoptes/src/index
 * @returns {void}
 */
export function launchPanoptes() {
	var promises = [configureJSCS()];

	Promise.
	all(promises).
	then(startWatchingJSFiles).
	catch(launchingFailed);
};

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