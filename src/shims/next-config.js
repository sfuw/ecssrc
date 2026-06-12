const getConfig = () => ({
  publicRuntimeConfig: {
    backend: {
      baseUrl: '',
      apiFormat: 'https://{0}.roblox.com{1}',
      proxyEnabled: true,
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
});

export default getConfig;
