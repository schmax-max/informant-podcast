require('./config/connection')


const url = 'https://www.theatlantic.com/ideas/archive/2020/01/political-hobbyists-are-ruining-politics/605212/'
const {getTestData} = require('./tests/getTestData')
const input = getTestData('dense_discovery')
const {perSource} = require('./svc/perSource')
// perSource(input)

const {master} = require('./svc')
master()



const {move} = require('./adhoc/move')
// move()