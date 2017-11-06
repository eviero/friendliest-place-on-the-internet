var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.use(express.static('public'))

var connections

io.on('connection', function(socket){
  console.log(socket.id)
  connections = io.sockets.sockets
  console.log(connections)
})

//ch ch ch changes

var port = process.env.PORT || 3000
server.listen(port,function(){
  console.log("app listening on port " + port)
})
