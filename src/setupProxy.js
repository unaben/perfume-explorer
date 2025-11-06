const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://perfumexplorer.bellefriends.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};