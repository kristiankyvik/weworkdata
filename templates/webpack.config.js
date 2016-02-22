module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: '/static/js/index.js'
  },
  devServer: {
    inline: true,
    port: 3335
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ["syntax-class-properties", "transform-class-properties"],
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
