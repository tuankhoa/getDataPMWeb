const fs = require('fs')
var json2xls = require('json2xls')

var constant = require('../constant')
var linesGetOption = require('../getOptionRequest/linesGetOption')
var machinesGetOption = require('../getOptionRequest/machinesGetOption')

var plants = require('../constant').plants

module.exports = function () {
    plants.forEach(plant => {
        var components = JSON.parse((fs.readFileSync(`./json/${plant.name}/components.json`)).toString())
        var dataExport = []
        components.forEach(component => {
            dataExport.push({
                plant: component.plant,
                line: component.line,
                machine: component.machine,
                machineGroup: component.machineGroup,
                machineLedgerName: component.name,
                description: component.description,
                strategy: component.strategy,
                stratification: component.stratification,
                amFre: component.re_tightenFrenquency,
                amWorkHour: component.re_tightenWorkHours,
                amManCount: component.re_tightenManCount,
                pmFre: component.replaceFrenquency,
                pmWorkHour: component.replaceWorkHours,
                pmManCount: component.replaceManCount
            })
        })
        fs.writeFileSync(`./excel/${plant.name}/machineLedgers.xlsx`, json2xls(dataExport), 'binary')
    })
}
