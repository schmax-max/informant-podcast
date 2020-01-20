const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const should = require('chai').should()
chai.use(chaiAsPromised).should()

const {links} = require ('../svc')

// beforeEach(async () => {
//     // connection()
//     // const db = mongoose.connection
//     // db.on('error', console.error.bind(console, 'connection error'))
//     // db.once('open', () => {
//     //     console.log('test DB connected!')
//     // })
// });

describe('TEST: Links ||', () => {
    it('fetches links:', async () => {
        const allLinks = await links('https://www.africanews.com/')
        const singleLink = allLinks[0]
        // expect(singleLink).to.include('http')
    }).timeout(60 * 1000);
})
