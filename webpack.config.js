const path = require("path");



//console.log(path.join(__dirname,"public"));
//-- __dirname - gives path to this file - /Users/marialepestana/Desktop/ReactCourse/IndecisionApp
// But it needs to be joined to the path from the public foler, because that's where we want to put our file

// Complete path: /Users/marialepestana/Desktop/ReactCourse/IndecisionApp/public 

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname,"public"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/, // makes the s optional
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname,"public"),
        historyApiFallback: true
    }
};

// LOADER = way to define how a file is transformed when Webpack uses it
// ^^ ex: use babel to transform JSX to JS


// Chacks if file loaded ends in js:: /\.js$/

// DEVTOOL : controls how source maps are generated