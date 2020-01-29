const moment = require ('moment-timezone')
module.exports = {updateSource}

function updateSource (source, response) {
  updateProcessedArchive (source, response)
  updatePreviousPull (source, response)
  source.markModified('process_flags')
  return source.save((error, updatedSource) => {
      if (error) {
          return
      } else {
          return
      }
  })

}

function updatePreviousPull (source, response) {
  let error = true
  if (response) {
      error = false
  }
  const {links} = response
  if (links && links.length) {
    links_count = links.length
  }
  const date = moment().tz('America/Chicago').toISOString()

  source.process_flags.previous_pull = {
    date,
    links,
    links_count,
    error 
  }
}

function updateProcessedArchive (source, {archive_url, archive_date}) {
  let shouldUpdate = false
  if (!source.process_flags.processed_archive_urls) {
    source.process_flags.processed_archive_urls = []
  }
  if (
      archive_url 
      && source && source.boolean_settings && source.boolean_settings.is_archive
      && shouldUpdate
  ) {
      source.process_flags.processed_archive_urls.push({archive_url, archive_date})
  }
}
