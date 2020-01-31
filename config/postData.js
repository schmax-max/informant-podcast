const axios = require('axios')
const {ports} = require('./')

module.exports = postData

async function postData ({project, type = '-', data, mins = 0.01, forceProdEnv}) {
  console.log({data})
  const url = getApiUrl (project, type, forceProdEnv)
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

function getApiUrl (project, type, forceProdEnv) {
  const port = ports[project]

  const apis = {
    production: `https://${project}-dot-alexandria-core.appspot.com/${project}/${type}`,
    local: `http://localhost:${port}/${project}/${type}`,
  }
 
  let env = process.env.NODE_ENV
  if (forceProdEnv) {
    env = 'production'
  }

  return apis[env] || apis.local
}

