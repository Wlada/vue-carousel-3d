'use strict'

const Vue = require('vue')

/** call vm.nextTick() as a Promise */
function nextTick () {
    return new Promise((resolve) => {
        Vue.nextTick(() => resolve())
    })
}

/** call vm.nextTick() and check the snapshot as a Promise */
async function expectToMatchSnapshot (vm, element) {
    await nextTick()
    expect((element || vm.$el).innerHTML).toMatchSnapshot()
}

exports.expectToMatchSnapshot = expectToMatchSnapshot
