var socket = io.connect()

socket.on('connect', function(data) {

  console.log("we connected to the server as " + socket.id)

})

$(function() {
  // // COLOR TESTS
  // var numRand = Math.floor(Math.random() * 5);
  // var myColors = ["white", "red", "pink", "blue", "yellow"];
  // var magnet = ["what", "the", "fuck", "did", "you", "just", "fucking", "say", "about1", "me1", "you2", "fucking2", "bitch"]
  //
  // $("." + magnet).css("color", myColors[numRand])
  // //END COLOR TESTS

  // $(".test").click(function(){
  // $("body").css({
  //   "background-color": "black",
  //   "color": "white"})
  // })
  //
  //
  // $("body").css({
  //   "background-color": "black",
  //   "color": "white"})
  // })


  $('.day_time').live('click', function() {
    $(this).removeClass('day_time').addClass('night_time')
    $("body").css({
      "background-color": "black",
      "color": "white"})
    $(".boingo").css("color", "black")
  })
  $('.night_time').live('click', function() {
    $(this).removeClass('night_time').addClass('day_time')
    $("body").css({
      "background-color": "#f6f6f5",
      "color": "#1e1e1e"
    })
  })

  var sick_jamz = document.createElement('audio')
      sick_jamz.setAttribute('src', 'music.mp3')

      sick_jamz.addEventListener('ended', function() {
          this.play()
      }, false)

  $('.music_is_off').live('click', function() {
    $(this).removeClass('music_is_off').addClass('music_is_on')
        sick_jamz.play()
  })
  $('.music_is_on').live('click', function() {
    $(this).removeClass('music_is_on').addClass('music_is_off')
        sick_jamz.pause()
  })

  $(".whats_this").mouseenter(
    function() {
   $(this).addClass("animated")
   $(this).addClass("bounceIn")}
  )
  $(".whats_this").mouseleave(
    function() {
   $(this).removeClass("animated")
   $(this).removeClass("bounceIn")}
  )
  $(".music_is_on").mouseenter(
    function() {
   $(this).addClass("animated")
   $(this).addClass("bounceIn")}
  )
  $(".music_is_on").mouseleave(
    function() {
   $(this).removeClass("animated")
   $(this).removeClass("bounceIn")}
  )
  $(".music_is_off").mouseenter(
    function() {
   $(this).addClass("animated")
   $(this).addClass("bounceIn")}
  )
  $(".music_is_off").mouseleave(
    function() {
   $(this).removeClass("animated")
   $(this).removeClass("bounceIn")}
  )
  $(".day_time").mouseenter(
    function() {
   $(this).addClass("animated")
   $(this).addClass("bounceIn")}
  )
  $(".day_time").mouseleave(
    function() {
   $(this).removeClass("animated")
   $(this).removeClass("bounceIn")}
  )
  $(".night_time").mouseenter(
    function() {
   $(this).addClass("animated")
   $(this).addClass("bounceIn")}
  )
  $(".night_time").mouseleave(
    function() {
   $(this).removeClass("animated")
   $(this).removeClass("bounceIn")}
  )


  $(".magnet").draggable({
    stop: function(event, ui) {
      console.log(event)

      var dataToSendToEveryone = {
        x: event.clientX,
        y: event.clientY,
        draggedElement: $(this).get(0).classList[1]
      }
      console.log(dataToSendToEveryone)
      socket.emit('movedMagnet', dataToSendToEveryone) //send data up to the server
      console.log("sent data")

    }
  })

  // socket.on('startingMagnet', function(allMagnetLocations){
  //
  //   console.log(allMagnetLocations)
  //
  //   allMagnetLocations.forEach(function(singleMagnet){
  //     $("." + data.draggedElement).css({
  //       'position': 'absolute',
  //       'top': singleMagnet.top,
  //       'left': singleMagnet.left
  //     }).appendTo('body')

})


socket.on('massSendMagnet', function(data) { // now we will reposition everything everytime we get a message.

  // console.log("recieved Data:", data)

  $.each(data, function(key, value) { //loop over everything one by one in 'data' which is the magnetHistory coming from the server

    // console.log("key:", key) // see what key we are looking at
    // console.log("value:", value) //see what the values are.

    //this is the same as before but witin the jquery JSON object loop.
    $("." + key).css({
      'position': "absolute",
      'top': value.y,
      'left': value.x
    })

  })


})
