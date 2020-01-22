const chai = require('chai')
const mongoose = require('mongoose')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const should = require('chai').should()
chai.use(chaiAsPromised).should()

require ('../config/connection')
// const {sherpa} = require ('../svc')

beforeEach(async () => {
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
        console.log('test DB connected!')
    })
});
  
const defaultTimeout = 60 * 1000 

describe('TEST: .... ||', () => {
    // it('...', async () => {
    //     const response = await sherpa('center')
    //     expect(response).to.have.nested.property('mbfc')
    //     expect(response).to.have.nested.property('mbfc.bubble')
    // }).timeout(defaultTimeout)
})
