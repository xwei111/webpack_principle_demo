const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname,  './dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
        //   {
        //     test: /\.js$/,
        //     use: ['./loader/warning.js']
        //   },
          {
            test: /\.js$/,
            use: {
                loader: './loader/warning.js',
                options: {
                    message: "There is ES6 syntax, pay attention to compatibility!!!"
                }
            }
          }
        ]
    }
};