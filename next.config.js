const withTM = require('next-transpile-modules')([
  '@ionic/react',
  '@ionic/core',
  '@stencil/core',
  'ionicons',
  '@awesome-cordova-plugins/nfc'

])

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    unoptimized: true
  },


}

module.exports = withTM(nextConfig)
