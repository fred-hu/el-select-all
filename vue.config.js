module.exports = {
  publicPath: process.env.NODE_ENV === 'travis'
    ? '/el-select-all/'
    : '/',
  configureWebpack: {
    // 让库构建(main/umd)直接导出组件本身, 而不是 ESM 命名空间
    output: {
      libraryExport: 'default',
    },
  },
}