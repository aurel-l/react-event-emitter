const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist', 'cjs'),
    filename: 'index.js',
    library: 'EventEmitter',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDom',
      root: 'ReactDom',
    },
  },
};
