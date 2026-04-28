const defaultConfig = require('./default');
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = require(`./${environment}`);

module.exports = {
  ...defaultConfig,
  ...environmentConfig,
  environment
};
