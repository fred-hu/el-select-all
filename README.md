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

部分api:说明:
withAll: 是否默认显示全部选项
options：选项列表
props：自定义label和value的名称
selectAll：是否默认选中全部
size：指定尺寸
```

###### 预览地址:
> [https://fred-hu.github.io/el-select-all](https://fred-hu.github.io/el-select-all)

###### npm包地址:
> [el-select-all](https://www.npmjs.com/package/el-select-all)

###### 示例:
![示例](https://raw.githubusercontent.com/fred-hu/el-select-all/master/src/assets/elselect.png)
![示例](https://raw.githubusercontent.com/fred-hu/el-select-all/master/src/assets/elselect.gif)