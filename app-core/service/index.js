
const _ = require('lodash')
const daos = require('../dao');
const { logger } = require('../../app-common');

let names = [
  'ExpendituretypeService',
  'ExpenditureService',
  'ExpenseService',
  'UsersService'
]

let instances = {}

module.exports = names.reduce((m, name) => {
  m.__defineGetter__(_.camelCase(name), () => {
    if (instances[name]) {
      console.log('re-use an instance of', name)
      return instances[name]
    } else {
      console.log('create new instance of', name)
      let c = { [name]: require('./' + name) }
      return instances[name] = new c[name](logger, daos)
    }
  })
  return m
}, {})
