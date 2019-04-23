const should = require('chai').should();
const link = require('../templates/link');

describe('link', () => {
  it('设置displayName属性', () => {
    link.displayName.should.equal('link');
  });

  it('若未传入参数，返回空string', () => {
    link().should.equal('');
  });

  it('返回string', () => {
    link([]).should.be.a('string');
  });
});
