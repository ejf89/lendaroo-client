var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
       test: /\.(?:png|jpg|svg)$/,
       loader: 'url-loader',
       query: {
         // Inline images smaller than 10kb as data URIs
         limit: 10000
     }
   }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery', jQuery: 'jquery',
      Tether: 'tether', tether: 'tether'
    }),
  ]
};
