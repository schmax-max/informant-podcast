const axios = require('axios')
const ports = require('./ports')
module.exports = postData

async function postData ({project, type = '-', data, mins = 0.01}) {
  // console.log({data})
  const enableLocal = false
  const url = getApiUrl (project, type, enableLocal)
  try {
    const response = await axios({
      method: 'post',
      url,
      timeout: mins * 60 * 1000,
      data,
    })
    return response.data
  } catch(e) {
    let code, status, url

    ({code} = e)
    if (e.response) {
      ({status} = e.response)
    }
    if (e.config) {
      ({url} = e.config)
    }
    console.log(`error with postData for ${project}`)
    console.log({status, code, url})
    return
  }
}

function getApiUrl (project, type, enableLocal) {

  const apis = {
    production: `https://${project}-dot-alexandria-core.appspot.com/${project}/${type}`,
    local: `http://localhost:${ports[project]}/${project}/${type}`,
  }
 
  let env = 'production'
  if (enableLocal) {
    env = process.env.NODE_ENV || 'local'
  }

  return apis[env]
}

