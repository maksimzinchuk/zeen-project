const fs = require('fs')

module.exports = {
  syntax: 'postcss-scss',
  parser: 'postcss-scss',
  plugins: [
    require('postcss-easy-import')({
      extensions: '.scss',
    }),
    require('autoprefixer')({
      cascade: false,
    }),
    require('postcss-nested'),
    require('postcss-rgb'),
    require('postcss-inline-svg')({
      removeFill: true,
      path: './src/images/icons',
    }),
    require('cssnano'),
    // require("postcss-move-media"),
  ],
}
