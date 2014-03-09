/** @module panoptes/lib/panoptes-eslint */

"use strict";

var path = require("path"),
    eslint = require("eslint").cli;

/**
 * @private
 * @param {string} filePath
 */
module.exports = function checkFileWithESLint(filePath) {
	eslint.execute({
		_: [filePath],
		config: path.join(__dirname, "..", "conf", "eslint.json")
	});
};