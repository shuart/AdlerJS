# AdlerJS

Adler is a simple HTML composable element system

## Installation

Add a script tag in your HTML file

```
import createAdler from "./vendor/adler.js";

```
## Usage

Create a template to be loaded in your main HTML document

```
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

## Roadmap to 0.2

- [ ] Add check and error message during import process.
- [ ] Clean unused code
