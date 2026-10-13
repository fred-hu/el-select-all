<template>
  <el-select v-model="selected" multiple v-bind="$attrs" v-on="$listenersAll" @change="onChange" :size="size">
    <el-option v-for="item in mdoptionsList" :key="item[props.value]" :label="item[props.label]" :value="item[props.value]" />
  </el-select>
</template>

<script>
const ALL_VALUE = 'all'

export default {
  name: 'ElSelectAll',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
    withAll: {
      type: Boolean,
      default: true,
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'value' }
      },
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  data() {
    return {
      selected: (this.value || []).slice(),
      mdoptionsValue: [],
      oldMdoptionsValue: [],
      mdoptionsList: [],
      lastEmitted: null,
    }
  },
  computed: {
    // 透传给 el-select 的其他监听器，input/change 由组件自己统一抛出，避免重复触发
    $listenersAll() {
      const listeners = {}
      for (const name of Object.keys(this.$listeners)) {
        if (name !== 'input' && name !== 'change') listeners[name] = this.$listeners[name]
      }
      return listeners
    },
    selectedValues() {
      return (this.selected || []).filter(v => {
        return v !== ALL_VALUE
      })
    },
  },
  watch: {
    selected: {
      immediate: true,
      deep: true,
      handler() {
        this.emitInput()
      },
    },
    value: {
      deep: true,
      handler(val) {
        this.syncFromValue(val)
      },
    },
    options: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val || val.length === 0) {
          this.mdoptionsList = []
        } else {
          this.mdoptionsList = this.withAll
            ? [
                {
                  [this.props.value]: ALL_VALUE,
                  [this.props.label]: '全部',
                },
                ...val,
              ]
            : [...val]
        }
      },
    },
  },
  mounted() {
    if (this.selectAll) {
      this.selected = []
      for (const item of this.mdoptionsList) {
        this.selected.push(item[this.props.value])
      }
      this.oldMdoptionsValue[1] = this.selected
      this.emitInput()
    }
  },
  methods: {
    emitInput() {
      const values = this.selectedValues
      if (this.isSameValues(values, this.lastEmitted)) return
      this.lastEmitted = values.slice()
      this.$emit('input', values)
    },
    // 父组件程序化修改 v-model 时，把值同步回内部状态
    syncFromValue(val) {
      const next = (val || []).slice()
      if (this.isSameValues(this.selectedValues, next)) return
      this.selected = next
      this.oldMdoptionsValue[1] = this.selected
      this.lastEmitted = next.slice()
    },
    isSameValues(a, b) {
      if (!b || a.length !== b.length) return false
      const rest = b.slice()
      return a.every(v => {
        const index = rest.indexOf(v)
        if (index === -1) return false
        rest.splice(index, 1)
        return true
      })
    },
    onChange(rawVal) {
      const val = (rawVal || []).slice()
      const allValues = []
      // 保留所有值
      for (const item of this.mdoptionsList) {
        allValues.push(item[this.props.value])
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldMdoptionsValue.length === 1 ? [] : this.oldMdoptionsValue[1] || []
      // 若是全部选择
      if (val.includes(ALL_VALUE)) this.selected = allValues
      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes(ALL_VALUE) && !val.includes(ALL_VALUE)) this.selected = []
      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes(ALL_VALUE) && val.includes(ALL_VALUE)) {
        const index = val.indexOf(ALL_VALUE)
        val.splice(index, 1) // 排除全选选项
        this.selected = val
      }
      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes(ALL_VALUE) && !val.includes(ALL_VALUE)) {
        if (val.length === allValues.length - 1) this.selected = (this.withAll ? [ALL_VALUE] : []).concat(val)
      }
      // 储存当前最后的结果 作为下次的老数据
      this.oldMdoptionsValue[1] = this.selected
      this.emitInput()
      this.$emit('change', this.selectedValues)
    },
  },
}
</script>
