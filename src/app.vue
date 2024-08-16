<template>
  <div id="el-select-all">
    <div>
      <ElSelectAll v-model="storeCodes" filterable multiple collapse-tags @change="onChange" :options="mdoptionsList" :props="{ label: 'deviceName', value: 'deviceNo' }" :selectAll="true" :withAll="true" :size="'mini'" style="width: 300px" />
    {{ storeCodes }}
    </div>
    <div>
      <ElSelectAll v-model="storeCodes2" filterable multiple collapse-tags @change="onChange2" :options="mdoptionsList2" :selectAll="false" :withAll="true" :size="'mini'" style="width: 300px" />
    {{ storeCodes2 }}
    </div>
  </div>
</template>
<script>
import ElSelectAll from '@/components/ElSelectAll.vue'
export default {
  name: 'App',
  components: { ElSelectAll },
  data() {
    return {
      storeCodes: ['testdeviceNo'],
      storeCodes2: ['test'],
      mdoptionsList: [
        {
          deviceNo: 'testdeviceNo',
          deviceName: 'testdeviceName',
        },
        {
          deviceNo: 'test2deviceNo',
          deviceName: 'test2deviceName',
        },
        {
          deviceNo: 'test3deviceNo',
          deviceName: 'test3deviceName',
        },
      ],
      mdoptionsList2: [{
        key: 'test',
        value: 'test',
        label: 'test'
      }, {
        key: 'test2',
        value: 'test2',
        label: 'test2'
      }, {
        key: 'test3',
        value: 'test3',
        label: 'test3'
      }],
    }
  },
  methods: {
    onChange(val) {
      console.log(val)
      console.log(this.storeCodes)
    },
    onChange2(val) {
      console.log(val)
    },
  },
}
</script>

<style>
#el-select-all {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}
</style>
