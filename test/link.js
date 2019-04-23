const { expect } = require('chai');
const link = require('../templates/link');

describe('link', () => {
  it('设置displayName属性', () => {
    expect(link.displayName).to.equal('link');
  });

  it('若未传入参数，返回空string', () => {
    expect(link()).to.equal('');
  });

  it('返回string', () => {
    expect(link([])).to.be.a('string');
  });
});
