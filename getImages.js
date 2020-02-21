const fs = require('fs')

var constant = require('./constant')
var linesGetOption = require('./getOptionRequest/linesGetOption')
var machinesGetOption = require('./getOptionRequest/machinesGetOption')
var calendarGetOption = require('./getOptionRequest/calendarGetOption')
var imageGetOption = require('./getOptionRequest/imageGetOption')

var plants = require('./constant').plants
var doRequest = require('./functionUtil').doRequest

module.exports = function () {
    plants.forEach(async plant => {
        var lines = JSON.parse(await doRequest(linesGetOption(plant.id, constant.token)))
        lines.forEach(async line => {
            var machines = JSON.parse(await doRequest(machinesGetOption(line.id, constant.token)))
            machines.forEach(async machine => {
                var emptyArrCalendar = true
                var pageCalendar = 0
                while (emptyArrCalendar) {
                    var currentComponents = JSON.parse(await doRequest(calendarGetOption(line.id, machine.id, constant.token, pageCalendar)))
                    if (currentComponents.length) {
                        currentComponents.forEach(async component => {
                            if (component.group.thumbId) {
                                var imgMachine = await doRequest(imageGetOption(1, component.group.thumbId))
                                fs.writeFileSync(`./image/${plant.name}/group/${component.group.thumbId}_${line.name.toUpperCase()}_${machine.name.toUpperCase()}`, imgMachine)
                            }
                            if (component.component.thumbId) {
                                var imgComponent = await doRequest(imageGetOption(2, component.component.thumbId))
                                fs.writeFileSync(`./image/${plant.name}/component/${component.component.thumbId}_${line.name.toUpperCase()}_${machine.name.toUpperCase()}`, imgComponent)
                            }
                        })
                        pageCalendar++
                    } else {
                        emptyArrCalendar = false
                    }
                }
            })
        })
        console.log('done======================================================================================================================================!')
    })
}
