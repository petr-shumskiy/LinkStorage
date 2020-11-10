module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  style: {
    modules: {
      localIdentName: ''
    },
    css: {
      loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions }
    },
    sass: {
      loaderOptions: (sassLoaderOptions, { env, paths }) => { return sassLoaderOptions }
    },
    postcss: {
      mode: 'extends' /* (default value) */ || 'file',
      plugins: [],
      env: {
        autoprefixer: { /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */ },
        stage: 3, /* Any valid stages: https://cssdb.org/#staging-process. */
        features: { /* Any CSS features: https://preset-env.cssdb.org/features. */ }
      },
      loaderOptions: (postcssLoaderOptions, { env, paths }) => { return postcssLoaderOptions }
    }
  },
  eslint: {
    enable: false /* (default value) */,
    mode: 'extends' /* (default value) */ || 'file',
    configure: (eslintConfig, { env, paths }) => { return eslintConfig },
    loaderOptions: (eslintOptions, { env, paths }) => { return eslintOptions }
  },
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions }
  },
  typescript: {
    enableTypeChecking: true /* (default value)  */
  },
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => { return webpackConfig }
  },
  jest: {
    babel: {
      addPresets: true, /* (default value) */
      addPlugins: true /* (default value) */
    },
    configure: (jestConfig, { env, paths, resolve, rootDir }) => { return jestConfig }
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => { return devServerConfig },
  plugins: [
    {
      plugin: {
        overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => { return cracoConfig },
        overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => { return webpackConfig },
        overrideDevServerConfig: ({ devServerConfig, cracoConfig, pluginOptions, context: { env, paths, proxy, allowedHost } }) => { return devServerConfig },
        overrideJestConfig: ({ jestConfig, cracoConfig, pluginOptions, context: { env, paths, resolve, rootDir } }) => { return jestConfig }
      },
      options: {}
    }
  ]
}
