const fs = require('fs')
var json2xls = require('json2xls')

var constant = require('../constant')
var linesGetOption = require('../getOptionRequest/linesGetOption')
var machinesGetOption = require('../getOptionRequest/machinesGetOption')

var plants = require('../constant').plants

module.exports = function () {
    plants.forEach(plant => {
        var machineLedgers = JSON.parse((fs.readFileSync(`./json/${plant.name}/components.json`)).toString())

        var components1 = JSON.parse((fs.readFileSync(`./json/components/components_1.json`)).toString())
        var components2 = JSON.parse((fs.readFileSync(`./json/components/components_2.json`)).toString())
        var components3 = JSON.parse((fs.readFileSync(`./json/components/components_3.json`)).toString())
        var components4 = JSON.parse((fs.readFileSync(`./json/components/components_4.json`)).toString())

        var components = []
        components1.forEach(component => {
            components.push({
                name: component.name.toUpperCase(),
                vendor: component.vendor,
                drawingNumber: component.drawingNumber,
                type: component.type,
                sapNumber: component.sapNumber,
                specs: component.specs,
                qul: component.qul,
                location: component.location,
                rackLocation: component.rackLocation,
                stock: component.stock,
                uom: component.uom,
                unitPrice: component.unitPrice
            })
        })
        components2.forEach(component => {
            components.push({
                name: component.name.toUpperCase(),
                vendor: component.vendor,
                drawingNumber: component.drawingNumber,
                type: component.type,
                sapNumber: component.sapNumber,
                specs: component.specs,
                qul: component.qul,
                location: component.location,
                rackLocation: component.rackLocation,
                stock: component.stock,
                uom: component.uom,
                unitPrice: component.unitPrice
            })
        })
        components3.forEach(component => {
            components.push({
                name: component.name.toUpperCase(),
                vendor: component.vendor,
                drawingNumber: component.drawingNumber,
                type: component.type,
                sapNumber: component.sapNumber,
                specs: component.specs,
                qul: component.qul,
                location: component.location,
                rackLocation: component.rackLocation,
                stock: component.stock,
                uom: component.uom,
                unitPrice: component.unitPrice
            })
        })
        components4.forEach(component => {
            components.push({
                name: component.name.toUpperCase(),
                vendor: component.vendor,
                drawingNumber: component.drawingNumber,
                type: component.type,
                sapNumber: component.sapNumber,
                specs: component.specs,
                qul: component.qul,
                location: component.location,
                rackLocation: component.rackLocation,
                stock: component.stock,
                uom: component.uom,
                unitPrice: component.unitPrice
            })
        })

        var data = []
        components.forEach(component => {
            var count = 0
            var tempComponent = component
            tempComponent.mlCount = count
            machineLedgers.forEach(machineLedger => {
                if (component.name === machineLedger.name) {
                    count++
                    tempComponent[`plant_${count}`] = machineLedger.plant
                    tempComponent[`line_${count}`] = machineLedger.line
                    tempComponent[`machine_${count}`] = machineLedger.machine
                    tempComponent[`machineGroup_${count}`] = machineLedger.machineGroup
                    tempComponent[`machineLedgerName_${count}`] = machineLedger.name
                }
            })
            tempComponent.mlCount = count
            data.push(tempComponent)
        })

        var dataExport = []
        var max = { index: 0, value: 0 }
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
        fs.writeFileSync(`./excel/${plant.name}/spareParts.xlsx`, json2xls(dataExport), 'binary')
    })
}
