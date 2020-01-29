const fs = require('fs')

module.exports = {getTestData}

function getTestData (type) {
  return JSON.parse(fs.readFileSync(`./tests/data/channel_${type}.json`, 'UTF-8'))
}
