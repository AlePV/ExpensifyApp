const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
//console.log(path.join(__dirname,"public"));
//-- __dirname - gives path to this file - /Users/marialepestana/Desktop/ReactCourse/IndecisionApp
// But it needs to be joined to the path from the public foler, because that's where we want to put our file

// Complete path: /Users/marialepestana/Desktop/ReactCourse/IndecisionApp/public 

module.exports = (env) => {

    const isProduction = env === "production";
    const CSSExtract = new ExtractTextPlugin("styles.css");

    return {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname,"public","dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/, // makes the s optional
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }) 
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname,"public"),
            historyApiFallback: true,
            publicPath: "/dist/"
        }
    }
};

// LOADER = way to define how a file is transformed when Webpack uses it
// ^^ ex: use babel to transform JSX to JS


// Chacks if file loaded ends in js:: /\.js$/

// DEVTOOL : controls how source maps are generated