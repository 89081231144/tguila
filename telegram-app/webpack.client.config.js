const webpack = require('webpack')
//require("babel-polyfill");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
//const path = require('path');

//modules = path.resolve(__dirname, 'node_modules');

module.exports = merge(baseConfig,{

  entry: './src/entry-client.js',

  plugins: [
        new VueSSRClientPlugin(),
        //new BundleAnalyzerPlugin({analyzerHost:'0.0.0.0',statsFilename: 'stats.json',generateStatsFile: true})
  ],
  node: {
  fs: 'empty',
  module: 'empty',
  /*
  Webpack 2/3 will attempt to parse any and all ES dynamic import() / CommonJS require() calls present in input files. When the Webpack build is has target: web, neither module nor fs will be available, hence the require calls for each of these will fail to resolve and Webpack will fail the build.
  To work around this, you can set node.fs and node.module both to "empty" in your Webpack configuration, e.g:
  */

  },
  output: {
    //filename: "[name].[chunkhash].bundle.js",
    filename: "[name].client.bundle.js",
    //path: __dirname + "/dist"

  },
/*  resolve: {
    modules: [ modules ],
    extensions: [ '.js', ],
},*/
  optimization: {
  splitChunks: {
    name: "manifest",
    minChunks: Infinity,
    chunks: "all",
    minSize: 0

  }}
})
