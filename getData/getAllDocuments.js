const fs = require('fs')

var constant = require('../constant')
var linesGetOption = require('../getOptionRequest/linesGetOption')
var machinesGetOption = require('../getOptionRequest/machinesGetOption')
var documentGetOption = require('../getOptionRequest/documentGetOption')
var documentDownloadGetOption = require('../getOptionRequest/documentDownloadGetOption')

var plants = require('../constant').plants

var doRequest = require('../functionUtil').doRequest
var formatDayTime = require('../functionUtil').formatDayTime
var formatDayTime2 = require('../functionUtil').formatDayTime2
var getDateOfISOWeek = require('../functionUtil').getDateOfISOWeek

module.exports = function () {
    plants.forEach(async plant => {

        var currentDocuments = JSON.parse(await doRequest(documentGetOption(constant.token, 0)))
        console.log(currentDocuments)

        var emptyDocument = true
        var documents = []
        var page = 0
        // while (emptyDocument) {
        //     var currentDocuments = JSON.parse(await doRequest(documentGetOption(constant.token, page)))
        //     if (currentDocuments.length) {
        //         currentDocuments.forEach(document => {
        //             documents.push(document)
        //         })
        //         page++
        //     } else {
        //         emptyDocument = false
        //     }
        // }
        // fs.writeFileSync(`./files/listFiles.json`, JSON.stringify(documents))
        // documents.forEach(async document => {
        //     if (document.size > 0) {
        //         var dataDownload = await doRequest(documentDownloadGetOption(document.id, constant.token))
        //         var fileExtension = ''
        //         switch (document.type) {
        //             case 'application/pdf':
        //                 fileExtension = 'pdf'
        //                 break
        //             case 'application/jpg':
        //                 fileExtension = 'jpg'
        //                 break
        //             case 'application/png':
        //                 fileExtension = 'png'
        //                 break
        //             default:
        //                 break
        //         }
        //         fs.writeFileSync(`./files/${fileExtension}_${document.id}_${document.componentId}.${fileExtension}`, dataDownload)
        //     }
        // })
    })
}
