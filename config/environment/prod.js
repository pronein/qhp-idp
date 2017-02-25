module.exports = {
  log: {
    bunyan: {
      streams: [{
        level: 'warn',
        stream: process.stdout
      }, {
        level: 'error',
        stream: process.stderr
      }, {
        level: 'info',
        path: '/var/log/qhp-idp.log'
      }]
    },
    morgan: {
      format: 'combined',
      skip: false
    }
  },
  server: {
    swagger: {
      port: 10010
    },
    port: 3000
  }
};