const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function recursivelyCopy(dir) {
  return { from: dir, to: dir, toType: 'dir' };
}

function copyStaticAssets() {
  return new CopyWebpackPlugin([
    recursivelyCopy('css'),
    recursivelyCopy('images'),
    recursivelyCopy('sprites'),
    recursivelyCopy('thirdparty'),
    'LICENSE',
    'COPYING',
  ]);
}

const path = require('path');

const OUTPUT_DIRECTORY = 'dist';

module.exports = {
  entry: './src/micropolis.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }]
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_DIRECTORY),
    filename: 'src/micropolis.js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '...'],
  },
  plugins: [
    new CleanWebpackPlugin(OUTPUT_DIRECTORY, {}),
    copyStaticAssets(),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      template: './index.html',
      filename: 'index.html'
    })
  ],
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  },
};
