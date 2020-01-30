'use strict'
const axios = require('axios')
const URL = require('url')

const {Source} = require('../model')

module.exports = {master}

async function master (body = {}) {
  const {type} = body
  perType(type)
}

async function perType (type = 'publishers') {
  try {
    const find = {'boolean_settings.is_ineffective': false}
    const sources = await Source[type].find()
    let iterations = sources.length
    iterations = 1
    for (let i=0; i<iterations; i++) {
      const source = sources[i]
      const {perSource} = require('./perSource')
      await perSource(source, type)
    }
  } catch(e) {
    console.log({e})
  }
  return
}
