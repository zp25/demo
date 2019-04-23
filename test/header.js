const { expect } = require('chai');
const header = require('../templates/header');

describe('header', () => {
  it('设置displayName属性', () => {
    expect(header.displayName).to.equal('header');
  });

  it('返回string', () => {
    expect(header()).to.be.a('string');
  });
});
