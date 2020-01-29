const moment = require('moment-timezone')
const unfluff = require ('unfluff')
const {getApiResponse, getLinksFromApiResponse} = require ('./processLinks')
const {postData} = require('../config')

module.exports = {processLatest}

async function processLatest (newsletterChannel, {archive_url, archive_date}) {
console.log('starting processLatest')
    try {
        let apiResponse = await getApiResponse (archive_url)

        if (!archive_date) {
            archive_date = await getRecommendationDate (apiResponse, archive_url)  
        } 
        apiResponse = getRelevantApiResponse (newsletterChannel, apiResponse)
        const outputLinks = getOutputLinks (newsletterChannel, apiResponse)
            
        return {
            recommendationDate: archive_date,
            outputLinks,
            processedUrl: archive_url
        }
    } catch(e) {
        console.log({e})
        return e
    }
}

function extractPocketHits (inputLinks) {
  const outputLinks = inputLinks.reduce((newArray, item) => {
      if (item.includes('https://pocket.co/')) {
          newArray.push(`${item}`)
      }
      return newArray
  }, [])
  return outputLinks
}
function getOutputLinks (newsletterChannel, apiResponse) {
    const {shortLinks} = getLinksFromApiResponse (apiResponse)
    let outputLinks = shortLinks || []
    if (newsletterChannel.channel_url.includes('https://getpocket.com/explore/pocket-hits')) {
        outputLinks = extractPocketHits(outputLinks)
    }
    return outputLinks
}

function getRelevantApiResponse (newsletterChannel, apiResponse) {
    const {beginning_identifier, end_identifier} = newsletterChannel.curator_section_input
    if (beginning_identifier) {
        const relevantApiResponseBlock = apiResponse.split(beginning_identifier)[1]
        if (relevantApiResponseBlock) {
            apiResponse = relevantApiResponseBlock.split(end_identifier)[0]
        }
    }
    return apiResponse
}

async function getRecommendationDate (apiResponse, archive_url) {
  const {date} = unfluff(apiResponse)
  if (date) {
    return await postData ('helper-date', {date, url: archive_url})
  } else {
    return 
  }
}

