var dualShock = require('dualshock-controller');
var exec = require('child_process').exec;
var ansi = require('ansi')
  , cursor = ansi(process.stdout);

//clear the console
process.stdout.write('\u001B[2J\u001B[0;0f');

cursor.reset();
cursor.blue();
//cursor.hex('#660000').bold();

function Guy(){

}

var xCenter = 100;
var yCenter = 25;
var psXCenter = 136;
var psYCenter = 125;

var xRatio = 100/136;
var yRatio = 25/136;
var cursorText = 'X';


cursor.goto(1, 4);

//console.log(xRatio, yRatio);

//pass options to init the controller.
var controller = dualShock(
    {
        //you can use a ds4 by uncommenting this line.
        //config: "dualshock4-generic-driver",
        //if using ds4 comment this line.
        config : "dualShock3",
        //smooths the output from the acelerometers (moving averages) defaults to true
        accelerometerSmoothing : true,
        //smooths the output from the analog sticks (moving averages) defaults to false
        analogStickSmoothing : false
    });

//make sure you add an error event handler
controller.on('error', function(data) {
  console.log('err!', data);
});

var firstMove = true;
//add event handlers:
controller.on('left:move', function(data) {
  // if(firstMove===true){
  //   //TODO: setup ratio based on screen size and ps positions -> hardcoded for now
  //   psXCenter = data.x;
  //   psYCenter = data.y;
  //   cursor.goto(psXCenter * xRatio, psYCenter * yRatio).write('0');
  //   firstMove = false;
  // }else{
  cursor.goto(data.x * xRatio, data.y * yRatio).write(cursorText);
  // }
});
controller.on('right:move', function(data) {
  //...doStuff();
  //console.log('right move!');
});
controller.on('connected', function(data) {
  //...doStuff();
});
controller.on('square:press', function (data) {
  //...doStuff();
  cursorText = '[ ]';
  cursor.brightYellow();
  cursor.write(cursorText);
});
controller.on('triangle:press', function (data) {
  cursorText = '/\\';
  cursor.green();
  cursor.write(cursorText);
});
controller.on('circle:press', function (data) {
  cursorText = 'O';
  cursor.red();
  cursor.write(cursorText);
});
controller.on('x:press', function (data) {
  //...doStuff();
  cursorText = 'X';
  cursor.blue();
  cursor.write(cursorText);
});
controller.on('square:release', function (data) {
  //...doStuff();
});

controller.on('start:press', function(data){
  process.exit();
});

controller.on('select:press', function(data){
  var filename = 'ps3_' + (new Date).getTime() + '.jpg';
  exec('screencapture ' + filename);
});

//sixasis motion events:
//the object returned from each of the movement events is as follows:
//{
//    direction : values can be: 1 for right, forward and up. 2 for left, backwards and down.
//    value : values will be from 0 to 120 for directions right, forward and up and from 0 to -120 for left, backwards and down.
//}

//right-left movement
controller.on('rightLeft:motion', function (data) {
    //...doStuff();
});

//forward-back movement
controller.on('forwardBackward:motion', function (data) {
    //...doStuff();
});
//up-down movement
controller.on('upDown:motion', function (data) {
    //...doStuff();
});

//controller status
//as of version 0.6.2 you can get the battery %, if the controller is connected and if the controller is charging
controller.on('battery:change', function (value) {
     //...doStuff();
});
controller.on('connection:change', function (value) {
     //...doStuff();
});
controller.on('charging:change', function (value) {
     //...doStuff();
});

//connect the controller
controller.connect();