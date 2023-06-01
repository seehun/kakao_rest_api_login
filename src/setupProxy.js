const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://kapi.kakao.com',
      changeOrigin: true,
    })
  );
};
