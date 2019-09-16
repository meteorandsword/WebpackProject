var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIBS = [
    "faker",
    "lodash",
    "react",
    "react-dom",
    "react-input-range",
    "react-redux",
    "react-router",
    "redux",
    "redux-form",
    "redux-thunk"
]

module.exports = {
  entry: {
      bundle: './src/index.js',
      vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
      rules: [
          {
            use: 'babel-loader',
            test: /\.js$/,
            // do not apply this rule to /node_modules /
            exclude: /node_modules/
          },
          {
              use: ['style-loader', 'css-loader'],
              test: /\.css$/
          }
      ]
  },
  plugins: [
      // compare the common part between bundle.js and vendor.js and
      // put common part into vendor.js
      new webpack.optimize.CommonsChunkPlugin({
          // 'manifest' the file name hash will change only content update
          names: ['vendor', 'manifest']
      }),
      // use the 'src/index.html' as template, create an new index.html include
      // all necessary script in dist folder
      new HtmlWebpackPlugin({
          template: 'src/index.html'
      }),
      // set environment variable
       new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
       })
  ]
};
