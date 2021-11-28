const path = require('path');
const webpack = require('webpack');

module.exports={
    entry: './public/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './public/dist') //generate a dist folder
    },
    module: {
        rules: [{
            test: /\.m?js$/, // what file are you going to use (files with js extension - a regular expressions)
            use:{
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}

//don't forget install babel-loader

/** 
Babel is a tool that allows us to transform our last generation JS code (or with extra functionalities) to a Javascript code that any browser or Node.js version 
(or with extra functionalities) to a Javascript code that any browser or Node.js version can understand. 
can understand.
Babel works through plugins so we can tell it what we want it to transform,
*/

//don't forget to write npm run wath in cmd terminal before write configuration for concurrently

// don't forget this:

/*** package.json 
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "development":"nodemon ./index.js",
    "start": "concurrently \"npm run development\" \"npm run watch\" ",
    "watch": "webpack --watch --mode development"
},
***/

//then you must install axios   npm install  --save axios sweetalert2

/** SWEET ALERT
A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, 
ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES
 */