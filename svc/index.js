'use strict'
const Joi = require('@hapi/joi');

const {validateReq} = require('./validateReq')
const {Source} = require('../model')

module.exports = {master, commander}

async function master (req = {}) {
  console.log('starting master')
  if (validateReq (req)) {
    return await commander(req.params)
  } else {
    return
  }
  
}

async function commander ({type}) {
  // console.log('starting commander')
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
