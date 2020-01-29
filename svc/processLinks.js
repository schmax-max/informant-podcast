'use strict'
const axios = require ('axios')

function getApiResponse (link) {
    // console.log('link')
    // console.log(link)
    return axios.get(link)
    .then((data) => {
        const apiResponse = data.data
        return apiResponse
    })
    .catch((error) => {
        // console.log('error with getApiResponse')
        // console.log(error)
        return null
    })
}


function getLinksFromApiResponse (apiResponse) {
    // // console.log('apiResponse')
    // // console.log(apiResponse)
    let shortLinks = []
    let fullLinks = []

    const linkIndicatorsStart = [
        'href="',
        'href-url="',
        'href=',
        'href-url=',
    ]


    const regExLinkIndicatorsStart = new RegExp(linkIndicatorsStart.join('|'))
    // const regExLinkIndicatorsEnd = new RegExp(linkIndicatorsEnd.join('|'))

    // console.log({apiResponse})
    if (apiResponse.includes('/golf/2019/07/18/british-open-tiger-woods-rory-mcilroy-portrush-leaderboard-round-one')) {

    }
    let links = apiResponse.split(regExLinkIndicatorsStart)
    links.shift()

    links = links.reduce((newArray, individualItem) => {


        const shortLinkArray = individualItem.split(/\?|#|"|'|>|\s/g)
        const fullLinkArray = individualItem.split(/"|'|>|\s/)

        let shortLink
        shortLinkArray.forEach((item) => {
            if (shortLink === undefined && item.length > 5) {
                shortLink = item
                if (shortLinks.indexOf(shortLink) === -1) {
                    shortLinks.push(shortLink)
                }
            }
        })

        let fullLink
        fullLinkArray.forEach((item) => {
            if (fullLink === undefined && item.length > 5) {
                fullLink = item
                if (fullLinks.indexOf(fullLink) === -1) {
                    fullLinks.push(fullLink)
                }
            }
        })

        // shortLinks.push(individualItem.split(/\?|"/g)[0])
        // fullLinks.push(individualItem.split('"')[0])
        return newArray
    }, [])

    return { shortLinks, fullLinks }
}





module.exports = {
    getApiResponse,
    getLinksFromApiResponse
}
