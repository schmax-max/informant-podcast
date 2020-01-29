require('./config/connection')


const url = 'https://www.theatlantic.com/ideas/archive/2020/01/political-hobbyists-are-ruining-politics/605212/'
const {getTestData} = require('./tests/getTestData')
const input = getTestData('dense_discovery')
const {masterPerSource} = require('./svc/masterPerSource')
masterPerSource(input)
const {master} = require('./svc')
// master(url)

