var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
  include: "*",
  contentScriptFile: data.url('next-image.js'),
  contentScriptWhen: 'ready',
  onAttach: function(worker) {
    worker.port.emit("init");
  }
});