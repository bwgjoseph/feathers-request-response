import assert from 'assert';
import app from '../../src/app';

describe('\'comment\' service', () => {
  it('registered the service', () => {
    const service = app.service('comment');

    assert.ok(service, 'Registered the service');
  });
});
