const path = require('path')
const Autoloader = require('@specla/autoloader')

module.exports = (subscribersPath, opts = {}) => {
  const modules = new Autoloader(path.resolve(subscribersPath))

  return modules
}