const path = require('path');
const webpack =require('webpack');
module.exports = {
    entry: {
        index: "./js/index"
    },
    output: {
        filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [path.resolve(__dirname,"node_modules")],
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    }
};
