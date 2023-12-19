// serial variables
let mSerial;
let connectButton;
let serialButton;
let readyToReceive;
let pred2 = 0;

// project variables
let V;
let color = {
  r: 130,
  g: 255,
  b: 255,
};

// song
let currentSongIndex = 0;
let songs = []; 
let isPlaying = false; 
let mFilter;
let mAmp;
let mFreq;
let fft;

let particles = [];

function preload() {
  songs[0] = loadSound("./California.mp3");
  songs[1] = loadSound("./piano.mp3");
  songs[2] = loadSound("./songnoclick.mp3");
  songs[3] = loadSound("./bach.mp3");
}

function switchSong() {
  if (songs.isPlaying()) {
    songs[currentSongIndex].pause();
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  } else {
    songs[currentSongIndex].play();
  }

  songs[currentSongIndex].loop(); 
  isPlaying = true; 
}

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
  // print(data); //test if the html connected to arduino, the data
  // return;
  let a0 = data.A0;
  let a1 = data.A1;

  let d2 = data.D2.value;
  if(d2 == 1 && pred2 == 0) {
    print("buttonpress")
    if (songs[0].isPlaying()) {
      songs[0].pause();
    } else {
      songs[0].play();
    }
  }
  pred2 = d2;

  // let d2 = data.D2.value;
  // if (d2 == 1 && pred2 == 0) {
  //   switchSong();
  // }
  // pred2 = d2;


  // // use data to update project variables
    color.g = map(a1.value, 0, 4095, 0, 255);
    mFreq = map(a0.value, 0, 4095, 100, 5000);

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

function gotData() {
  let currentString = serial.readStringUntil("\r\n");
  trim(currentString);
  if (!currentString) return;
  latestData = currentString;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();

  // song.disconnect();

  // mFilter = new p5.Filter("bandpass");
  // mFilter.disconnect();
  // mFilter.res(4);

  // mAmp = new p5.Amplitude();

  // song.connect(mFilter);
  // mFilter.connect(p5.soundOut);

  // songs[i].disconnect();
  mFilter = new p5.Filter("bandpass");
  mFilter.disconnect();
  mFilter.res(4);

  mAmp = new p5.Amplitude();

  for (let i = 0; i < songs.length; i++) {
    songs[i].disconnect(); 
    songs[i].connect(mFilter);
  }

  mFilter.connect(p5.soundOut); 

  // setup serial
  readyToReceive = false;
  mSerial = createSerial();
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2, height / 2);
  connectButton.mousePressed(connectToSerial);
}


function drawText() {
  fill(255);
  textSize(15);

  let texts = [
    "This is a physical music Controller",
    "Press the button to play/pause the music",
    "Try to adjust the potentiometers",
    "to see different visual effects",
    "to experience the DJ!"
  ];

  for (let i = 0; i < texts.length; i++) {
    text(texts[i], 20, 50 + 25 * i);
  }
}

function draw() {
  background(0);
  drawText();

  translate(width / 2, height / 2);
  mFilter.freq(mFreq);

  fft.analyze();
  amp = fft.getEnergy(20, 200);
  push();
  if (amp > 230) {
    rotate(random(-0.5, 0.5));
  }
  pop();

  let alpha = map(amp, 0, 255, 180, 150);
  fill(0, alpha);
  noStroke();
  rect(0, 0, width, height);

  stroke(130, color.g, 255);
  strokeWeight(5);
  fill(130, color.g, 255);

  let wave = fft.waveform();

  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 2) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
      let r = map(wave[index], -1, 1, 100, 230);   //the size of circle
      let x = r * sin(i) * t ;
      let y = r * cos(i) ;
      vertex(x, y);
    }
    endShape();
  }

  let p = new Particle();
  particles.push(p);

  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230);
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }

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


class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(160);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
    this.w = random(3, 10);
    this.color = [random(200, 255), random(200, 255), random(200, 255)];
  }

  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }

  edges() {
    if (
      this.pos.x < -width  ||
      this.pos.x > width  ||
      this.pos.y < -height  ||
      this.pos.y > height 
    ) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 4);
  }
}
