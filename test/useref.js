const { expect } = require('chai');
const useref = require('../templates/useref');

describe('useref', () => {
  it('返回正确的object结构', () => {
    const result = useref();

    expect(result.name).to.equal('useref');
    expect(result).to.has.property('content');
  });
});
