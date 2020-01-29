const moment = require('moment-timezone')
const {getApiResponse} = require ('./processLinks')
const {postData} = require('../config')


module.exports = {getLatest}

async function getLatest (source) {
  const {channel_url} = source
  const apiResponse = await getApiResponse (channel_url)
  const archiveLinkChunks = getArchiveLinkChunks (apiResponse)
  const archiveLinks = await getArchiveLinks (archiveLinkChunks, source)
  if (!archiveLinkChunks) {
      console.log(`no archive link chunks for ${channel_url}`)
  }
  if (!archiveLinks) {
      console.log(`no archive links for ${channel_url}`)
  }

  return identifyLatestUnprocessed (source, archiveLinks)
}

function getArchiveLinkChunks (apiResponse) {
  apiResponse = apiResponse.replace(/\\/g, "")

  const newLinkIndicators = [
      'campaign">', // Mailchimp
      '<option value="', // DenseDiscovery
      '<h2 class="post_title">', // getPocket
      '<div class="loop-meta">',  // nowiknow weekender
      '"message-date">', // Alexis Madrigal
      'class="entry-title-link" rel="bookmark" href="', // RibbonFarm
      '<a title="nathan.ai newsletter', // nathan.ai
      `<li class="item">`, // ai weekly
      `<td>`, // inside
      '<p class="newsletter-date">', // nextdraft
  ]

  const regExNewLink = new RegExp(newLinkIndicators.join('|'))

  let linkChunks = apiResponse.split(regExNewLink)
  linkChunks.shift()
  return linkChunks
}

async function getArchiveLinks (archiveLinkChunks, source) {
  const {channel_url} = source

  const {
      archive_prepend_slug, 
      archive_identifier_slug
  } = source.curator_archive_input

  let linkArray = []
  
  for (let i=0; i<archiveLinkChunks.length; i++) {
      const item = archiveLinkChunks[i]
      let {date, url} = await getDateAndUrl (channel_url, item)

      if (archive_prepend_slug && !url.includes('http')) {
          url = `${archive_prepend_slug}${url}`
      }

      let includesArchive = true
      if (archive_identifier_slug) {
          includesArchive = url.includes(archive_identifier_slug)
      }

      if (url.includes('http') && includesArchive) {
          const linkObject = {
              archive_url: url,
              archive_date: date
          }
          linkArray.push(linkObject)
      }
  }
      
  if (linkArray.length === 0) {
      const errorData = {channel_url, archive_identifier_slug}
      if (archiveLinkChunks.length > 0) {
          console.log(`no archiveLinks, but link chunks ${errorData}`)
      } else {
          console.log(`no archiveLinks and no link chunks ${errorData}`)
      }

  }


  return linkArray
}

async function getDateAndUrl (channel_url, item) {
  const itemArray = item.split('"')

  let date = item.substring(0, 10)
  date = moment(date, 'MM/DD/YYYY').toISOString()
  let url = itemArray[1]
  let fetchDate = false

  if (channel_url.includes('densediscovery.com')) {
      url = itemArray[0]
  } else if (channel_url.includes('nowiknow.com')) {
      url = itemArray[3]
      date = itemArray[6].split('</')[0]
      date = date.split('>')[1]
      fetchDate = true
  } else if (channel_url.includes('tinyletter.com')) {
      url = itemArray[3]
      date = itemArray[0].split('</')[0]
      fetchDate = true
  } else if (channel_url.includes('ribbonfarm.com')) {
      url = itemArray[0]
      date = itemArray[6]
      fetchDate = true
  } else if (channel_url.includes('getrevue.co')) {
      url = itemArray[6]
      date = itemArray[7].split(`datetime='`)[1]
      if (date) {
          date = date.split(`'>`)[0]
          fetchDate = true
      } else {
          date = null
      }
  } else if (channel_url.includes('aiweekly.co/issues')) {
      date = itemArray[10].split(`datetime='`)[1]
      if (date) {
          date = date.split(`'>`)[0]
          fetchDate = true
      } else {
          date = null
      }
  } else if (channel_url.includes('ribbonfarm.com')) {
      url = itemArray[0]
      date = itemArray[6]
      fetchDate = true
  }

  if (fetchDate) {
      date = await postData ('helper-date', {date, url})
  }
  return {date, url}
}

function identifyLatestUnprocessed (source, archiveLinks) {
  let response
  let processedUrls = []
  if (source && source.process_flags && source.process_flags.processed_archive_urls) {
      processedUrls = source.process_flags.processed_archive_urls.map((k) => { return k.archive_url })
  }

  const newLinks = archiveLinks.reduce((newArray, item) => {
      if (newArray.length === 0) {
          // console.log('here?')
          if (processedUrls.indexOf(item.archive_url) === -1) {
              response = item
              newArray.push(item.archive_url) // to only get one url
          }
      }
      return newArray
  }, [])

  if (
      archiveLinks.length > 0
      && newLinks.length === 0
  ) {
      console.log(`all links already processed for ${source.channel_url}`)
      response = 'completed'
  }

  return response
}
