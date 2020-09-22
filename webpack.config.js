const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = (env, argv) => {
  const isProductionBuild = argv.mode === 'production'
  const publicPath = '/zeen-project/'

  const pcss = {
    test: /\.(p|s|)css$/,
    use: [
      isProductionBuild ? MiniCssExtractPlugin.loader : 'vue-style-loader',
      'css-loader',
      'postcss-loader',
      {
        loader: 'group-css-media-queries-loader',
        options: {
          sourceMap: true,
        },
      },
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        // Apply the JSON importer via sass-loader's options.
        options: {
          sourceMap: true,
        },
      },
    ],
  }

  const vue = {
    test: /\.vue$/,
    loader: 'vue-loader',
  }

  const js = {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  }

  const files = {
    test: /\.(svg|png|jpe?g|gif|woff2?)$/i,
    loader: 'file-loader',
    exclude: [
      path.resolve(__dirname, 'src/images/icons'),
      path.resolve(__dirname, 'src/styles/fonts'),
    ],
    options: {
      name: '[hash].[ext]',
      outputPath: 'images/',
    },
  }

  const svg = {
    test: /\.svg$/,
    include: [path.resolve(__dirname, 'src/images/icons')],
    exclude: [path.resolve(__dirname, 'src/styles/fonts')],
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`,
        },
      },
      'svg-transform-loader',
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            {removeTitle: true},
            {
              removeAttrs: {
                attrs: '(fill|stroke)',
              },
            },
          ],
        },
      },
    ],
  }

  const staticFiles = {
    test: /\.(html|txt|svg|png|jpe?g|gif|woff2?)$/i,
    loader: 'file-loader',
    include: [path.resolve(__dirname, 'src/static')],
    options: {
      name: '[name].[ext]',
      outputPath: 'static/',
    },
  }

  const pug = {
    test: /\.pug$/,
    oneOf: [
      {
        resourceQuery: /^\?vue/,
        use: ['pug-plain-loader'],
      },
      {
        use: ['pug-loader'],
      },
    ],
  }

  const fonts = {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    include: [path.resolve(__dirname, 'src/styles/fonts')],
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          esModule: false,
        },
      },
    ],
  }

  const config = {
    entry: {
      main: ['./src/main.js', './src/styles/main.pcss'],
    },
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: '[name].[hash].build.js',
      publicPath: isProductionBuild ? publicPath : '/',
      chunkFilename: '[chunkhash].js',
    },
    module: {
      rules: [pcss, vue, js, files, svg, pug, fonts, staticFiles],
    },
    resolve: {
      alias: {
        styles: path.resolve(__dirname, 'src/styles'),
        vue$: 'vue/dist/vue.esm.js',
        images: path.resolve(__dirname, 'src/images'),
      },
      extensions: ['*', '.js', '.vue', '.json', '.scss', '.css'],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist/'),
      historyApiFallback: true,
      noInfo: false,
      overlay: true,
    },
    performance: {
      hints: false,
    },
    plugins: [
      new FaviconsWebpackPlugin({
        logo: './src/images/favicon.svg',
        prefix: 'favicon/',
        inject: true,
        favicons: {
          background: '#FEE600',
          theme_color: '#FEE600',
          icons: {
            coast: false,
            yandex: true,
          },
        },
      }),
      new CopyPlugin({
        patterns: [{from: 'src/images', to: './images'}],
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new SpriteLoaderPlugin({plainSprite: true}),
      new VueLoaderPlugin(),
    ],
    devtool: '#eval-source-map',
  }

  if (isProductionBuild) {
    config.devtool = 'none'
    config.plugins = (config.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[contenthash].css',
      }),
    ])

    config.optimization = {}

    config.optimization.minimizer = [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ]
  }

  return config
}
