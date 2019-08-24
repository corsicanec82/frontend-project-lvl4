// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        faker: {
          test: /[\\/]node_modules[\\/](faker)[\\/]/,
          name: 'faker',
          chunks: 'all',
        },
      },
    },
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new CompressionPlugin(),
  //   new BundleAnalyzerPlugin(),
  ],
};
