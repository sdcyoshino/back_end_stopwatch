require('app-module-path').addPath(require('app-root-path').toString());

const {asClass, Lifetime} = require('awilix');

const AlarmRepository = require('src/components/alarms/AlarmRepository');

/**
 * Load and register repositories to ioc container
 * @param {object} container Awilix container instance
 */
const initializeRepositories = (container) => {
  [
    AlarmRepository,
  ].forEach((service) => {
    container.register(service.name, asClass(service, {
      lifetime: Lifetime.SINGLETON,
    }));
    console.log(`[App] Repository started: ${service.name}`);
  });
};

module.exports = initializeRepositories;
