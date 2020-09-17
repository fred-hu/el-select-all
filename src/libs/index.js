/* eslint-disable no-undef */
// eslint-disable-next-line no-extra-semi
import elSelectAll from '../components/ElSelectAll.vue'
elSelectAll.install = function (Vue) {
  // // 1. 添加全局方法或 property
  // Vue.myGlobalMethod = function () {
  // }
  // // 2. 添加全局资源
  // Vue.directive('my-directive', {
  //   bind (el, binding, vnode, oldVnode) {
  //   }
  // })

  // // 3. 注入组件选项
  // Vue.mixin({
  //   created: function () {
  //   }
  // })

  // // 4. 添加实例方法
  // Vue.prototype.$myMethod = function (methodOptions) {
  // }
  Vue.component(elSelectAll.name,elSelectAll)
}
export default elSelectAll
