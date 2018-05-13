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
    var clone = document.importNode(tpl.content, true);
    //templateMountedList
    //var tplHTML = tpl.innerHTML
    //tpl.content.querySelector('img').src = 'logo.png';

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
        importHtmlTemplate(tmplPath,'#tmpl-'+tmplName, {
          mountCallback:checkLoadStatus,
          //mountPoint:'#'+tmplName+'-mount-point'
          mountPoint:mountPointsArray[i]
        });
      }else {
        importHtmlTemplate(tmplPath,'#tmpl-'+tmplName);
      }

    }
  }

  var get = (tmpl, data, mountpoint) => {
      //(tmpl, data)
      var tpl = document.querySelector('#'+tmpl);
      console.log(tpl);
      var clone = document.importNode(tpl.content, true);
      //Append element inside divid
      var test = {my_helper:"a change"}//helpers


      function tranferProps(props, el) {
        Object.keys(props).forEach(prop => {
          if (prop == "className") {
            el[prop] = el[prop] + " " + props[prop];
          }else if(prop == "ct"){
            el.innerHTML = props[prop]
          }else{
            el[prop] = props[prop];
            if (prop == "onclick") {
              console.log(props[prop]);
              console.log(el[prop]);
            }
          }

        });
      }

      if (data) {
        for (var property in data) {
              if (data.hasOwnProperty(property)) {
                console.log(property)
                let injection = data[property];
                const el = clone.getElementById(property);
                if (typeof(injection) == "string"){
                  el.innerHTML = injection
                  // clone.querySelector(property).innerHTML = injection
                }else if (typeof(injection) == "object") {
                  tranferProps(injection, el)
                }

              }
          }
      }

      //actual code
      //xlm("tmpl-helper",{my_helper:{ct:"test",className:"plouf", onclick:function(){alert('test')}}},"#exemple-mount-point")
      //dreamcode
      // var a = adler.get("tmpl",{
      //   plouf:"test",
      //   padif:{ct:"esers",className:"rufl"},
      //   hrt:{
      //     div:{className:"ratat",
      //       div:{ct:"rouflaquet"}
      //     },
      //   hrt:{
      //     div:{className:"ratat",{
      //       div:{ct:"rouflaquet"}},{
      //       div:{ct:"rt"},{
      //         div:"eteteet"}
      //       },
      //     }
      //   }
      // })
      if (mountpoint) {

        let mountPointElement = document.querySelector(mountpoint);
        console.log(mountPointElement);
        mountPointElement.appendChild(clone)
      }
      return clone
    };

  self.get =get
  self.init = init;
  self.mountDOM = mountDOM;
  self.mount = mount;
  return self
}
