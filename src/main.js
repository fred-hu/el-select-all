import Vue from 'vue'
import ElSelectAll from './app.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(ElSelectAll),
}).$mount('#el-select-all')
