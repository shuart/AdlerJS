# AdlerJS

Adler is a simple HTML include system

## Installation

Add a script tag in your HTML file

```
<script src="../src/adler.js"></script>

```
## Usage

Create a template to be loaded in your main HTML document in a "tmpl" folder in the root file.
The html document must start with a template tag containing on or more other template tag to be loaded.

Their ID must match the structure "tmpl-[name of the HTML file]"
The file name must match "view.[custom name].html"(i.e. here the HTML file would be name "view.exemple.html")

```
<template>
  <template id="tmpl-exemple">
    <div  class="imported">
      <h2>imported with Adler</h2>
    </div>
  </template>
</template>

```
Add div tags with a classname "adlerInclude", and a data-adler-source tag matching the name of the html file to be included.

```
<!-- Include html from a file with the folowing div element -->
<div class="adlerInclude" data-adler-source="exemple" id="exemple-mount-point"></div>

```

Load adler and trigger the tag detection in your js file

```
var adler = ADLER.createAdlerObject();
adler.init({filepath:'./tmpl/view.'});

adler.mountDOM({
  callBack:function () {
    //trigger a call back when DOM is loaded
    console.log("callBack triggered");
  }
});

```

## Roadmap to 0.2

- [ ] Add check and error message during import process.
- [ ] Clean unused code
- [ ] Add simple mount commande for reusing template in code
