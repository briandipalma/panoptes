/** @module panoptes/src/index */

import {
	configureJSCS,
	checkFileWithJSCS
} from "jscs-checker";

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