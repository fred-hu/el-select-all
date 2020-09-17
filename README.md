# el-select-all
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
<ElSelectAll v-model="storeCodes" filterable multiple collapse-tags @change="onChange" :options="mdoptionsList" />
```
###### npm包地址:
> [https://www.npmjs.com/package/el-select-all](el-select-all)

###### 示例:
![示例](https://raw.githubusercontent.com/hufei1993/el-select-all/master/src/assets/elselect.png)
![示例](https://raw.githubusercontent.com/hufei1993/el-select-all/master/src/assets/elselect.gif)