const chai = require('chai')
// const mongoose = require('mongoose')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const should = require('chai').should()
chai.use(chaiAsPromised).should()

// require ('../config/connection')
const {master} = require ('../svc')

// beforeEach(async () => {
//     const db = mongoose.connection
//     db.on('error', console.error.bind(console, 'connection error'))
//     db.once('open', () => {
//         console.log('test DB connected!')
//     })
// });
  
const defaultTimeout = 60 * 1000 

describe('TEST: .... ||', () => {
    it('...', async () => {
        const inputUrl = 'https://www.theatlantic.com/ideas/archive/2020/01/political-hobbyists-are-ruining-politics/605212/'
        
        const resultUrls = [
            'https://www.theatlantic.com/education/archive/2018/11/education-gap-explains-american-politics/575113/',
            'https://www.theatlantic.com/ideas/archive/2020/01/political-hobbyists-are-ruining-politics/605212/',
            'https://www.theatlantic.com/politics/archive/2020/01/democrats-should-be-worried-about-latino-vote/604882/',
            'https://www.people-press.org/2018/08/09/an-examination-of-the-2016-electorate-based-on-validated-voters/',
            'https://www.theatlantic.com/education/archive/2018/11/education-gap-explains-american-politics/575113/',
            'https://www.simonandschuster.com/books/Politics-Is-for-Power/Eitan-Hersh/9781982116781',
            'https://www.penguinrandomhouse.com/books/74220/black-power-by-kwame-ture/',
        ]
        const response = await master(inputUrl)
        expect(response).to.be.an('array').that.includes(resultUrls[0])
        expect(response).to.be.an('array').that.includes(resultUrls[1])
        expect(response).to.be.an('array').that.includes(resultUrls[2])
    }).timeout(defaultTimeout)
})
