const should = require('chai').should();
const script = require('../templates/script');

describe('script', () => {
  it('返回正确的object结构', () => {
    const result = script();

    result.name.should.equal('script');
    result.should.has.property('content');
  });
});
