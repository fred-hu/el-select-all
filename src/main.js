import Vue from 'vue'
import app from './app.vue'
import { Select, Option } from 'element-ui';
import ElSelectAll from './components/ElSelectAll.vue'
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(ElSelectAll.name, ElSelectAll);
Vue.config.productionTip = false
new Vue({
  render: h => h(app),
}).$mount('#el-select-all')
