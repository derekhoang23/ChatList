const path = require('path');

module.exports = [
  {
    name: 'chat',
    entry: [path.resolve(__dirname, 'client', 'src', 'components', 'App.jsx'), 'whatwg-fetch'],
    output: {
      path: __dirname + '/client/dist',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          include: /client/,
          loaders: ['react-hot', 'babel']
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass'
        }
      ]
    }
  }
];
