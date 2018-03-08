/*USAGE:
adler.importHtmlTemplate("./tmpl/todayFullView.html",'#today-full-view', {
  callback:function (event) {
    //adler.mount("#today-full-view", document.body, {autoMount:true})
  },
  mountPoint:'#todayView'
})

// adler.importHtmlTemplate("./tmpl/view.cards.html",'#tmpl-cards', {
//   mountCallback:checkLoadStatus,
//   mountPoint:document.body
// });

*/
var ADLER = {}

ADLER.createAdlerObject = function () {
  var self = {}
  self.templateArea;
  var options = {}

  var init = function (data) {
    var defaults = {
      filepath:'./',
      extension:'.html'
    };
    options.filepath = data.filepath || defaults.filepath;
    options.extension = data.extension || defaults.extension;
    //create Div to store imported templates
    var element =  document.createElement('div');
    element.id = 'adler-templates'
    element.style.visibility='hidden';
    self.templateArea = element;
    document.body.appendChild(element)
  }

  function importHtmlTemplate(file, templateSelector, data) { //data.callback, mountpoint
    var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        console.log(file+ " loaded");
        var html = this.response.documentElement.innerHTML
        //console.log(document.querySelector("#mytemplate").content);
        //var clone = document.importNode(tpl.content, true)
        var temp = document.createElement('template');
        console.log(html);
        temp.innerHTML = html;
        self.templateArea.appendChild(temp.content)
        //console.log(newElement);

        if (data && data.callback) {
          data.callback({element:newElement})
        }
        if (data && data.mountPoint) {
          var mountCallback=undefined;
          if (data.mountCallback) {
            mountCallback=data.mountCallback;
          }
          self.mount(templateSelector, data.mountPoint, {autoMount:true, mountCallback:mountCallback})
        }

      }
      console.log("loading "+file);
      xhr.open("GET", file);
      xhr.responseType = "document";
      xhr.send();
  }

  function mount(templateName, el, data) { // {tags = obj, class: obj, autoMount : true}
    var templateName = templateName;
    var mountPoint = el;
    var mountPointElement;
    if (mountPoint.nodeType === 1) {
      mountPointElement = mountPoint
    }
    else if (mountPoint != document.body) {
      mountPointElement = document.querySelector(mountPoint);
    }else {
      mountPointElement = document.body;
    }
    console.log("mounting " + templateName);

    //var spanClassTargetValue = data.data;
    var tpl = document.querySelector(templateName);
    //console.log(tpl);
    //tpl.content
    var clone = document.importNode(tpl.content, true);
    //templateMountedList
    //var tplHTML = tpl.innerHTML
    //tpl.content.querySelector('img').src = 'logo.png';

    //console.log(clone);

    if (data.tags){
      for (var property in data.tags) {
            if (data.tags.hasOwnProperty(property)) {
                clone.querySelector(property).innerHTML = data.tags[property];
            }
        }
    }
    if (data.class){
      for (var property in data.class) {
            if (data.class.hasOwnProperty(property)) {
                //data[property]
                var target = clone.querySelector(property);
                //console.log(data.class);
                //console.log(property);
                if(target){
                  //console.log("addclass");
                  target.className += " "+data.class[property];
                }
            }
        }
    }

    //  console.log(data.autoMount);
    if (data.autoMount != undefined){
      autoMounting = data.autoMount;
    }
    if (data.autoMount == true) {
      mountPointElement.appendChild(clone)
      console.log(templateName + " mounted at " + mountPoint);
      if (data.mountCallback) {
        data.mountCallback();
      }
    }
    return clone;
  }

  var mountDOM = function (data) {
    //create default options
    var foptions = {};
    var data = data || {};
    foptions.callBack = data.callBack || false;
    //get all mount point
    var mountPointsArray = document.querySelectorAll('.adlerInclude, .adlerTmpl');

    //set up a loading loop for init before a callBack
    var loadingStatus = 0;
    var loadingLength = mountPointsArray.length;

    function checkLoadStatus() {
      loadingStatus ++;
      if (loadingStatus == loadingLength) {
        if (foptions.callBack){
          foptions.callBack();
        }
      }
    }
    //iterate trough all the node
    for (i = 0; i < mountPointsArray.length; ++i) {
      console.log(mountPointsArray[i])
      //alert()mountPointsArray[i].nodeType === 1
      var tmplName = mountPointsArray[i].dataset.adlerSource
      var tmplPath = options.filepath + tmplName + options.extension
      var type = mountPointsArray[i].className;
      if (type == "adlerInclude") {
        self.importHtmlTemplate(tmplPath,'#tmpl-'+tmplName, {
          mountCallback:checkLoadStatus,
          //mountPoint:'#'+tmplName+'-mount-point'
          mountPoint:mountPointsArray[i]
        });
      }else {
        self.importHtmlTemplate(tmplPath,'#tmpl-'+tmplName);
      }

    }
  }

  var preLoad = function (data) {
    //create default options
    var foptions = {};
    var data = data || {};
    foptions.callBack = data.callBack || false;
    //get all mount point
    var mountPointsArray = document.querySelectorAll('.adlerTmpl');

    //set up a loading loop for init before a callBack
    var loadingStatus = 0;
    var loadingLength = mountPointsArray.length;

    function checkLoadStatus() {
      loadingStatus ++;
      if (loadingStatus == loadingLength) {
        if (foptions.callBack){
          foptions.callBack();
        }
      }
    }
    //iterate trough all the node
    for (i = 0; i < mountPointsArray.length; ++i) {
      //alert()mountPointsArray[i].nodeType === 1
      var tmplName = mountPointsArray[i].dataset.adlerSource
      var tmplPath = options.filepath + tmplName + options.extension
      self.importHtmlTemplate(tmplPath,'#tmpl-'+tmplName);
    }
  }

  self.init = init;
  self.mountDOM = mountDOM;
  self.preLoad = preLoad;
  self.importHtmlTemplate = importHtmlTemplate;
  self.mount = mount;
  return self
}
