const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const path = require("path");
module.exports = {
  webpack: {
    configure: {
      target: "electron-renderer"
    }
    // alias: {
    //   '@components': path.resolve(__dirname, "src/components/"),
    //   '@images': path.resolve(__dirname, "src/assets/images/")
    // }
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));
          return webpackConfig;
        }
      },
    }
  ]
}