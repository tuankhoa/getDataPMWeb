const fs = require('fs')

var plants = require('../constant').plants

module.exports = function () {
    var createId = JSON.parse((fs.readFileSync('./json/createId.json')).toString())
    var createIdLine = createId.createIdLine
    var createIdMachine = createId.createIdMachine
    var createIdMachineGroup = createId.createIdMachineGroup
    var createIdComponent = createId.createIdComponent

    var lines = [{ id: 0, name: '', plantId: 0, plantName: '' }]
    var machines = [{ id: 0, name: '', lineId: 0, lineName: '', plantId: 0, plantName: '' }]
    var machineGroups = [{ id: 0, name: '', machineId: 0, machineName: '', lineId: 0, lineName: '', plantId: 0, plantName: '' }]
    var components = [{ id: 0, name: '', machineGroupId: 0, machineGroupName: '', machineId: 0, machineName: '', lineId: 0, lineName: '', plantId: 0, plantName: '' }]

    plants.forEach(plant => {
        var total = plant.total
        for (var i = 1; i <= total; i++) {
            var data = JSON.parse((fs.readFileSync(`./jsonFileNumber/${plant.name}/${plant.name.toLowerCase()} (${i}).json`)).toString())
            if (data.length) {
                if (data[0].line !== lines[lines.length - 1].name) {
                    lines.push({
                        id: ++createIdLine,
                        name: data[0].line,
                        plantId: plant.id,
                        plantName: plant.name
                    })
                }
                if (data[0].machine !== machines[machines.length - 1].name) {
                    machines.push({
                        id: ++createIdMachine,
                        name: data[0].machine,
                        lineId: createIdLine,
                        lineName: data[0].line,
                        plantId: plant.id,
                        plantName: plant.name
                    })
                }
                data.forEach(component => {
                    if (component.machineGroup !== machineGroups[machineGroups.length - 1].name) {
                        machineGroups.push({
                            id: ++createIdMachineGroup,
                            name: component.machineGroup,
                            machineId: createIdMachine,
                            machineName: data[0].machine,
                            lineId: createIdLine,
                            lineName: data[0].line,
                            plantId: plant.id,
                            plantName: plant.name
                        })
                    }
                    var tempComponent = component
                    tempComponent.plantId = plant.id
                    tempComponent.lineId = createIdLine
                    tempComponent.machineId = createIdMachine
                    tempComponent.machineGroupId = createIdMachineGroup
                    tempComponent.id = ++createIdComponent
                    components.push(tempComponent)
                })
            }
        }
        // console.log(lines)
        // console.log(machines)
        // console.log(machineGroups)
        // console.log(components)

        var newId = {
            createIdLine: createIdLine,
            createIdMachine: createIdMachine,
            createIdMachineGroup: createIdMachineGroup,
            createIdComponent: createIdComponent
        }
        fs.writeFileSync('./json/createId.json', JSON.stringify(newId))

        fs.writeFileSync(`./json/${plant.name}/lines.json`, JSON.stringify(lines))
        fs.writeFileSync(`./json/${plant.name}/machines.json`, JSON.stringify(machines))
        fs.writeFileSync(`./json/${plant.name}/machineGroups.json`, JSON.stringify(machineGroups))
        fs.writeFileSync(`./json/${plant.name}/components.json`, JSON.stringify(components))
    })
}

// function readFileJson () {

// }
