const axios = require('axios')
const URL = require('url')

module.exports = {master}

async function master (url) {
  const {data} = await axios({
    method: 'get',
    url: url,
    timeout: 0.2 * 60 * 1000 // every 0.2 minutes
  })

  const {hostname} = URL.parse(url)
  const protocol = url.split('://')[0]
  const linkArray = data.split('href')
  linkArray.shift()
  const links = linkArray.reduce((arr, item) => {
    item = item.split('"')[1]
    if (item) {
      item = item.split('"')[0]
      if (!item.includes('http')) {
        item = `${protocol}://${hostname}${item}`
      }
      if (checkIfContentUrl(item) && arr.indexOf(item) === -1) {
        arr.push(item)
      }
    }
    return arr
  }, [])
  return links
}


function checkIfContentUrl (url) {
  const urlArray = url.split('-')
  const exclusion = [
    '/privacy',
    '/legal',
    '/terms',
    '/sign-in',
    '/donate',
    '/contact',
    '/about',
    '/assets',
    '/staff',
    '/writer',
    '/author',
    'mailchimp.com',
    'facebook.com',
    'twitter.com',
    'instagram.com',
    'pinterest.com',
    'google.com',
    '.ico',
    '.rss',
    '.png',
    '.svg',
    '.woff2',
    '.json',
    '.js',
    '.xml',
    '.css',
    "\\",
    "\n",
    "\t",
  ]
  
  const exclusionRegex = new RegExp (exclusion.join('|'))

  return urlArray.length > 3 && !url.match(exclusionRegex)
}