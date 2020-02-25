module.exports = function (lineId, machineId, token, page) {
    return {
        'method': 'GET',
        'url': `https://pmweb.az.team/api/calendar/components?groupDetails.equals=false&enableGroupDetails.equals=false&breakdowns.equals=false&time.greaterOrEqualThan=2018-12-31T00:00:00.000Z&time.lessOrEqualThan=2020-02-23T23:59:59.999Z&lineId.equals=${lineId}&machineId.equals=${machineId}&page=${page}&size=2000`,
        'headers': {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'Mozilla/5.0 (compatible; Rigor/1.0.0; http://rigor.com)',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            // 'Postman-Token': 'd2938c16-cd54-405f-aef8-65e7cac8b76a',
            'Host': 'pmweb.az.team',
            'Connection': 'keep-alive'
        }
    }
}
