# Changelog

本项目自 0.5.0 起记录变更，更早的版本可查看 git 提交记录。

## [0.5.0] - 2026-10-13

### 修复

- 一次交互不再重复抛出 `input` / `change` 事件：原先 el-select 的监听器转发、`onChange` 与 `selected` 的 watcher 会各抛一次，现统一为单一出口并按值去重
- 父组件程序化修改 `v-model` 时，组件内部选中项会同步更新（原先只在初始化时读取一次 `value`，导致表单重置、异步回填、联动场景失效）
- `onChange` 不再就地修改 el-select 传入的数组

### 变更

- 入口改为构建产物：`main` 指向 `lib/el-select-all.common.js`，`unpkg` / `jsdelivr` 指向 `lib/el-select-all.umd.min.js`，此前 `main` 指向源码，需由使用方自行编译
- `vue` 与 `element-ui` 调整为 `peerDependencies`，由使用方各自安装；`core-js` polyfill 已内联进产物
- 发布内容由 package.json 的 `files` 明确限定，包体积约 662 kB 降至约 55 kB
- 移除与 pnpm 并存的 package-lock.json，lockfile 统一为 pnpm-lock.yaml（与 CI 使用的 pnpm 7 保持一致）

### 新增

- 单元测试（vitest + @vue/test-utils），CI 中启用 lint 与测试
- npm 自动发布工作流：推送 `v*` tag 触发，发布前校验 NPM_TOKEN 与版本是否已存在于 npm
- MIT LICENSE
