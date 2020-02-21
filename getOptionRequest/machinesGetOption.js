module.exports = function (lineId, token) {
    return {
        'method': 'GET',
        'url': `https://pmweb.az.team/api/machines?lineId.equals=${lineId}`,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    }
}
