#include <ArduinoJson.h>

// project variables
int a0Val;
int a1Val;

int buttonPin = 2; // 按钮连接到数字引脚2
int buttonState = 0;

int buttonPin2 = 3;
int buttonState2 = 0;

void sendData() {
  StaticJsonDocument<128> resJson;
  JsonObject data = resJson.createNestedObject("data");
  JsonObject A0 = data.createNestedObject("A0");
  JsonObject A1 = data.createNestedObject("A1");
  JsonObject d2 = data.createNestedObject("D2");
  JsonObject d3 = data.createNestedObject("D3");

  A0["value"] = a0Val;
  A1["value"] = a1Val;
  d2["value"] = buttonState;
  d3["value"] = buttonState2;

  String resTxt = "";
  serializeJson(resJson, resTxt);

  Serial.println(resTxt);
}

void setup() {
  // Serial setup
  Serial.begin(9600);
  while (!Serial) {}

  pinMode(buttonPin, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  // read pins
  a0Val = analogRead(A0);
  a1Val = analogRead(A1);
  buttonState = digitalRead(buttonPin);
  buttonState2 = digitalRead(buttonPin2);


  // check if there was a request for data, and if so, send new data
  if (Serial.available() > 0) {
    int byteIn = Serial.read();
    if (byteIn == 0xAB) {
      Serial.flush();
      sendData();
    }
  }

  // Serial.println(String(a0Val) + " " + a1Val + " " + buttonState + " " + buttonState2);
  delay(20);
}
