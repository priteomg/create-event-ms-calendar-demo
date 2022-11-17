/** @type {import('next').NextConfig} */

const withAntdLess = require("next-plugin-antd-less");
// const withLess = require("next-with-less");

module.exports = withAntdLess({
  reactStrictMode: true,
  swcMinify: true,

  env: {
    apiUrl: process.env.API_URL,
  },
  reactStrictMode: false,
  // lessVarsFilePathAppendToEndOfContent: true,
  lessLoaderOptions: {
    // relativeUrls: false,
  },
  cssLoaderOptions: {
    url: false,
  },
  webpack(config) {
    return config;
  },
});
