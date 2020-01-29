'use strict'
const {processLatest} = require ('./processLatest')
const {getLatest} = require ('./getLatest')

module.exports = {
    masterPerSource
}

async function masterPerSource (newsletterChannel) {
    // console.log('starting masterPerSource')
    // console.log({apiResponse})
    const latestUnprocessed = await getLatest (newsletterChannel)
    if (!latestUnprocessed || latestUnprocessed === 'completed') {
        console.log('no latestUnprocessed')
        return latestUnprocessed
    } else {
        const response = await processLatest (newsletterChannel, latestUnprocessed)
        console.log({response})
        return response
    }
}













