const config = {
  publicRuntimeConfig: {
    backend: {
      baseUrl: '',
      apiFormat: 'https://{0}.roblox.com{1}',
      proxyEnabled: true,
      authorization: '',
      authorizationHeader: 'authorization',
      flags: {
        clientSideRenderingEnabled: false,
        requireLoginThroughCookie: true,
        showTicketBalace: false,
      },
    },
  },
  serverRuntimeConfig: {
    backend: {
      authorization: '',
      authorizationHeader: 'authorization',
    },
  },
};

export default config;
