'use strict'
const axios = require('axios')
const URL = require('url')


const {Source} = require('../model')

module.exports = {master}

async function master () {
  try {
    const sources = await Source.newsletters.find()
    let iterations = sources.length
    iterations = 1
    for (let i=0; i<iterations; i++) {
      const source = sources[i]
      const {perSource} = require('./perSource')
      const response = await perSource(source)
      console.log({response})
    }
  } catch(e) {
    console.log({e})
  }
  return
}
