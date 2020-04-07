// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'

import { formBaseComponents } from '@/plugins'

import { shallowMount, mount } from '@vue/test-utils'
import ApiTextField from '../ApiTextField.vue'
import ApiWrapper from '../ApiWrapper'

jest.mock('lodash')
const { cloneDeep } = jest.requireActual('lodash')

jest.useFakeTimers()
Vue.use(Vuetify)
Vue.use(formBaseComponents)

let vuetify

// config factory
function createConfig (overrides) {
  const mocks = {
    api: {
      patch: () => Promise.resolve()
    }
  }
  const propsData = {
    value: 'Test Value',
    fieldname: 'test-field',
    uri: 'test-field/123',
    label: 'Test Field'
  }
  const stubs = {
    ApiWrapper
  }
  return cloneDeep(Object.assign({ mocks, propsData, stubs, vuetify }, overrides))
}

describe('ApiTextField.vue', () => {
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  // keep this the first test --> otherwise element IDs change constantly
  test('renders correctly', () => {
    const config = createConfig()
    const wrapper = shallowMount(ApiTextField, config)

    expect(wrapper.element).toMatchSnapshot()
  })

  test('input change triggers api.patch call and status update', async () => {
    const config = createConfig()
    const patchSpy = jest.spyOn(config.mocks.api, 'patch')
    const wrapper = mount(ApiTextField, config)

    const newValue = 'new value'

    // contains 1 e-text-field
    expect(wrapper.find({ name: 'ETextField' }).exists()).toBe(true)

    wrapper.find('input').setValue(newValue)

    // resolve lodash debounced
    jest.runAllTimers()

    expect(patchSpy).toBeCalledTimes(1)
    expect(patchSpy).toBeCalledWith(config.propsData.uri, { [config.propsData.fieldname]: newValue })

    // wait for patch Promise to resolve
    await flushPromises()

    // expect(statusIcon.status).toBe('success')

    // wait for success icon to vanish
    jest.runAllTimers()
    await wrapper.vm.$nextTick()

    // expect(statusIcon.status).toBe('init')
  })
})
