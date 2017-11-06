const express = require('express') //includes express as a pkg
const app = express() //boots up express
const server = require('http').Server(app)
const io = require('socket.io')(server) // set up out socket.io for use


//handles a request and sends back a specific response
// app.get('/', function(req, res){
//
//   res.send('hello world')
//
// })

//serves out any static files in our public HTML folder
app.use(express.static('public'))


var numConnections = 0
var magnetHistory = {
  //we dont actually need to store starting positions since they will just get written here when they get moved and we dont need to keep track until they are moved...
  // "300":{
  //   x: 100, //starting position
  //   y: 100
  // },
  // "about1":{
  //   x: 100, //starting position
  //   y: 100
  // },
  // "about2":{
  //   x: 100, //starting position
  //   y: 100
  // },
  // "access":{
  //   x: 100, //starting position
  //   y: 100
  // },
  // "across":{
  //   x: 100, //starting position
  //   y: 100
  // },
  // "again":{
  //   x: 100, //starting position
  //   y: 100
  // }
}


//do something when someone connects to our page.
io.on('connection', function(socket) {
  console.log(socket.id) //logs out the unique ID of each person who connects

  io.emit('massSendMagnet', magnetHistory) //send this out once when people connect. this will give the initilization state from the past history in the magnetHistory JSON object


  //information relay
  socket.on('movedMagnet', function(data) {
    //now we want to update our main posisiton object and then send that whole thing down to the clinet instead of sending just the single interaction.

    // console.log("moved Mag: ",data.draggedElement) //who did we move?

    //store the history
    // *** more info on whats going on here, here: https://jsfiddle.net/5Lw1g7fw/8/
    magnetHistory[data.draggedElement] = { //reset the key/value pairs in the magnetHistory JSON object. (see the structure above)
      x: data.x,
      y: data.y
    };

    // console.log("magnetHistory: ", magnetHistory) // what does the entire history look like?

    io.emit('massSendMagnet', magnetHistory) //send the entire history down to everyone.

  })




})



//makes app listen for requests on port 3000
server.listen(3000, function() {
  console.log("app listening on port 3000")
})