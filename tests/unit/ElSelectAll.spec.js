import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ElSelectAll from '@/components/ElSelectAll.vue'

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
]

// el-select / el-option 依赖 element-ui，这里用桩组件，只验证组件自身逻辑
const stubs = {
  'el-select': { template: '<div class="el-select"><slot /></div>' },
  'el-option': { props: ['label', 'value'], template: '<div class="el-option">{{ label }}</div>' },
}

const createWrapper = propsData => mount(ElSelectAll, { propsData: { options, ...propsData }, stubs })

describe('ElSelectAll 选项列表', () => {
  it('withAll 默认插入「全部」选项', () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.mdoptionsList).toHaveLength(4)
    expect(wrapper.vm.mdoptionsList[0]).toEqual({ label: '全部', value: 'all' })
  })

  it('支持自定义 label/value 字段名', () => {
    const wrapper = createWrapper({
      options: [{ deviceName: '设备一', deviceNo: 'd1' }],
      props: { label: 'deviceName', value: 'deviceNo' },
    })
    expect(wrapper.vm.mdoptionsList[0]).toEqual({ deviceName: '全部', deviceNo: 'all' })
    expect(wrapper.vm.mdoptionsList[1]).toEqual({ deviceName: '设备一', deviceNo: 'd1' })
  })

  it('withAll=false 时不插入「全部」选项', () => {
    expect(createWrapper({ withAll: false }).vm.mdoptionsList).toHaveLength(3)
  })
})

describe('ElSelectAll 事件', () => {
  it('一次选择只抛出一次 input 和一次 change', async () => {
    const wrapper = createWrapper()
    const inputCount = wrapper.emitted('input').length
    const changeCount = wrapper.emitted('change') ? wrapper.emitted('change').length : 0

    // 真实链路: el-select 先通过 v-model 更新内部值, 再抛出 change
    wrapper.setData({ selected: ['a'] })
    await wrapper.vm.$nextTick()
    wrapper.vm.onChange(['a'])
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('input').length).toBe(inputCount + 1)
    expect(wrapper.emitted('change').length).toBe(changeCount + 1)
    expect(wrapper.emitted('input').pop()).toEqual([['a']])
    expect(wrapper.emitted('change').pop()).toEqual([['a']])
  })

  it('对外的值不包含内部哨兵值 all', async () => {
    const wrapper = createWrapper()
    wrapper.vm.onChange(['all'])
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected).toEqual(['all', 'a', 'b', 'c'])
    expect(wrapper.emitted('input').pop()).toEqual([['a', 'b', 'c']])
    expect(wrapper.emitted('change').pop()).toEqual([['a', 'b', 'c']])
  })

  it('取消「全部」后清空选择', async () => {
    const wrapper = createWrapper()
    wrapper.vm.onChange(['all'])
    await wrapper.vm.$nextTick()
    wrapper.vm.onChange([])
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected).toEqual([])
    expect(wrapper.emitted('input').pop()).toEqual([[]])
  })

  it('不会修改 el-select 传入的数组', async () => {
    const wrapper = createWrapper()
    wrapper.vm.onChange(['all'])
    await wrapper.vm.$nextTick()

    const incoming = ['all', 'a']
    wrapper.vm.onChange(incoming)
    await wrapper.vm.$nextTick()

    expect(incoming).toEqual(['all', 'a'])
  })

  it('selectAll=true 时挂载后默认全选', async () => {
    const wrapper = createWrapper({ selectAll: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected).toEqual(['all', 'a', 'b', 'c'])
    expect(wrapper.emitted('input').pop()).toEqual([['a', 'b', 'c']])
  })
})

describe('ElSelectAll v-model 同步', () => {
  it('父组件修改 value 时同步内部选中项', async () => {
    const wrapper = createWrapper({ value: ['a'] })
    expect(wrapper.vm.selected).toEqual(['a'])

    wrapper.setProps({ value: ['b', 'c'] })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.selected).toEqual(['b', 'c'])
  })

  it('value 与内部值一致时不重复抛出 input', async () => {
    const wrapper = createWrapper({ value: ['a'] })
    const inputCount = wrapper.emitted('input').length

    wrapper.setProps({ value: ['a'] })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('input').length).toBe(inputCount)
  })
})
