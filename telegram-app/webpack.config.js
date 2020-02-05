require('dotenv').config();
var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var envs = {
  TELEGRAM_CLIENT_PROTOCOL: "'"+`${process.env.TELEGRAM_CLIENT_PROTOCOL}`+"'",
  TELEGRAM_CLIENT_CONTAINER: "'"+`${process.env.TELEGRAM_CLIENT_CONTAINER}`+"'",
  //APP_SERVER_PORT: "'"+`${process.env.APP_SERVER_PORT}`+"'",
  API: "'api'",
  APP_SERVER_PROTOCOL: "'"+`${process.env.APP_SERVER_PROTOCOL}`+"'",
  //APP_SERVER_ADDRESS: "'"+`${process.env.APP_SERVER_ADDRESS}`+"'",
  PROFILE_PHOTOS: "'"+`${process.env.PROFILE_PHOTOS}`+"'",
  PHOTOS: "'"+`${process.env.PHOTOS}`+"'",
  VIDEOS: "'"+`${process.env.VIDEOS}`+"'",
  ANIMATIONS: "'"+`${process.env.ANIMATIONS}`+"'",
  THUMBNAILS: "'"+`${process.env.THUMBNAILS}`+"'",
  FETCHED_MESSAGES_CNT: "'"+`${process.env.FETCHED_MESSAGES_CNT}`+"'",
  INITIAL_FETCHED_MESSAGES_CNT: "'"+`${process.env.INITIAL_FETCHED_MESSAGES_CNT}`+"'",
  TELEGRAM_USERNAME_MIN_LENGTH: "'"+`${process.env.TELEGRAM_USERNAME_MIN_LENGTH}`+"'",
  TELEGRAM_REGULAR_SEARCH_MATCH_PATTERN: "'"+`${process.env.TELEGRAM_REGULAR_SEARCH_MATCH_PATTERN}`+"'",
  TELEGRAM_USERNAME_SEARCH_MATCH_PATTERN: "'"+`${process.env.TELEGRAM_USERNAME_SEARCH_MATCH_PATTERN}`+"'",
  TELEGRAM_USERNAME_ROUTE_MATCH_PATTERN: "'"+`${process.env.TELEGRAM_USERNAME_ROUTE_MATCH_PATTERN}`+"'",
  FOUNDED_CHAT_MEMBERCOUNT_FOR_PROCESSING: "'"+`${process.env.FOUNDED_CHAT_MEMBERCOUNT_FOR_PROCESSING}`+"'",
  FOUNDED_CHAT_MEMBERCOUNT_FOR_ADD_TO_RECENTLYFOUND: "'"+`${process.env.FOUNDED_CHAT_MEMBERCOUNT_FOR_ADD_TO_RECENTLYFOUND}`+"'",
  FOUNDED_CHAT_MEMBERCOUNT_FOR_ADD_TO_CHATSLIST: "'"+`${process.env.FOUNDED_CHAT_MEMBERCOUNT_FOR_ADD_TO_CHATSLIST}`+"'",
  MAX_MSG_FETCHES_QUANTITY_CHATS_LIST_CHATS: "'"+`${process.env.MAX_MSG_FETCHES_QUANTITY_CHATS_LIST_CHATS}`+"'",
  MAX_MSG_FETCHES_QUANTITY_RECENTLY_FOUND_CHATS: "'"+`${process.env.MAX_MSG_FETCHES_QUANTITY_RECENTLY_FOUND_CHATS}`+"'",
  MAX_MSG_FETCHES_QUANTITY_OTHER_CHATS: "'"+`${process.env.MAX_MSG_FETCHES_QUANTITY_OTHER_CHATS}`+"'",
  ONLY_LOCAL_MSG_FETCH_CHATS_LIST_CHATS: "'"+`${process.env.ONLY_LOCAL_MSG_FETCH_CHATS_LIST_CHATS}`+"'",
  ONLY_LOCAL_MSG_FETCH_RECENTLY_FOUND_CHATS: "'"+`${process.env.ONLY_LOCAL_MSG_FETCH_RECENTLY_FOUND_CHATS}`+"'",
  ONLY_LOCAL_MSG_FETCH_RECENTLY_OTHER_CHATS: "'"+`${process.env.ONLY_LOCAL_MSG_FETCH_RECENTLY_OTHER_CHATS}`+"'",
}
module.exports = {
  //entry: './src/main.js',
  mode: process.env.NODE_ENV,
  //mode: 'development',

  output: {
    path: path.join(__dirname, 'dist')
  //  publicPath: '/dist/',
  //  filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve('./src/assets/sass'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  /*resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },*/
  //devtool: '#eval-source-map'
  plugins: [
    // make sure to include the plugin for the magic

    new VueLoaderPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        APP_SERVER_ADDRESS: "'"+`${process.env.APP_SERVER_ADDRESS}`+"'",
        ...envs
      }
    }),
/*    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),*/
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
  module.exports.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}
if (process.env.NODE_ENV === 'development') {

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        //APP_SERVER_PORT: "'"+`${process.env.APP_SERVER_PORT}`+"'",
        //APP_SERVER_ADDRESS: "'"+`${process.env.APP_SERVER_DEV_ADDRESS}`+"'",
        APP_SERVER_ADDRESS: "'"+`${process.env.APP_SERVER_ADDRESS}`+"'",
        ...envs
      }
    })

  ])
}
