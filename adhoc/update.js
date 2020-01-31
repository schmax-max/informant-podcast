'use strict'
const {Source} = require('../model')
module.exports = update


async function update () {
  console.log('in update')
  // console.log({Source})
  for (const type in Source) {
    
    const options = {upsert: true, new: true}
    const updates = await Source[type].updateMany({}, { $rename: { 'boolean_settings': 'boolean' }}, options)
  }
}