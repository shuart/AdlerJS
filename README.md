# AdlerJS

Adler is a simple HTML composable element system

## Installation

Add a script tag in your HTML file

```js
import createAdler from "./vendor/adler.js";

```
## Usage

Create a template to be loaded in your main HTML document

```js
var button =createAdler({
    content: p => `<button class="action1 adlerButton">${p.test} world</button><p class="action2">${p.test2} here</p>`,
    params:{
        data:{
            test:"Hello",
            test2:"click",
        },
        on:[
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ]
    },
    css:`
        .adlerButton {
            background-color: blue;
            padding: 5px;
            border: none;
            color: white;
            margin: 3px;
        }
    `,
})
button.mount()

```


Components can be used in other Adler components as such

```js
var hw =createAdler({
    content: p => `
        <p class="action1">${p.test} world</p>
        <p class="action2">hoover area</p>
        <div a-if="seen" adler="button" class="myAdlerButton"></div>
        <div data-test="ola" a-sync="test2:testSync" adler="button" class="myAdlerButton"></div>
        <div>A list comes here</div>
        <div>
            <div a-for="list" adler="button" class="myAdlerlist"></div>
        </div>
        <div>A controlable element comes here</div>
        <div>
            <div a-id="controlable" adler="button" class="myAdlerlist"></div>
        </div>
        <div>mount area comes here</div>
        <div>
            <div a-slot="mountPoint"></div>
        </div>
        `
        ,
    params:{
        data:{
            test:"Hello",
            testSync:"push",
            seen:true,
            list:[{test:"un"}, {test:"deux"}, {test:"trois"} ]
        },
        on:[
            [".action1","click", (event, data)=> alert("test "+ data.test)],
            [".action2","click", (event, data, instance)=> instance.setData({test:"barr"}) ],
        ]
    },
    components:{
        button: button
    }
})
hw.mount()
```

You can access a specific node by tagging it with a specific ID and using the following methods

```js
console.log(hw.getNodes());
hw.getNodes().controlable.setData({test:"desdkosefsmelfesml"})
hw.getNodes().controlable.getData({test:"desdkosefsmelfesml"})

hw.setData({test:"foo", seen:false})

```

You can create mount points (slots) in the templates to dynamicaly mount another component and prevent it to be discarded on reload and upadates

```js
hw.append(button.instance(),"mountPoint")
hw.clearSlot("mountPoint") //removing

```

## Roadmap to 0.3

- [ ] Add check and error message during import process.
- [ ] Clean unused code
