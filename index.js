const func = require('./src/app')
//this reset boolean resets the main process once an execution is run completely
var reset = true
//Reset key is passed to main
func.main(reset)

module.exports={
    reset
}