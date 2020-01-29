const {Source} = require('../model')
module.exports = {move}
async function move () {
  const find = {'boolean_settings.is_archive': true}
  const backups = await Source.backups.find(find)
  // 
  let iterations = backups.length
  // iterations = 1
  for (let i=0; i<iterations; i++) {
    const item = backups[i]
    try {
      // console.log({item})
      const {processed_archive_urls} = item.process_flags

      const newProcessFlags = {
        archive: processed_archive_urls
      }
      item.process_flags = newProcessFlags 
      const {channel_url} = item
      const options = {upsert: true, new: true}
      const source = await Source.newsletters.findOneAndUpdate({channel_url}, item, options)
      // console.log({source})
    } catch(e) {
      console.log({e})
    }
  }
  
  // console.log(backups.length)
}