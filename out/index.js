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
