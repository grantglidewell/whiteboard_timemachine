const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const productionPluginDefine = process.env.NODE_ENV === 'production' ? [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.UglifyJsPlugin(),
] : [];

const babelPlugins = [
  'transform-class-properties',
  'transform-object-rest-spread',
  'emotion',
];

module.exports = [
  {
    entry: './src/server/index.js',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    externals: nodeExternals(),
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: ['/node_modules/'],
          query: {
            plugins: babelPlugins,
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env', {
                  modules: false,
                  targets: {
                    node: 'current',
                  },
                },
              ],
            ],
          },
        },
      ],
    },
  },
  {
    entry: './src/browser/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
    devtool: 'inline-source-map',
    plugins: productionPluginDefine,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: ['/node_modules/'],
          query: {
            plugins: babelPlugins,
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env', {
                  modules: false,
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                },
              ],
            ],
          },
        },
      ],
    },
  },
];
