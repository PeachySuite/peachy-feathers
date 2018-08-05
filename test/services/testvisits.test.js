const assert = require('assert');
const app = require('../../src/app');

describe('\'testvisits\' service', () => {
  it('registered the service', () => {
    const service = app.service('testvisits');

    assert.ok(service, 'Registered the service');
  });
});
