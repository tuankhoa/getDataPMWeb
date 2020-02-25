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
        var lines = JSON.parse(await doRequest(linesGetOption(plant.id, constant.token)))
        lines.forEach(async line => {
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

            var machines = JSON.parse(await doRequest(machinesGetOption(line.id, constant.token)))
            machines.forEach(async machine => {
                var emptyArrCalendar = true
                var components = []
                var pageCalendar = 0
                while (emptyArrCalendar) {
                    var currentComponents = JSON.parse(await doRequest(calendarGetOption(line.id, machine.id, constant.token, pageCalendar)))
                    if (currentComponents.length) {
                        currentComponents.forEach(async component => {
                            var taskExtend = []
                            tasksTypes.forEach(task => {
                                taskExtend.push({
                                    name: task.name,
                                    workHours: task.id > 2 ? component.amDuration || 0 : component.pmDuration || 0,
                                    frenquency: task.id > 2 ? component.amFrequency || 0 : component.pmFrequency || 0,
                                    manCount: task.id > 2 ? component.amManCount || 0 : component.pmManCount || 0,
                                    quantity: task.id === 2 ? 1 : 0,
                                    lastMaintenanceDate: ''
                                })
                            })
                            var taskDate = []
                            for (var keyTaskDate in component.taskMap) {
                                taskDate.push(keyTaskDate)
                            }
                            component.tasks = taskExtend
                            component.taskMap = taskDate
                            tasksLine.forEach(task => {
                                if (task.componentId === parseInt(component.component.id) && task.componentGroupId === parseInt(component.group.id)) {
                                    if (task.taskActions.length) {
                                        task.taskActions.forEach(taskAction => {
                                            if (['UNPLANNED', 'BREAKDOWN'].includes(task.type) || task.status === 'DONE') {
                                                component.tasks[taskAction.id].lastMaintenanceDate = task.time
                                            }
                                        })
                                    }
                                }
                            })
                            components.push({
                                componentId: component.component.id,
                                name: component.name.toUpperCase(),
                                sparePart: '',
                                plant: plant.name.toUpperCase(),
                                line: line.name.toUpperCase(),
                                machine: machine.name.toUpperCase(),
                                machineGroupId: component.group.id,
                                machineGroup: component.group.name.toUpperCase(),
                                description: component.description || '',
                                vendor: component.component.vendor || '',
                                strategy: (component.pmStrategy || component.component.pmStrategy || '').toUpperCase(),
                                stratification: (component.stratification || component.component.stratification || '').toUpperCase(),
                                drawingNumber: component.drawingNumber || component.component.drawingNumber || '',
                                specs: component.specs || component.component.specs || '',
                                jhiType: component.component.jhiType || '',
                                sapNumber: component.component.sapNumber || '',
                                qul: component.component.qul || '',
                                location: component.location || component.component.location || '',
                                rackLocation: component.rackLocation || component.component.rackLocation || '',
                                stock: component.component.stock || '',
                                uom: component.component.uom || '',
                                unitPrice: component.component.unitPrice || '',
                                thumbId: component.component.thumbId || '',
                                thumbIdGroup: component.group.thumbId || '',
                                status: '',
                                re_tightenWorkHours: component.tasks[6].workHours,
                                re_tightenFrenquency: component.tasks[6].frenquency,
                                re_tightenManCount: component.tasks[6].manCount,
                                re_tightenLastMaintenanceDate: component.tasks[6].lastMaintenanceDate ? formatDayTime2(new Date(component.tasks[6].lastMaintenanceDate)) : '',
                                re_tightenUpcommingMaintenance: '',
                                lubricateWorkHours: component.tasks[4].workHours,
                                lubricateFrenquency: component.tasks[4].frenquency,
                                lubricateLastMaintenanceDate: component.tasks[4].lastMaintenanceDate ? formatDayTime2(new Date(component.tasks[4].lastMaintenanceDate)) : '',
                                lubricateUpcommingMaintenance: '',
                                inspectWorkHours: component.tasks[5].workHours,
                                inspectFrenquency: component.tasks[5].frenquency,
                                inspectManCount: component.tasks[5].manCount,
                                inspectLastMaintenanceDate: component.tasks[5].lastMaintenanceDate ? formatDayTime2(new Date(component.tasks[5].lastMaintenanceDate)) : '',
                                inspectUpcommingMaintenance: '',
                                cleanWorkHours: component.tasks[3].workHours,
                                cleanFrenquency: component.tasks[3].frenquency,
                                cleanManCount: component.tasks[3].manCount,
                                cleanLastMaintenanceDate: component.tasks[3].lastMaintenanceDate ? formatDayTime2(new Date(component.tasks[3].lastMaintenanceDate)) : '',
                                cleanUpcommingMaintenance: '',
                                replaceWorkHours: component.tasks[2].workHours,
                                replaceFrenquency: component.tasks[2].frenquency,
                                replaceManCount: component.tasks[2].manCount,
                                replaceFrenquencyQuantity: 1,
                                replaceLastMaintenanceDate: component.tasks[2].lastMaintenanceDate ? formatDayTime2(new Date(component.tasks[2].lastMaintenanceDate)) : '',
                                replaceUpcommingMaintenance: '',
                                adjustWorkHours: component.tasks[1].workHours,
                                adjustFrenquency: component.tasks[1].frenquency,
                                adjustManCount: component.tasks[1].manCount,
                                adjustLastMaintenanceDate: component.tasks[1].lastMaintenanceDate ? formatDayTime2(new Date(component.tasks[1].lastMaintenanceDate)) : '',
                                adjustUpcommingMaintenance: '',
                                taskMap: component.taskMap
                            })
                        })
                        pageCalendar++
                    } else {
                        emptyArrCalendar = false
                    }
                }
                // data export
                var dataExport = []
                for (var i = 0; i < components.length; i++) {
                    var machineTask = {}
                    for (var keyTaskFirst in components[i]) {
                        if (!['taskMap', 'componentId', 'machineGroupId'].includes(keyTaskFirst)) {
                            machineTask[keyTaskFirst] = components[i][keyTaskFirst]
                        }
                    }
                    machineTask.workOrderCount = 0
                    var count = 0
                    components[i].taskMap.forEach(taskDate => {
                        var y = parseInt(taskDate.slice(0, 4))
                        var w = parseInt(taskDate.slice(4))
                        var nextW = w + 1 <= 52 ? w + 1 : 1
                        var nextY = nextW === 1 ? y + 1 : y
                        var time1 = formatDayTime(getDateOfISOWeek(w, y))
                        var time2 = formatDayTime(getDateOfISOWeek(nextW, nextY))
                        tasksLine.forEach(task => {
                            var timeNow = formatDayTime(new Date(task.time))
                            var statusNow = ['UNPLANNED', 'BREAKDOWN'].includes(task.type) ? 'Closed' : task.type === 'PLANNED' ? task.status === 'DONE' ? 'Closed' : 'Delayed' : ''
                            if (task.taskActions.length) {
                                if (task.componentId === parseInt(components[i].componentId) && task.componentGroupId === parseInt(components[i].machineGroupId)) {
                                    if (time1 <= timeNow && timeNow < time2) {
                                        task.taskActions.forEach(taskAction => {
                                            count++
                                            machineTask[`wordOderId_${count}`] = ''
                                            machineTask[`type_${count}`] = task.type
                                            machineTask[`status_${count}`] = statusNow
                                            machineTask[`action_${count}`] = taskAction.name
                                            machineTask[`originalWeek_${count}`] = task.type === 'PLANNED' ? `${w}/${y}` : ''
                                            machineTask[`actualWeek_${count}`] = statusNow === 'Closed' ? `${w}/${y}` : ''
                                            machineTask[`totalTimeDelay_${count}`] = 0
                                            machineTask[`downTime_${count}`] = 0
                                            machineTask[`cumulative_${count}`] = 0
                                        })
                                    }
                                }
                            }
                        })
                    })
                    machineTask.workOrderCount = count
                    dataExport.push(machineTask)
                }
                fs.writeFileSync(`./json/test/${line.name.toUpperCase()}_${machine.name.toUpperCase()}.json`, JSON.stringify(dataExport))
            })
        })
        console.log('done======================================================================================================================================!')
    })
}
