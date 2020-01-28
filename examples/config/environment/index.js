const path = require('path')
const os = require('os')
require('dotenv').config()

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV || 'development',
  // Server port
  port: process.env.PORT || 3000,
  host: process.env.HOST,
  // Server IP
  ip: process.env.IP || '0.0.0.0',
  db: {
    dialect: 'postgres',
    username: process.env.DBUSER,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    operatorsAliases: false,
    host: process.env.DBHOST || '127.0.0.1',
    logging: val => console.log(val),
    define: {
      timestamps: true
    },
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
    },
    use_env_variable: 'DBHOST',
    dialectOptions: {
      ssl: true
    }
  },
  pgboss: {
    subscribersPath: process.env.SUBSCRIBERS_PATH || './src/subscribers'
  }
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  delete all.db.dialectOptions
}
// Export the config object based on the NODE_ENV
// ==============================================
/* eslint-disable */
const mod = require(`./${process.env.NODE_ENV}.js`) || {}
/* eslint-enable */

const result = { ...all, ...mod }

module.exports = result
