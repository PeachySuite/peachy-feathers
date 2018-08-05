const clients = require('./clients/clients.service.js');
const employees = require('./employees/employees.service.js');
const visits = require('./visits/visits.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(clients);
  app.configure(employees);
  app.configure(visits);
};
