/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack base config
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ENV = process.env.NODE_ENV || "development";
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
// ant theme
const theme = require("../config/theme.json");

/**
 * px to rem
 */
const px2rem = require("postcss-pxtorem")({
  rootValue: 50,
  propList: [
    "font",
    "font-size",
    "width",
    "max-width",
    "height",
    "max-height",
    "padding",
    "margin",
    "line-height",
    "letter-spacing"
  ]
});

/**
 * post css loader
 */
const postcssLoader =
  ENV === "production"
    ? {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [
            require("postcss-preset-env")({
              flexbox: "no-2009"
            }),
            px2rem,
            require("cssnano")({
              preset: [
                "default",
                {
                  discardComments: {
                    removeAll: true
                  }
                }
              ]
            })
          ]
        }
      }
    : {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: [
            require("postcss-preset-env")({
              flexbox: "no-2009"
            }),
            px2rem
          ]
        }
      };

/**
 * css loader
 */
const cssLoader = [
  {
    // ant-design
    test: /\.less|css$/,
    include: [/node_modules/],
    use: [
      ENV !== "production"
        ? {
            loader: "style-loader"
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader",
        options: {
          importLoaders: 1
        }
      },
      postcssLoader,
      {
        loader: "less-loader",
        options: {
          modifyVars: theme,
          javascriptEnabled: true
        }
      }
    ]
  },
  {
    // common
    test: /\.scss|css$/,
    include: [
      // path.resolve(__dirname, "../", "src/components/"),
      path.resolve(__dirname, "../", "src/styles/")
    ],
    use: [
      ENV !== "production"
        ? {
            loader: "style-loader"
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader",
        options: {
          // modules: true
          importLoaders: 2
        } // translates CSS into CommonJS
      },
      postcssLoader,
      {
        loader: "sass-loader"
        // options: {
        //   javascriptEnabled: true
        // }
      }
    ]
  },
  {
    test: /\.scss$/,
    exclude: [
      /node_modules/,
      // path.resolve(__dirname, "../", "src/components/"),
      path.resolve(__dirname, "../", "src/styles/")
    ],
    use: [
      ENV !== "production"
        ? {
            loader: "style-loader"
          }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[local]-[hash:base64:5]" // css module
          }
        }
      },
      postcssLoader,
      {
        loader: "sass-loader"
        // options: {
        //   javascriptEnabled: true
        // }
      }
    ]
  }
];

module.exports = {
  mode: ENV,
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "js/[name].[hash:6].js",
    chunkFilename: "js/[name].[hash:6].js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      },
      ...cssLoader
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@config": path.resolve(__dirname, "../config/"),
      "@containers": path.resolve(__dirname, "../src/containers/"),
      "@components": path.resolve(__dirname, "../src/components/"),
      "@contexts": path.resolve(__dirname, "../src/contexts/"),
      "@styles": path.resolve(__dirname, "../src/styles/"),
      "@utils": path.resolve(__dirname, "../src/utils/"),
      "@image": path.resolve(__dirname, "../src/static/images/")
    },
    extensions: [".js", ".less", ".scss"]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // moment local
    // eslint-disable-next-line no-useless-escape
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|es-us/),
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ["**/*", "!dll/**"]
    }),
    new CopyPlugin([{ from: "src/json/", to: "json/" }]),
    new webpack.DllReferencePlugin({
      manifest: require("../dll/ui.manifest.json")
    }),
    new webpack.DllReferencePlugin({
      manifest: require("../dll/react.manifest.json")
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      title: "React",
      favicon: "./src/static/images/favicon.ico",
      inject: true,
      minify: ENV === "production" && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "../dll/*.dll.js"),
      outputPath: "js",
      publicPath: "js",
      hash: true,
      includeSourcemap: false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
      BUILD_VERSION: JSON.stringify(new Date().toString())
    })
  ]
};
