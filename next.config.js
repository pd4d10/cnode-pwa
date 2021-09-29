// @ts-check

/** @type {import('next').NextConfig} */
const config = {
  // experimental: { swcLoader: true },
}

module.exports = require('next-transpile-modules')(['antd-mobile'])(config)
