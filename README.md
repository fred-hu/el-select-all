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

> 环境要求: Node 16（与 CI 保持一致），包管理器 pnpm 7（仓库同时提供 pnpm-lock.yaml 与 package-lock.json）

```
pnpm install        # 或 npm install
pnpm run serve      # 启动演示页 http://localhost:8080
pnpm run lint       # eslint 检查
pnpm run build      # 构建到 dist/
```

> 目录说明

|  路径 | 说明  |
| :------------ | :------------ |
|  src/components/ElSelectAll.vue |  组件源码 |
|  src/libs/index.js |  插件入口（main 字段指向此文件） |
|  src/app.vue |  本地演示页 |
|  public/index.html |  演示页模板，挂载点 #el-select-all |

> 分支约定: develop 用于开发，master 用于发布，改动通过 PR 合入 master

###### 发布:

**1. 演示站点（自动发布）**

> 向 master 推送或提交 PR 会触发 [.github/workflows/deploy.yml](https://github.com/fred-hu/el-select-all/blob/master/.github/workflows/deploy.yml)：

```
checkout -> Node 16 -> pnpm 7 -> pnpm install -> pnpm run build:travis
-> actions/upload-pages-artifact (path: ./dist)
-> peaceiris/actions-gh-pages (publish_dir: ./dist, force_orphan: true) 推送到 gh-pages 分支
```

> `build:travis` 会把 NODE_ENV 设为 travis，vue.config.js 中 publicPath 随之变为 /el-select-all/，因此站点地址为 [https://fred-hu.github.io/el-select-all](https://fred-hu.github.io/el-select-all)

**2. npm 包（手动发布）**

> 仓库未配置 npm 发布的 CI，需要本地手动执行（需拥有 npm 账号权限）：

```
# 1. 修改 package.json 中的 version，必须大于 npm 上已发布的最新版本
pnpm run lint
# 2. 提交并打 tag
git commit -am "feat: vx.y.z"
git tag vx.y.z
git push origin master --tags
# 3. 登录并发布
npm login
npm publish
```

> 注意: 未配置 .npmignore 与 files 字段，npm 会按 .gitignore 过滤，因此发布内容为 src、README.md、package.json（不含 dist、node_modules）；package 的 main 指向 ./src/libs/index.js，即发布的为源码，需由使用方的 vue-loader 编译