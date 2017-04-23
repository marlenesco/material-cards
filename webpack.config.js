const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLinterPlugin = require('stylelint-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';

const path = require('path');
const extractCss = new ExtractTextPlugin(
  {
    filename: 'material-cards-auto-height.css',
    disable: nodeEnv === 'development'
  });
const linter = new StyleLinterPlugin({show: true});

module.exports = {
  devtool: 'source-map',
  entry: {
    file: './app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundler.js'
  },
  module: {
    rules: [
      {
        test: /\.less/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: extractCss.extract({
          use: [
            {
              loader: 'css-loader',  // translates CSS into CommonJS
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                includePaths: [path.resolve(__dirname, 'less')]
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractCss,
    linter
  ]
};
