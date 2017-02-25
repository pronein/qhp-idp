/*
  Copy this config file and rename to appropriate environment.
 */

module.exports = {
  log: {
    bunyan: {
      streams: [{
        level: 'error',
        stream: process.stdout
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