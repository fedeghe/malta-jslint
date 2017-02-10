This plugin can be used on: **.js** files and even on **.coffee** and **.ts** files after using the right plugin

Options : all options of the [jslint package](http://jslint.com/help.html)

Sample usage:  
```
malta app/source/index.js public/js -plugins=malta-jslint[node:false,browser:false]
```
or in the .json file :
```
"app/source/index.js" : "public/js -plugins=malta-jslint[node:false,browser:false]",
"app/source/index.ts" : "public/js -plugins=malta-typescript...malta-jslint[node:false,browser:false]"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.js',
    'public/js',
    '-plugins=malta-jslint[node:false,browser:false]',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```