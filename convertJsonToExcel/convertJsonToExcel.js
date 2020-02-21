const fs = require('fs')
var json2xls = require('json2xls')

var constant = require('../constant')
var linesGetOption = require('../getOptionRequest/linesGetOption')
var machinesGetOption = require('../getOptionRequest/machinesGetOption')

var plants = require('../constant').plants

var doRequest = require('../functionUtil').doRequest

module.exports = function () {
    var fileCount = 1
    plants.forEach(async plant => {
        var lines = JSON.parse(await doRequest(linesGetOption(plant.id, constant.token)))
        lines.forEach(async line => {
            var machines = JSON.parse(await doRequest(machinesGetOption(line.id, constant.token)))
            machines.forEach(async machine => {
                fs.readFile(`./json/${plant.name}/${line.name.toUpperCase()}_${machine.name.toUpperCase()}.json`, (err, result) => {
                    if (!err) {
                        var data = JSON.parse(result)
                        var max = { index: 0, value: 0 }
                        var dataExport = []
                        if (data.length) {
                            for (var i = 0; i < data.length; i++) {
                                var count = 0
                                for (var key in data[i]) {
                                    count++
                                }
                                if (count > max.value) {
                                    max.index = i
                                    max.value = count
                                }
                            }

                            dataExport.push(data[max.index])
                            for (var i = 0; i < data.length; i++) {
                                if (max.index !== i) {
                                    dataExport.push(data[i])
                                }
                            }
                        }
                        fs.writeFileSync(`./excel/${plant.name}/File${fileCount++}.xlsx`, json2xls(dataExport), 'binary')
                    }
                })
            })
        })
    })
}