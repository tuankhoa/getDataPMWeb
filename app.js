const express = require('express')

var getAllData = require('./getData/getAllData')

var getDataCalendar = require('./getData/getDataCalendar')
var getImages = require('./getImages')
// var convertJsonToExcel = require('./convertJsonToExcel')
var converComponents = require('./convertJsonToExcel/convertComponents')
var converComponentsAll = require('./convertJsonToExcel/converComponentsAll')

const app = express()
const port = 3000

app.listen(port, () => console.log(`App listening on port ${port}!`))

// getAllData()

// getDataCalendar()
// getImages()

// convertJsonToExcel()
// converComponents()
converComponentsAll()
