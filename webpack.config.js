const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV || 'development';


module.exports = {
  entry: {
    experiment: './src/js/main-experiment.js',
    mask: './src/js/main-mask.js',
  },
  mode: env,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['experiment'],
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/mask.html',
      filename: 'mask.html',
      chunks: ['mask'],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'web',
  devtool: (env === 'development') ? 'inline-source-map' : false,
  devServer: {
    contentBase: './dist',
  },
};
