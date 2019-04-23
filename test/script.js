const { expect } = require('chai');
const script = require('../templates/script');

describe('script', () => {
  it('返回正确的object结构', () => {
    const result = script();

    expect(result.name).to.equal('script');
    expect(result).to.has.property('content');
  });
});
