const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

console.log(isProd);

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./index.ts",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HTMLWebpackPlugin({
      template: "index.html",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "bundle.[hash].css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.ts$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
