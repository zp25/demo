/**
 * link标签
 * @param {string} src - 路径
 * @return {string}
 */
const styleTag = src => `<link rel="stylesheet" href="${src}" media="all">`;
/**
 * script标签
 * @param {string} src - 路径
 * @return {string}
 */
const scriptTag = src => `<script type="text/javascript" src="${src}"></script>`;

/**
 * useref标签
 */
const userefTag = tag => (type, src, dest) => {
  let build = 'remove';
  if (type === 'style') {
    build = 'css';
  } else if (type === 'script') {
    build = 'js';
  }

  return `
    <!-- build:${build}${type === 'remove' ? '' : ` ${dest}`} -->
    ${tag(src)}
    <!-- endbuild -->
  `;
};

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
