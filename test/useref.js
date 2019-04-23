const should = require('chai').should();
const useref = require('../templates/useref');

describe('useref', () => {
  it('返回正确的object结构', () => {
    const result = useref();

    result.name.should.equal('useref');
    result.should.has.property('content');
  });
});
