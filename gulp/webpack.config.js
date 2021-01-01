"use strict";

const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
import config from "./config.js";

import minimist from "minimist";
let envOption = {
  string: "env",
  default: { env: process.env.NODE_ENV || "dev" }, // NODE_ENVに指定がなければ開発モードをデフォルトにする
};
const options = minimist(process.argv.slice(2), envOption);
const isProduction = options.env === "production" ? true : false;

const src = path.resolve(__dirname, config.src);
console.log(src);
let webpackConfig = {
  entry: {},

  output: {
    path: path.join(__dirname, "/js"),
    filename: "[name]",
  },

  resolve: {
    extensions: [".js"],
    // 使用したいコントロールやレンダラを定義しておきます。(下記は一例です。使用しないものは除いておいてよいです)
    alias: {},
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      ie: 11,
                    },
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: "/js/vendor.js",
      chunks: "initial",
    },
  },
};

glob
  .sync("**/*.js", {
    cwd: config.src,
    ignore: "**/_*.js",
  })
  .forEach((name) => {
    webpackConfig.entry[name] = path.resolve(config.src, name);
  });

if (isProduction) {
  // JS圧縮
  webpackConfig.mode = "production";
} else {
  webpackConfig.devtool = "source-map";
  webpackConfig.cache = true;
  webpackConfig.mode = "development";
}

module.exports = webpackConfig;
