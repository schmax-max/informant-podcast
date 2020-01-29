const axios = require('axios')
const {ports} = require('./')

module.exports = postData

async function postData (type, data, forceProdEnv) {
  const url = getApiUrl (type, forceProdEnv)
  console.log({data, url})
  
  try {
    const response = await axios({
      method: 'post',
      url,
      timeout: 1 * 60 * 1000, // 1 minute,
      data,
    })
    return response.data
  } catch(e) {
    console.log({e})
    return
  }
}

function getApiUrl (type, forceProdEnv) {
  const port = ports[type]

  const apis = {
    production: `https://${type}-dot-alexandria-core.appspot.com/${type}`,
    local: `http://localhost:${port}/${type}`,
  }
 
  let env = process.env.NODE_ENV
  if (forceProdEnv) {
    env = 'production'
  }

  return apis[env] || apis.local
}

