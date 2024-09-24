module.exports = {
    // Other Next.js config options...
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
    // output: 'export',
    assetPrefix: '',
    trailingSlash: true,
  };

