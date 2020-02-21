module.exports = function (lineId, machineId, token, page) {
    return {
        'method': 'GET',
        'url': `https://pmweb.az.team/api/calendar/components?groupDetails.equals=false&enableGroupDetails.equals=false&breakdowns.equals=false&time.greaterOrEqualThan=2018-12-31T00:00:00.000Z&time.lessOrEqualThan=2020-02-16T23:59:59.999Z&lineId.equals=${lineId}&machineId.equals=${machineId}&page=${page}&size=2000`,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    }
}
