const axios = require('axios')



function fetchUpwards (hostUrl) {
    console.log(`running fetchUpwards for ${hostUrl}`)
    const fetchUrl = `https://${hostUrl}`
    return axios({
        method: 'get',
        url: fetchUrl,
        timeout: 0.2 * 60 * 1000, // every 0.2 minutes
        rejectUnauthorized: false
    })
    .then((apiFetch) => {
        const {data} = apiFetch
        // console.log({data})
        const {getLinksArray} = require('./helpers')
        const linksArray = getLinksArray (data)
        const {length} = linksArray
        // console.log({linksArray})
        const identifierStringArray = linksArray.reduce((newArray, linkItem) => {

            if (linkItem.includes('//')) {
                const splitIndicators = [
                    '//www.',
                    '//',
                ]
                const regExSplitIndicators = new RegExp(splitIndicators.join('|'));
                linkItem = linkItem.split(regExSplitIndicators)[1]
            }

            const isIncluded = basicInclusion (linkItem)
            // console.log({isIncluded})
            if (isIncluded) {
                // console.log(`is included ${linkItem}`)
                const keyLinkInfo = disectLinkItem (linkItem)
                const {identifierArray, consideredArticle} = keyLinkInfo
                let identifierString = identifierArray.join('/')
                if (consideredArticle) {

                    if (linkItem.includes(hostUrl)) {
                        // console.log({identifierArray})
                        if (identifierArray.length > 0) {
                            // console.log({identifierString})
                            newArray.push(identifierString)
                        }
                    } else {
                        if (identifierArray.length > -1) {
                            // console.log({identifierString})
                            newArray.push(identifierString)
                        }
                    }
                }
            } else {
                // console.log(`is excluded ${linkItem}`)
            }
            return newArray
        }, [])

        const {organiseWordsByCount} = require('./helpers')
        const identifierStringArrayLimited = organiseWordsByCount (identifierStringArray, 2)
        // console.log({identifierStringArrayLimited})
        return identifierStringArrayLimited
    })
    .catch((fetchUpwardsError) => {
        const {response} = fetchUpwardsError
        console.log({fetchUpwardsError})
        return null
    })
}

function basicInclusion (linkItem) {
    if (!linkItem.includes('/')) {
        return false
    }

    const excludedItems = [
        'http',
        '/privacy',
        '/legal',
        '/terms',
        '/sign-in',
        '/donate',
        '/contact',
        '/about',
        '/assets',
        '/staff',
        '/writer',
        '/author',
        'mailchimp.com',
        'facebook.com',
        'twitter.com',
        'instagram.com',
        'pinterest.com',
        'google.com',
        '.ico',
        '.rss',
        '.png',
        '.svg',
        '.woff2',
        '.json',
        '.js',
        '.xml',
        '.css',
        "\\",
        "\n",
        "\t",
    ]

    const isIncluded = excludedItems.reduce((boolean, excludedItem) => {
        if (linkItem.includes(excludedItem)) {
            boolean = false
        }
        return boolean
    }, true)
    return isIncluded
}

function disectLinkItem (linkItem) {

    const urlArray = linkItem.split('/')
    if (urlArray[0] === '') {
        urlArray.shift()
    }
    let consideredArticle = false
    const identifierArray = urlArray.reduce((tempArray, urlItem, index) => {

        const {length} = tempArray
        // console.log({index, length})

        const c0 = tempArray.length === index
        const c1 = urlItem.length < 20
        const c2 = urlItem.length > 2
        const c3 = urlItem.split('-').length < 3
        const c4 = urlItem !== urlItem.toUpperCase()

        if (c0 && c1 && c2 && c3 & c4) {
            tempArray.push(urlItem)
        }

        else if (!c1 || !c3) {
            consideredArticle = true
        }
        return tempArray
    }, [])
    return {consideredArticle, identifierArray}
}

module.exports = {
    fetchUpwards,
}
