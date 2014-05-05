"use strict";
var __moduleName = "./src/index";
var $__0 = $traceurRuntime.assertObject(require("jscs-checker")),
    configureJSCS = $__0.configureJSCS,
    checkFileWithJSCS = $__0.checkFileWithJSCS;
var chokidar = $traceurRuntime.assertObject(require("chokidar")).chokidar;
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
  panoptesJSCSChecker.checkFileWithJSCS(path);
  panoptesESLint(path);
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
module.exports = {
  get launchPanoptes() {
    return launchPanoptes;
  },
  __esModule: true
};
