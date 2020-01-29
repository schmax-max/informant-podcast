const axios = require('axios')
const URL = require('url')
const {masterPerSource} = require('./masterPerSource')

module.exports = {master}

async function master () {
  
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


function fetchAllSources () {
  // TODO INSERT MODEL STUFF HERE
}