const chai = require('chai')
const mongoose = require('mongoose')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const should = require('chai').should()
chai.use(chaiAsPromised).should()


require ('../config/connection')
const {commander} = require ('../svc')
const {params} = require ('./data/')
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
        const result = await commander(params)
        console.log({result})
    }).timeout(defaultTimeout)
})
