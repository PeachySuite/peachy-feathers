const assert = require('assert');
const app = require('../../src/app');

describe('\'caregivers\' service', () => {
  it('registered the service', () => {
    const service = app.service('caregivers');

    assert.ok(service, 'Registered the service');
  });
});
