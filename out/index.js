"use strict";
Object.defineProperties(exports, {
  launchPanoptes: {get: function() {
      return launchPanoptes;
    }},
  __esModule: {value: true}
});
var $__0 = $traceurRuntime.assertObject(require("jscs-checker")),
    configureJSCS = $__0.configureJSCS,
    checkFileWithJSCS = $__0.checkFileWithJSCS;
var Log = $traceurRuntime.assertObject(require("fell")).Log;
var checkFileWithESLint = $traceurRuntime.assertObject(require("eslint-checker")).checkFileWithESLint;
var chokidar = require("chokidar");
function launchPanoptes() {
  var promises = [configureJSCS()];
  Promise.all(promises).then(startWatchingJSFiles).catch(launchingFailed);
}
;
function shouldDirectoryBeIgnored(directoryPath) {
  return /.*node_modules$/.test(directoryPath) || /.*\.git$/.test(directoryPath) || /.*\.svn$/.test(directoryPath) || /.*bundles$/.test(directoryPath);
}
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
function fileWatchingErrored(error) {
  Log.error("Error while watching file.");
  Log.error(error);
}
function watchedJSFileChanged(path) {
  Log.info("{0} changed", path);
  checkFileWithJSCS(path);
  checkFileWithESLint(path);
}
function startWatchingJSFiles() {
  var watcher = chokidar.watch(".", {
    persistent: true,
    ignoreInitial: true,
    ignored: ignoreAllFilesExceptJSFiles
  });
  watcher.on("add", watchedJSFileChanged).on("change", watchedJSFileChanged).on("error", fileWatchingErrored);
}
function launchingFailed(error) {
  Log.error("Unable to launch.");
  Log.error(error);
}
