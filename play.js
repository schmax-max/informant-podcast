require('./config/connection')


const url = 'https://www.theatlantic.com/ideas/archive/2020/01/political-hobbyists-are-ruining-politics/605212/'
const {getTestData} = require('./tests/getTestData')
const input = getTestData('american_conservative')
const {perSource} = require('./svc/perSource')
// perSource(input)

const {master} = require('./svc')
master()

// const {master} = require('./svc')
// master()



const {update} = require('./adhoc')
// update()