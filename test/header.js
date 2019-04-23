const should = require('chai').should();
const header = require('../templates/header');

describe('header', () => {
  it('设置displayName属性', () => {
    header.displayName.should.equal('header');
  });

  it('返回string', () => {
    header().should.be.a('string');
  });
});
