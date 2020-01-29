'use strict'
const {postData} = require('../config')
const {updateSource} = require('./updateSource')

async function perSource (source, type) {
    const {source_url} = source
    const data = {
        url: source_url,
        options: getOptions (source, type)
    }
    let links = await postData('helper-links', data)
    if (source_url.includes('getpocket.com/explore/trending')) {
        links = convertPocketTrendingLinks (links)
    }
    // console.log({links, data})
    return updateSource(source, {links})
}

function getOptions (source, type) {
    const {source_url, filtering} = source
    const options = filtering
    options.remove_short_links = removeShortLinks (source_url)
    if (type === 'slugs' && !options.link_includer) {
        options.link_includer = addLinkIncluder (source)
    }
    return options
}

function addLinkIncluder ({source_url}) {
    const withoutHost = source_url.split('//')[1]
    const slugArray = withoutHost.split('/')
    let linkIncluder = ''
    slugArray.forEach((slug, index) => {
        if (index > 0 && index < 3) {
            linkIncluder += `${slug}/`
        }
    })
    return linkIncluder
}

function removeShortLinks (source_url) {
    const includeShortLinks = [
        'redef.',
        'getpocket.'
    ]

    const includeShortLinksRegex = new RegExp (includeShortLinks.join('|'))

    return !source_url.match(includeShortLinksRegex)
}



function convertPocketTrendingLinks (links) {
    return links.reduce((newArray, item) => {
        const openingString = 'http://getpocket.com/redirect'
        if (item.indexOf(openingString) !== -1) {

            item = item.replace(`${openingString}?&amp;url=`, '')
            item = item.replace(/%3A%2F%2F/g, '://')
            item = item.replace(/%2F/g, '/')
            item = item.split('&')[0]
            if (newArray.indexOf(item) === -1) {
                newArray.push(item)
            }
        }
        return newArray
    }, [])
}


module.exports = {
    perSource
}
