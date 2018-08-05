const clients = require('./clients/clients.service.js');
const staff = require('./staff/staff.service.js');
const testvisits = require('./testvisits/testvisits.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(clients);
  app.configure(staff);
  app.configure(testvisits);
};
