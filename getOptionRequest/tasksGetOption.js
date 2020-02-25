module.exports = function (lineId, token, page) {
    return {
        'method': 'GET',
        'url': `https://pmweb.az.team/api/tasks?lineId.equals=${lineId}&done.equals=false&late.equals=false&weekFrom.greaterOrEqualThan=2018-12-31T00:00:00.000Z&weekTo.lessOrEqualThan=2020-02-23T23:59:59.999Z&size=2000&page=${page}&sort=time,asc&sort=id,asc`,
        'headers': {
            'Host': 'pmweb.az.team',
            'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFua2hvYSIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfU1VQRVJVU0VSLFJPTEVfVVNFUiIsInBsYW50IjoyLCJleHAiOjE1ODUxNDE2NDJ9.jy9Iq23ejD_UAq1vWGiIQdG0AXYpBfbLPB8q2LKVS69CHBrhxjbRL_6QKSkr0wGpLlwYbnpcCcdhPwVOefJTxA`,
            'User-Agent': 'Mozilla/5.0 (compatible; Rigor/1.0.0; http://rigor.com)',
            // 'Postman-Token': 'd2938c16-cd54-405f-aef8-65e7cac8b76a',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    }
}
