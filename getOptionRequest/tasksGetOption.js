module.exports = function (lineId, token, page) {
    return {
        'method': 'GET',
        'url': `https://pmweb.az.team/api/tasks?lineId.equals=${lineId}&done.equals=false&late.equals=false&weekFrom.greaterOrEqualThan=2018-12-31T00:00:00.000Z&weekTo.lessOrEqualThan=2020-02-23T23:59:59.999Z&size=2000&page=${page}&sort=time,asc&sort=id,asc`,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    }
}
