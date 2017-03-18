// https://github.com/jeffposnick/create-react-pwa/compare/c-r-a-0.6.0...c-r-pwa-0.6.0
module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/manifest.json',
    'build/static/**/!(*map*)',
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js',
}
