require('app-module-path').addPath(require('app-root-path').toString());

const {asClass, Lifetime} = require('awilix');

const AlarmService = require('src/components/alarms/AlarmService');

/**
 * Load and register services to ioc container
 * @param {object} container Awilix container instance
 */
const initializeServices = (container) => {
  [
    AlarmService
  ].forEach((service) => {
    container.register(service.name, asClass(service, {
      lifetime: Lifetime.SINGLETON,
    }));
    console.log(`[App] Service started: ${service.name}`);
  });
};

module.exports = initializeServices;
