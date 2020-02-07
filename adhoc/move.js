const {Source} = require('../model')
module.exports = {move}
const urls = [
  
]

async function move () {
  const find = {
    // 'source_url': {$in: urls}
    // 'boolean_settings.is_archive': {$ne: true},
    // 'boolean_settings.is_aggregator': true,
    // 'filtering.beginning_identifier': {$eq: ''}
  }


  
  const backups = await Source.others.find(find)
  // 
  let iterations = backups.length
  // console.log({iterations})
  // iterations = 1
  for (let i=0; i<iterations; i++) {
    const item = backups[i]
    try {
      // console.log({item})
      // const {processed_archive_urls} = item.process_flags

      // const newProcessFlags = {
      //   archive: processed_archive_urls
      // }
      item.process_flags = {} 
      const {source_url} = item
      const options = {upsert: true, new: true}
      // const source = await Source.photos.findOneAndUpdate({source_url}, item, options)
      // console.log({source})
    } catch(e) {
      console.log({e})
    }
  }
  
  // console.log(backups.length)
}