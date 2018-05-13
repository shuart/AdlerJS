function createApp() {
  var self = {}

  var init = function () {
    var adler = ADLER.createAdlerObject();
    adler.init({filepath:'./tmpl/view.'});

    adler.mountDOM({
      callBack:function () {
        //trigger a call back when DOM is loaded
        console.log("callBack triggered");
      }
    });
    xlm = adler.get;//develop TO REMOVE
  }
  self.init = init;
  return self
}

var xlm;
var demo = createApp();
demo.init();
