const path = require('path');
const fs = require('fs');

/**
 * Creates a map of routes given a directory, common dependencies between routes and an object that holds configuration
 * for each individual route.
 * @param directory the directory to scan and require routes from.
 * @param dependencies the common dependencies between routes.
 * @param configMap the configuration map for each individual route. where key equals to route name without extension,
 * and the value equals to a configuration for the route.
 * @return {*}
 */
module.exports.buildControllers = (directory, dependencies = {}, configMap = {}) =>{
  const routePath = path.join(__dirname, directory);
  return fs.readdirSync(routePath)
    .map((routeName) => {
      const routeNameWithoutExtension = routeName.split('.').slice(0, -1).join('.');
      const config = Object.assign({}, dependencies, { config: configMap[routeNameWithoutExtension] });

      // create an object with the route name as the key, required and configured routes as value
      return { [routeNameWithoutExtension]: require(path.join(routePath, routeName))(config) };
    }).reduce((curr, single) => Object.assign(curr, single), {});
};
