import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Vue from 'vue'
import BeeUI from '../../lib'
import { BeeButton, BeeDialog, BeeIcon, delay } from './_components'

describe('bee-dialog', () => {
  Vue.use(BeeUI)

  it('default', () => {
    const dialog = shallowMount(BeeDialog)
    expect(dialog.props('value')).to.eq(false)
    expect(dialog.props('title')).to.eq('提示')
    expect(dialog.props('width')).to.eq('500px')
    expect(dialog.props('closeVisible')).to.ok
    expect(dialog.props('cancelVisible')).to.ok
    expect(dialog.props('confirmVisible')).to.ok
    expect(dialog.props('cancelText')).to.eq('取消')
    expect(dialog.props('confirmText')).to.eq('确定')
    expect(dialog.props('sync')).to.ok
    expect(dialog.props('stopPenetrate')).not.ok
  })

  it('v-model', async () => {
    const dialog = shallowMount(BeeDialog)

    dialog.setProps({value: true})
    await delay(300)
    expect(dialog.isEmpty()).not.ok

    dialog.setProps({value: false})
    await delay(300)
    expect(dialog.isEmpty()).to.ok
  })

  it('props.title', () => {
    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true,
        title: 'this is test title'
      }
    })

    expect(dialog.find('.bee-dialog--title').text()).to.contain('this is test title')
  })

  it('props.width', () => {
    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true,
        width: '50%'
      }
    })

    expect(dialog.find('.bee-dialog--panel').attributes('style')).to.contain('width: 50%;')
  })

  it('props.closeVisible', () => {
    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true,
        closeVisible: false
      }
    })

    expect(dialog.find('.bee-dialog--close').exists()).not.ok
  })

  it('props.cancelVisible', () => {
    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true,
        cancelVisible: false
      }
    })

    expect(dialog.find('.bee-dialog--btn__cancel').exists()).not.ok
  })

  it('props.confirmVisible', () => {
    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true,
        confirmVisible: false
      }
    })

    expect(dialog.find('.bee-dialog--btn__confirm').exists()).not.ok
  })

  it('props.cancelText', () => {
    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true,
        cancelText: 'text content'
      }
    })

    expect(dialog.find('.bee-dialog--btn__cancel').text()).to.contain('text content')
  })

  it('props.confirmText', () => {
    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true,
        confirmText: 'text content'
      }
    })

    expect(dialog.find('.bee-dialog--btn__confirm').text()).to.contain('text content')
  })

  it('props.sync', (done) => {
    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true,
        sync: false,
      },
      stubs: {
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      listeners: {
        input: (value) => {
          dialog.setProps({
            value: value
          })
        },
        confirm: async (hide) => {
          await delay(500)
          hide()
        }
      }
    })

    dialog.find('.bee-dialog--btn__confirm').trigger('click')

    setTimeout(() => {
      expect(dialog.isEmpty()).not.ok
    }, 300)

    setTimeout(() => {
      expect(dialog.isEmpty()).to.ok
      done()
    }, 1000)
  })

  it('event.close', async () => {
    let count = 0

    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true
      },
      stubs: {
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      listeners: {
        close: () => {
          count += 1
        }
      }
    })

    await delay(300)
    dialog.find('.bee-dialog--close').trigger('click')
    expect(count).to.eq(1)
  })

  it('event.cancel', async () => {
    let count = 0

    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true
      },
      stubs: {
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      listeners: {
        cancel: () => {
          count += 1
        }
      }
    })

    await delay(300)
    dialog.find('.bee-dialog--btn__cancel').trigger('click')
    expect(count).to.eq(1)
  })

  it('event.confirm', async () => {
    let count = 0

    const dialog = shallowMount(BeeDialog, {
      propsData: {
        value: true
      },
      stubs: {
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      listeners: {
        confirm: () => {
          count += 1
        }
      }
    })

    await delay(300)
    dialog.find('.bee-dialog--btn__confirm').trigger('click')
    expect(count).to.eq(1)
  })
})