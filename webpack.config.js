const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: {
      main: path.resolve(__dirname, './src/index.jsx'),
   },
   output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' ?  'eval-cheap-module-source-map' : 'source-map',
  devServer: {
    historyApiFallback: true,
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `Igor's MyWallet`,
      template: path.resolve(__dirname, './src/html/template.html'), // template file
      filename: 'index.html', // output file
    }),
    new CleanWebpackPlugin()
    // new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        },
        {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
        },
        {
            test: /\.(scss|css)$/,
            use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
}