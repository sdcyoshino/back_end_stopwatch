require('app-module-path').addPath(require('app-root-path').toString());

const {asValue} = require('awilix');

const initializeServices = require('./Services');
const initializeRepositories = require('./Repositories');

module.exports = (container) => {
  initializeRepositories(container);
  initializeServices(container);
};
