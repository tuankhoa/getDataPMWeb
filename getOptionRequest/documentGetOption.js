module.exports = function (token, page) {
    return {
        'method': 'GET',
        'url': `https://pmweb.az.team/api/documents?page=${page}&size=2000&sort=id,asc`,
        'headers': {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'PostmanRuntime/7.22.0',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Postman-Token': 'd2938c16-cd54-405f-aef8-65e7cac8b76a',
            'Host': 'pmweb.az.team',
            'Connection': 'keep-alive'
        }
    }
}
