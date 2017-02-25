module.exports = {
  log: {
    bunyan: {
      streams: [{
        level: 'warn',
        stream: process.stdout
      }]
    },
    morgan: {
      format: 'dev',
      skip: true
    }
  },
  server: {
    swagger: {
      port: 10010
    },
    port: 3000
  }
};