<template>
  <div id="el-select-all">
    {{ storeCodes }}
    <ElSelectAll v-model="storeCodes" filterable multiple collapse-tags @change="onChange" :options="mdoptionsList" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      storeCodes: ['test'],
      mdoptionsList: [{
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
    }
  }
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
