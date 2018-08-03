const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//console.log(path.join(__dirname,"public"));
//-- __dirname - gives path to this file - /Users/marialepestana/Desktop/ReactCourse/IndecisionApp
// But it needs to be joined to the path from the public foler, because that's where we want to put our file

// Complete path: /Users/marialepestana/Desktop/ReactCourse/IndecisionApp/public 



// IN PACKAGE>JSON ADDED SOME THINGS< EXPLANATION:
// This is automatically set by Heroku (for production)
// For development --> the abscence of an environment variable will tell us it is development


process.env.NODE_ENV = process.env.NODE_ENV || "development";
// This is an environment variable that stores the environment you are currently in

if (process.env.NODE_ENV === "test") {
    require("dotenv").config({path: ".env.test"});
} else if (process.env.NODE_ENV === "development") {
    require("dotenv").config({path: ".env.development"});
}

module.exports = (env) => {

    const isProduction = env === "production";
    const CSSExtract = new ExtractTextPlugin("styles.css");

    return {
        entry: ["babel-polyfill","./src/app.js"],
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
            CSSExtract,
            new webpack.DefinePlugin({
                "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
                "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
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



// BABEL-POLYFILL --> allows my application to run in a wider range of browsers and browser versions
// BROWSERSTACK.COM --> allows to simulate my app on other browsers