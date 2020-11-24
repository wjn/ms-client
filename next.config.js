module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // These components were keeping things from building. This insures that
      // they are only called when on the server (instead of the browser)
      config.node = {
        net: 'empty',
        fs: 'empty',
        tls: 'empty',
      };
    }

    return config;
  },
};
