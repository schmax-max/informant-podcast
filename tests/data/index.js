const fs = require('fs')

exports.params = JSON.parse(fs.readFileSync(`./tests/data/params.json`, 'UTF-8'))
exports.source = JSON.parse(fs.readFileSync(`./tests/data/source.json`, 'UTF-8'))
