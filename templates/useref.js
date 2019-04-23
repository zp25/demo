const {
  styleTag,
  scriptTag,
  userefTag,
} = require('./tags');

/**
 * useref标签
 * @param {string} type - 标签类型，包括style, script
 * @return {TypedObject}
 */
const useref = (type) => {
  /**
   * 第三方样式
   * @param {Array.<Object>} param - 信息
   */
  const style = (param) => {
    if (!param) {
      return '';
    }

    return param.filter(d => d.type === 'style').reduce((prev, d) => {
      const {
        remove,
        type: tagType,
        src,
        dest,
      } = d;

      return prev + userefTag(styleTag)(remove ? 'remove' : tagType, src, dest);
    }, '');
  };

  /**
   * 第三方脚本
   * @param {Array.<Object>} param - 信息
   */
  const script = (param) => {
    if (!param) {
      return '';
    }

    return param.filter(d => d.type === 'script').reduce((prev, d) => {
      const {
        remove,
        type: tagType,
        src,
        dest,
      } = d;

      return prev + userefTag(scriptTag)(remove ? 'remove' : tagType, src, dest);
    }, '');
  };

  // 选取
  let content = script;
  if (type === 'style') {
    content = style;
  }

  return {
    name: 'useref',
    content,
  };
};

module.exports = useref;
