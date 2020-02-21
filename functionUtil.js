var request = require('request')

module.exports = {
    doRequest: function (option) {
        return new Promise((resolve, reject) => {
            request(option, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error)
                }
            })
        })
    },
    formatDayTime: function (now) {
        if (!now || now === '') {
            return ''
        }
        var year = '' + now.getFullYear()
        var month = '' + (now.getMonth() + 1)
        if (month.length === 1) {
            month = '0' + month
        }
        var day = '' + now.getDate()
        if (day.length === 1) {
            day = '0' + day
        }
        var hour = '' + now.getHours()
        if (hour.length === 1) {
            hour = '0' + hour
        }
        var minute = '' + now.getMinutes()
        if (minute.length === 1) {
            minute = '0' + minute
        }
        var second = '' + now.getSeconds()
        if (second.length === 1) {
            second = '0' + second
        }
        return `${year}/${month}/${day}`
    },
    formatDayTime2: function (now) {
        if (!now || now === '') {
            return ''
        }
        var year = '' + now.getFullYear()
        var month = '' + (now.getMonth() + 1)
        if (month.length === 1) {
            month = '0' + month
        }
        var day = '' + now.getDate()
        if (day.length === 1) {
            day = '0' + day
        }
        var hour = '' + now.getHours()
        if (hour.length === 1) {
            hour = '0' + hour
        }
        var minute = '' + now.getMinutes()
        if (minute.length === 1) {
            minute = '0' + minute
        }
        var second = '' + now.getSeconds()
        if (second.length === 1) {
            second = '0' + second
        }
        return `${day}/${month}/${year}`
    },
    getDateOfISOWeek: function (w, y) {
        var simple = new Date(y, 0, 1 + (w - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }
}
