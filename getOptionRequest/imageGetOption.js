module.exports = function (imageType, imageId) {
    return {
        'method': 'GET',
        'url': `https://pmweb.az.team/api/${imageType === 1 ? 'machine-component-images' : 'component-group-images'}/${imageId}`,
        'headers': {
        }
    }
}
