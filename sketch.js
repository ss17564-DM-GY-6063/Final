// serial variables
let mSerial;
let connectButton;
let readyToReceive;

// project variables
let i = 5;

function receiveSerial() {
  let line = mSerial.readUntil("\n");
  trim(line);
  if (!line) return;

  if (line.charAt(0) != "{") {
    print("error: ", line);
    readyToReceive = true;
    return;
  }

  // get data from Serial string
  let data = JSON.parse(line).data;
  // print(data);
  // return;
  let a0 = data.A0;

  // // use data to update project variables
    i = map(a0.value, 0, 4095, 20, 50);
   
  // serial update
  readyToReceive = true;
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);

    readyToReceive = true;
    connectButton.hide();
  }
}

function setup() {
  // setup project
  createCanvas(400, 400);
	background(0);

  // setup serial
  readyToReceive = false;

  mSerial = createSerial();

  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2, height / 2);
  connectButton.mousePressed(connectToSerial);
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
	
	for(let a = 0; a < TWO_PI; a += 0.01){
    for (let i=0; i<10; i+= 0.01) {
    let r = random(0,50);   //控制爱心变大小的重要参数
		let x = r * 16 * pow(sin(a),3);
		let y = -r * (13 * cos(a) - 5 * cos(2*a) - 2 * cos(3 * a) - cos(4 * a));
		vertex(x,y);
    }
	}
	endShape();
	pop();
}

function draw() {
  // project logic
    background(0,10);
    translate(width/2,height/2);
    drawheart();
   
  // update serial: request new data
  if (mSerial.opened() && readyToReceive) {
    readyToReceive = false;
    mSerial.clear();
    mSerial.write(0xab);
  }

  // update serial: read new data
  if (mSerial.availableBytes() > 8) {
    receiveSerial();
  }
}



// function setup() {
// 	createCanvas(400, 400);
// 	background(0);

// }

// function drawheart() {
//   drawingContext.shadowOffsetX = 0;
//   drawingContext.shadowOffsetY = 0;
//   drawingContext.shadowBlur = 10;
//   drawingContext.shadowColor = '#FFFFFF';

// 	fill(255,255,0);
// 	strokeWeight(2);
// 	stroke(255,255,255,100);

// 	push();
// 	beginShape();
	
// 	for(let a = 0; a < TWO_PI; a += 0.01){
//     let r = noise(10, 10, frameCount / 100) * 10;   //the variable can be controlled by sensor?
// 		let x = r * 16 * pow(sin(a),3);
// 		let y = -r * (13 * cos(a) - 5 * cos(2*a) - 2 * cos(3 * a) - cos(4 * a));
// 		vertex(x,y);
// 	}
// 	endShape();
// 	pop();
// }

// function drawemoji() {

// }

// function draw() {
// 	background(0,10);
// 	translate(width/2,height/2);
// 	drawheart();
 
// }