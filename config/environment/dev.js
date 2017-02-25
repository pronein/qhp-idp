module.exports = {
  log: {
    bunyan: {
      streams: [{
        level: 'debug',
        stream: process.stdout
      }]
    },
    morgan: {
      format: 'dev',
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