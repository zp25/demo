const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const style = require('../templates/style');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('style', () => {
  it('设置displayName属性', () => {
    expect(style.displayName).to.equal('style');
  });

  it('若未传入参数，返回空string', () => {
    expect(style()).to.equal('');
  });

  it('返回Promise，不存在文件reject', () => (
    expect(style('empty')).to.eventually.be.rejected
  ));
});
