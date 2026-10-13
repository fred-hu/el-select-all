# el-select-all

[![pages-build-deployment](https://github.com/fred-hu/el-select-all/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/fred-hu/el-select-all/actions/workflows/pages/pages-build-deployment)

###### 描述:
> 带有全部选项的el-select组件

###### 使用:
>安装依赖包

```
npm i el-select-all
```
>main.js里引入

```
import ElSelectAll from 'el-select-all'
Vue.use(ElSelectAll)
```
>组件用例

```
<ElSelectAll v-model="storeCodes" filterable multiple collapse-tags @change="onChange" :withAll="false" :options="mdoptionsList" />

<ElSelectAll v-model="storeCodes" filterable multiple collapse-tags @change="onChange" :options="mdoptionsList" :props="{ label: 'deviceName', value: 'deviceNo' }" :selectAll="true" :withAll="true" :size="'mini'" style="width: 300px" />
```

###### 部分api:说明:
|  属性 | 说明  |
| :------------ | :------------ |
|  withAll |  是否默认显示全部选项 |
|  options | 选项列表  |
|  props |  自定义label和value的名称  |
| selectAll  | 是否默认选中全部  |
|  size | 指定尺寸  |


###### 预览地址:
> [https://fred-hu.github.io/el-select-all](https://fred-hu.github.io/el-select-all)

###### npm包地址:
> [el-select-all](https://www.npmjs.com/package/el-select-all)

###### 示例:
![示例](https://raw.githubusercontent.com/fred-hu/el-select-all/master/src/assets/elselect.png)
![示例](https://raw.githubusercontent.com/fred-hu/el-select-all/master/src/assets/elselect.gif)

###### 本地开发:

> 技术栈: Vue 2.6 + @vue/cli-service 4.5 (webpack 4) + Element UI 2.13

> 环境要求: Node 16（与 CI 保持一致），包管理器 pnpm 7（lockfile 为 pnpm-lock.yaml）

```
pnpm install        # 安装依赖
pnpm run serve      # 启动演示页 http://localhost:8080
pnpm run lint       # eslint 检查
pnpm run test       # 单元测试 (vitest, 用例在 tests/unit)
pnpm run build      # 构建演示站点到 dist/
pnpm run build:lib  # 构建发布用的库产物到 lib/ (commonjs + umd + umd.min)
```

> 目录说明

|  路径 | 说明  |
| :------------ | :------------ |
|  src/components/ElSelectAll.vue |  组件源码 |
|  src/libs/index.js |  插件入口 |
|  src/app.vue |  本地演示页 |
|  public/index.html |  演示页模板，挂载点 #el-select-all |
|  tests/unit |  单元测试用例 |
|  lib/ |  库构建产物（构建生成，不提交） |

> 分支约定: develop 用于开发，master 用于发布，改动通过 PR 合入 master

###### 发布:

**1. 演示站点（自动发布）**

> 合并到 master 前的校验由 [.github/workflows/ci.yml](https://github.com/fred-hu/el-select-all/blob/master/.github/workflows/ci.yml) 负责（仅 PR、目标是 master）：lint / 测试 / 构建，**不部署**

> push 到 master 由 [.github/workflows/deploy.yml](https://github.com/fred-hu/el-select-all/blob/master/.github/workflows/deploy.yml) 负责部署：

```
checkout -> pnpm 7.33.7 -> Node 16 -> pnpm install --frozen-lockfile
-> pnpm run lint -> pnpm run test -> pnpm run build:travis
-> peaceiris/actions-gh-pages (publish_dir: ./dist, force_orphan: true) 推送到 gh-pages 分支
```

> `build:travis` 会把 NODE_ENV 设为 travis，vue.config.js 中 publicPath 随之变为 /el-select-all/，因此站点地址为 [https://fred-hu.github.io/el-select-all](https://fred-hu.github.io/el-select-all)

> 注意: Actions 列表里的 Branch 列显示的是**触发提交所在的分支**，PR 校验会显示源分支（如 develop），但它只是校验，部署步骤已被 `if: github.ref == 'refs/heads/master'` 跳过

> 两个工作流都配置了 concurrency：PR 校验的新提交会取消旧的运行，部署则排队执行避免中断

**2. npm 包（自动发布）**

> 推送 `v*` 形式的 tag 会触发 [.github/workflows/publish.yml](https://github.com/fred-hu/el-select-all/blob/master/.github/workflows/publish.yml)，自动校验版本号、跑 lint/测试、构建 lib 并 `npm publish`：

```
# 1. 修改 package.json 中的 version，必须大于 npm 上已发布的最新版本
# 2. 提交后打 tag 并推送（tag 必须与 package.json 版本一致）
git commit -am "feat: vx.y.z"
git tag vx.y.z
git push origin master --tags
```

> 首次使用前需要在仓库 Settings → Secrets and variables → Actions 中配置 `NPM_TOKEN`，值为 npm 的 **Granular access token**（npm 自 2025-11 起已下线经典的 automation token）：登录 npmjs.com → 右上角头像 → **Access Tokens** → **Generate New Token** → 在 Packages and scopes 里给 `el-select-all` 授予 **Read and write**，并设置有效期 → 生成后复制（只显示一次）

> 也可以不依赖 token：改用 npm 的 **Trusted Publishing（OIDC）**，在 npm 包页面的 Settings → Trusted Publisher 绑定 GitHub 仓库与工作流文件名，工作流加 `permissions: id-token: write` 即可，且会自动生成 provenance（注意：新建的 Trusted Publisher 配置必须在 2 天内完成首次发布，否则失效）

> 工作流会在构建前先做三项校验，避免跑到最后才失败：`NPM_TOKEN` 是否已配置（未配置直接报错）、package.json 版本是否已存在于 npm（已存在直接报错）、tag 与版本号是否一致

> 也可以在 Actions 页面手动触发（workflow_dispatch）：此时会发布当前分支 package.json 里的版本，因此同样必须先提升 version；若该版本已存在于 npm 会被上述校验拦下

> 也可以本地发布：`pnpm login` 后执行 `pnpm publish`，`prepublishOnly` 会自动先构建 lib

> 发布内容由 package.json 的 files 字段决定（lib/*.js 与 src/components、src/libs），main 指向构建后的 `lib/el-select-all.common.js`，vue 与 element-ui 为 peerDependencies，需由使用方安装

###### 许可证:
> [MIT](./LICENSE)