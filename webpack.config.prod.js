const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle_sizes.html",
      openAnalyzer: false
    })
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
});
