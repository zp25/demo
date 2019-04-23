const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const style = require('../templates/style');

chai.use(chaiAsPromised);
const should = chai.should();

describe('style', () => {
  it('设置displayName属性', () => {
    style.displayName.should.equal('style');
  });

  it('若未传入参数，返回空string', () => {
    style().should.equal('');
  });

  it('返回Promise，不存在文件reject', () => {
    style('empty').should.eventually.rejected;
  });
});
