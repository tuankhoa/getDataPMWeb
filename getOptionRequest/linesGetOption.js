module.exports = function (plantId, token) {
    return {
        'method': 'GET',
        'url': `https://pmweb.az.team/api/lines?plantId.equals=${plantId}`,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    }
}
