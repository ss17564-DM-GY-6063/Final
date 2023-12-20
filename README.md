# finalproject
 
## idea 1
**Music Interaction Project**
Input from Arduino is used for interactive gestures through infrared sensors. Different distances trigger various sound effects or music, and these diverse musical elements are visualized as beautiful patterns on the p5 canvas.
One aspect I'm unsure about regarding this idea is how to establish a linkage between Arduino and p5.js.
![G0PleE.jpg](https://imgpile.com/images/G0PleE.jpg)

## idea 2
**Physical Color Picker**
Due to a strong interest in my previous p5.js color filter project, I wanted to create a color picker that allows users to select colors from the physical world and see the results digitally.
The challenge in this project is how to detect the user's color selection in the physical world, and make connections with digital world. (My initial thought is to use different buttons to represent different colors, but the optimal presentation would involve a physically meaningful color palette.)
![G0PrCr.jpg](https://imgpile.com/images/G0PrCr.jpg)

## idea 3
**Heart Rate NFT**
By detecting the pulse on the wrist, the frequency of the pulse is transmitted to a computer or another device for visualization, allowing each audience member to receive their own NFT.
The challenge in this project lies in how to detect the frequency of the pulse and determine the style of visualization.
[![G0PzVR.jpg](https://imgpile.com/images/G0PzVR.jpg)](https://imgpile.com/i/G0PzVR)


# project proposal, planning and organizing
Based on the heart rate sensor, I will get the value of BPM, I’m thinking about showing this BPM in different emojis of different body conditions. In addition, each beat can cause a change to the main pattern.
![Gg0MWk.png](https://imgpile.com/images/Gg0MWk.png)

## System diagram & FSM diagram
TBD

## Circuit diagram
![Gg0G3F.jpg](https://imgpile.com/images/Gg0G3F.jpg)

## Description of any external data or library that you are planning to use
I found some references on https://projecthub.arduino.cc/ that may be related to my project. I currently don't have specific ideas about libraries, and I may not need to use them.

## Description of any sensor, output component or mechanism that you are planning on using or building
I bought an Ultrasonic Sensor and a Heartbeat Sensor, hoping that Amazon can deliver them on time. In case the modules prove to be challenging to work with, I will start by experimenting with my p5.js effects. Additionally, I have planned to design the appearance of the wearable device to enhance its user-friendliness in interaction.

## Reference images, texts and projects
some reference to the sensor tutorial: 
https://projecthub.arduino.cc/Isaac100/getting-started-with-the-hc-sr04-ultrasonic-sensor-7cabe1
https://projecthub.arduino.cc/SurtrTech/measure-heart-rate-and-spo2-with-max30102-eb4f74
https://www.youtube.com/watch?v=z4ztmNpBmZk
https://pulsesensor.com/pages/code-and-guide

## Plan for user testing
To ensure that each heartbeat project is unique, I will conduct a user test shortly after achieving the basic functionality. I will then make adjustments based on the results of the user test.

## Short discussion of why your project is relevant:
I hope to use the fundamental coding knowledge we've acquired to assist more people, incorporating not only artistic elements but also practical applications.

# pulsesensor broke
Professor helped me to check a lot of times, unfortunately it didn't work. So I put my efforts to another idea and tried.

# update project
I ultimately decided to create a music controller that allows adjusting the output parameters of music, generating corresponding visualizations on an electronic screen. I utilized FFT analysis results to create waveform graphics and incorporated a particle system to enhance the visual effects.

## System diagram
![System diagram](IMG_3545.jpeg)

## FSM diagram
![FSM diagram](IMG_3544.jpeg)

## Circuit diagram
![Circuit diagram](IMG_3546.jpeg)

## Description of any external data or library that you are planning to use
the sound library

## Description of any sensor, output component or mechanism that you are planning on using or building
I chose the potentiometers and the button to adjust the values of music frequency and color.

## Reference images, texts and projects
https://dm-gy-6063-2023f-d.github.io/tutorial/sound-files/
https://github.com/DM-GY-6063-2023F-D/week13

## Short discussion of why your project is relevant:
Given our previous readings, I hope that this project can provide the audience and participants with a tangible sense of music frequencies. When the audience can control the frequency of music output and see the waveform on the screen, it serves as a great means of knowledge dissemination. Furthermore, it might also offer the audience an opportunity to experience the work of a DJ.

## Short discussion of feedback from user testing
Originally, music playback and pause were controlled through mouse clicks, but the audience expressed a stronger preference for achieving this functionality through physical buttons, including the ability to switch songs.

