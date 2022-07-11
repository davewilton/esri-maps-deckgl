/*
 * Copyright 2020 Google LLC

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *  https://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path')
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const fileLoader = require("file-loader");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CONFIG = {
  mode: 'development',
  entry: {
    app: ['./src/app.ts', './src/styles/style.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'src')
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'ArcGIS API  for JavaScript',
      template: './src/index.html',
      filename: './index.html',
      chunksSortMode: 'none',
      inlineSource: '.(css)$'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].css"
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/static', to: "static" }
      ]
    })
  ]
};

module.exports = CONFIG;
