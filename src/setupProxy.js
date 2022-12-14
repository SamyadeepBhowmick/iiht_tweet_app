const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api1', {
      //target: 'http://localhost:8082', // API endpoint 1
      target: 'http://ec2-35-165-117-49.us-west-2.compute.amazonaws.com:8082',
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/api2', {
      //target: 'http://localhost:8083', // API endpoint 2
      target: 'http://ec2-35-165-117-49.us-west-2.compute.amazonaws.com:8083',
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
}
