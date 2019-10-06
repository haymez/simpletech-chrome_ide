const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    background: path.join(__dirname, './src/background'),
    content_script: path.join(__dirname, './src/content_script'),
    popup: path.join(__dirname, './src/popup'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['dist/*'] }),
    new CopyWebpackPlugin(
      [{ from: 'src/assets', to: 'assets' }, 'manifest.json'],
      {
        copyUnmodified: true,
      },
    ),
    new HtmlWebpackPlugin({
      title: 'Chrome IDE',
      template: 'src/html/popup.ejs',
      chunks: ['popup'],
      filename: 'popup.html',
    }),
  ],
}
