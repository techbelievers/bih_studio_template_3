const nextConfig = {
  webpack: (config ) => {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: [
            // Other plugins...
            // Ignore testing files during build
            ['module-resolver', {
              exclude: ['**/*.test.js', '**/*.spec.js', '**/setupTests.js'],
            }],
          ],
        },
      },
    });
    // if (!isServer) {
    //   config.output.filename = 'static/chunks/pages/properties/[property_slug]_[contenthash].js';
    //   config.output.chunkFilename = 'static/chunks/pages/properties/[property_slug]_[contenthash].js';
    // }
    return config;
  },
  // assetPrefix: '',
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    workerThreads: false,
    reactRoot: true,
    cpus: 1, // Limit to 2 CPUs
  },
  swcMinify: false,

  // Remove invalid middleware config here
};

// Export the Next.js configuration
module.exports = nextConfig;


