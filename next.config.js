const nextConfig = {
  webpack: (config) => {
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
    return config;
  },
  assetPrefix: '',
  trailingSlash: true,
  experimental: {
    workerThreads: false,
    cpus: 2, // Limit to 2 CPUs
  },

  // Remove invalid middleware config here
};

// Export the Next.js configuration
module.exports = nextConfig;

// next.config.js
module.exports = {
  // Other Next.js config options...
  async middleware() {
    return ['/']; // Specify the paths for which the middleware should run
  },
};

