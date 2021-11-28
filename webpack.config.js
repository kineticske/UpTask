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