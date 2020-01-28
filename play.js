require('./config/connection')

const url = 'https://www.theatlantic.com/ideas/archive/2020/01/political-hobbyists-are-ruining-politics/605212/'
const {master} = require('./svc')
master(url)

