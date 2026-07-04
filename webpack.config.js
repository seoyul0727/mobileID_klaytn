const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },

  plugins: [
    new webpack.DefinePlugin({
      DEPLOYED_ADDRESS: JSON.stringify(
        fs.readFileSync("deployedAddress", "utf8").trim()
      ),
      DEPLOYED_ABI:
        fs.existsSync("deployedABI") &&
        fs.readFileSync("deployedABI", "utf8")
    }),

    new CopyWebpackPlugin([
      {
        from: "./src/index.html",
        to: "index.html"
      },
      {
        from: "./src/css",
        to: "css"
      }
    ])
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    compress: true,
    port: 8080
  }
};
