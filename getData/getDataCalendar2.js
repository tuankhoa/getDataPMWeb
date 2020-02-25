const fs = require('fs')

var constant = require('../constant')
var linesGetOption = require('../getOptionRequest/linesGetOption')
var machinesGetOption = require('../getOptionRequest/machinesGetOption')
var calendarGetOption = require('../getOptionRequest/calendarGetOption')
var tasksGetOption = require('../getOptionRequest/tasksGetOption')

var plants = require('../constant').plants
var tasksTypes = require('../constant').tasksTypes

var doRequest = require('../functionUtil').doRequest
var formatDayTime = require('../functionUtil').formatDayTime
var formatDayTime2 = require('../functionUtil').formatDayTime2
var getDateOfISOWeek = require('../functionUtil').getDateOfISOWeek

module.exports = function () {
    plants.forEach(async plant => {
        var lines = JSON.parse((fs.readFileSync(`./jsonFull/${plant.name}/newLines.json`)).toString())
        // var listDoRequest = []
        // var count = 0
        // setInterval(async () => {
        //     if (count === lines.length) {
        //         clearInterval(this)
        //     } else {
        //         var line = lines[count]
        //         if (!listDoRequest.includes(line.count)) {
        //             var emptyArrTask = true
        //             var tasksLine = []
        //             var pageTask = 0
        //             while (emptyArrTask) {
        //                 var currentTasks = JSON.parse(await doRequest(tasksGetOption(line.id, constant.token, pageTask)))
        //                 if (currentTasks.length) {
        //                     currentTasks.forEach(task => {
        //                         tasksLine.push(task)
        //                     })
        //                     pageTask++
        //                 } else {
        //                     emptyArrTask = false
        //                 }
        //             }
        //             fs.writeFileSync(`./jsonTask/${plant.name}/${line.count}.json`, JSON.stringify(tasksLine))
        //         }
        //         count++
        //     }
        // }, 10000)
        var listDoRequest = []
        lines.forEach(async line => {
            if (!listDoRequest.includes(line.count)) {
                var emptyArrTask = true
                var tasksLine = []
                var pageTask = 0
                while (emptyArrTask) {
                    var currentTasks = JSON.parse(await doRequest(tasksGetOption(line.id, constant.token, pageTask)))
                    if (currentTasks.length) {
                        currentTasks.forEach(task => {
                            tasksLine.push(task)
                        })
                        pageTask++
                    } else {
                        emptyArrTask = false
                    }
                }
                fs.writeFileSync(`./jsonTask/${plant.name}/${line.count}.json`, JSON.stringify(tasksLine))
            }
        })

        // var machines = JSON.parse((fs.readFileSync(`./jsonFull/${plant.name}/newMachines.json`)).toString())
        // var listDoRequest = [39]
        // var listDoRequest = [6,22,28,33,37,68,76,78,80,82,83,84,85,87,29,69]
        // machines.forEach(async machine => {
        //     if (!listDoRequest.includes(machine.count)) {
        //         var line = machine.line
        //         var emptyArrCalendar = true
        //         var components = []
        //         var pageCalendar = 0
        //         while (emptyArrCalendar) {
        //             var currentComponents = JSON.parse(await doRequest(calendarGetOption(line.id, machine.id, constant.token, pageCalendar)))
        //             if (currentComponents.length) {
        //                 currentComponents.forEach(async component => {
        //                     components.push(component)
        //                 })
        //                 pageCalendar++
        //             } else {
        //                 emptyArrCalendar = false
        //             }
        //         }
        //         fs.writeFileSync(`./jsonFull/${plant.name}/${machine.count}.json`, JSON.stringify(components))
        //     }
        // })
    })

    // plants.forEach(async plant => {
    //     // var lines = JSON.parse(await doRequest(linesGetOption(plant.id, constant.token)))
    //     // fs.writeFileSync(`./jsonFull/${plant.name}/oldLines.json`, JSON.stringify(lines))
    //     var lines = JSON.parse((fs.readFileSync(`./jsonFull/${plant.name}/oldLines.json`)).toString())
    //     var allMachines = []
    //     var allComponents = []
    //     lines.forEach(async line => {
    //         var emptyArrTask = true
    //         var tasksLine = []
    //         var pageTask = 0
    //         // while (emptyArrTask) {
    //         //     var currentTasks = JSON.parse(await doRequest(tasksGetOption(line.id, constant.token, pageTask)))
    //         //     if (currentTasks.length) {
    //         //         currentTasks.forEach(task => {
    //         //             tasksLine.push(task)
    //         //         })
    //         //         pageTask++
    //         //     } else {
    //         //         emptyArrTask = false
    //         //     }
    //         // }
    //         // fs.writeFileSync(`./jsonTask/${plant.name}/${line.name.toUpperCase()}.json`, JSON.stringify(tasksLine))

    //         // var machines = JSON.parse(await doRequest(machinesGetOption(line.id, constant.token)))
    //         machines.forEach(async machine => {
    //             // allMachines.push(machine)
    //             var emptyArrCalendar = true
    //             var components = []
    //             var pageCalendar = 0
    //             while (emptyArrCalendar) {
    //                 var currentComponents = JSON.parse(await doRequest(calendarGetOption(line.id, machine.id, constant.token, pageCalendar)))
    //                 if (currentComponents.length) {
    //                     currentComponents.forEach(async component => {
    //                         components.push(component)
    //                         // allComponents.push(component)
    //                     })
    //                     pageCalendar++
    //                 } else {
    //                     emptyArrCalendar = false
    //                 }
    //             }
    //             fs.writeFileSync(`./jsonFull/${plant.name}/${line.name.toUpperCase()}_${machine.name.toUpperCase()}.json`, JSON.stringify(components))
    //         })
    //         fs.writeFileSync(`./jsonFull/machinesHCL/machines_in_${line.name.toUpperCase()}.json`, JSON.stringify(machines))
    //     })
    //     // fs.writeFileSync(`./jsonFull/${plant.name}/oldMachines.json`, JSON.stringify(allMachines))
    //     // fs.writeFileSync(`./jsonFull/${plant.name}/oldComponents.json`, JSON.stringify(allComponents))
    // })
}
