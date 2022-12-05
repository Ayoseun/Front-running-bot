const func = require('./src/app')
//this reset boolean resets the main process once an execution is run completely
var reset = true

module.exports = {
  reset,
}

const express = require('express')

const app = express()

app.use(express.json())

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Started `)
  //Reset key is passed to main
  func.main(reset)
})
