// // serial variables
// let mSerial;

// let connectButton;

// let readyToReceive;

// // project variables
// let mElls = [];

// function receiveSerial() {
//   let line = mSerial.readUntil("\n");
//   trim(line);
//   if (!line) return;

//   if (line.charAt(0) != "{") {
//     print("error: ", line);
//     readyToReceive = true;
//     return;
//   }

//   // get data from Serial string
//   let data = JSON.parse(line).data;
//   let a0 = data.A0;
//   let d2 = data.D2;

//   // use data to update project variables
//   if (d2.isPressed) {
//     mElls.push({
//       x: random(width),
//       y: random(height),
//       c: map(d2.count % 20, 0, 20, 155, 255),
//       d: map(a0.value, 0, 4095, 20, 200),
//     });
//   }

//   // serial update
//   readyToReceive = true;
// }

// function connectToSerial() {
//   if (!mSerial.opened()) {
//     mSerial.open(9600);

//     readyToReceive = true;
//     connectButton.hide();
//   }
// }

// function setup() {
//   // setup project
//   createCanvas(windowWidth, windowHeight);

//   // setup serial
//   readyToReceive = false;

//   mSerial = createSerial();

//   connectButton = createButton("Connect To Serial");
//   connectButton.position(width / 2, height / 2);
//   connectButton.mousePressed(connectToSerial);
// }

// function draw() {
//   // project logic
//   background(0);
//   for (let i = 0; i < mElls.length; i++) {
//     let me = mElls[i];
//     fill(me.c, 0, 0);
//     ellipse(me.x, me.y, me.d, me.d);
//   }

//   // update serial: request new data
//   if (mSerial.opened() && readyToReceive) {
//     readyToReceive = false;
//     mSerial.clear();
//     mSerial.write(0xab);
//   }

//   // update serial: read new data
//   if (mSerial.availableBytes() > 8) {
//     receiveSerial();
//   }
// }



function setup() {
	createCanvas(400, 400);
	background(0);

}

function drawheart() {
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = '#FFFFFF';

	fill(255,255,0);
	strokeWeight(2);
	stroke(255,255,255,100);

	push();
	beginShape();
	
	for(var a = 0; a < TWO_PI; a += 0.01){
    var r = noise(10, 10, frameCount / 100) * 10;   //控制爱心变大小的重要参数
		var x = r * 16 * pow(sin(a),3);
		var y = -r * (13*cos(a) - 5*cos(2*a) - 2*cos(3 * a) - cos(4 * a));
		vertex(x,y);
	}
	endShape();
	pop();
}

function draw() {
	background(0,10);
	translate(width/2,height/2);
	drawheart();
 
}