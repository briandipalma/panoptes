"use strict";
var __moduleName = "./src/index";
var $__0 = $traceurRuntime.assertObject(require("jscs-checker")),
    configureJSCS = $__0.configureJSCS,
    checkFileWithJSCS = $__0.checkFileWithJSCS;
function launchPanoptes() {
  var promises = [configureJSCS()];
  Promise.all(promises).then(startWatchingJSFiles).catch(launchingFailed);
}
;
module.exports = {
  get launchPanoptes() {
    return launchPanoptes;
  },
  __esModule: true
};
