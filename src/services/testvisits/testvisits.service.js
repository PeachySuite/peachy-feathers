// Initializes the `testvisits` service on path `/testvisits`
const createService = require('feathers-mongoose');
const createModel = require('../../models/testvisits.model');
const hooks = require('./testvisits.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/testvisits', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('testvisits');

  service.hooks(hooks);
};
