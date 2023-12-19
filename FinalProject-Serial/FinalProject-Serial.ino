#include <ArduinoJson.h>

// project variables
int a0Val;
int a1Val;

int buttonPin = 2; // 按钮连接到数字引脚2
int buttonState = 0;

int THRESHOLD = 50;
float prevD9Value = 0;
int prevKnockValue = 0;
int knockCount = 0;

void sendData() {
  StaticJsonDocument<128> resJson;
  JsonObject data = resJson.createNestedObject("data");
  JsonObject A0 = data.createNestedObject("A0");
  JsonObject A1 = data.createNestedObject("A1");

  A0["value"] = a0Val;
  A1["value"] = a1Val;


  String resTxt = "";
  serializeJson(resJson, resTxt);

  Serial.println(resTxt);
}

void setup() {
  // Serial setup
  Serial.begin(9600);
  while (!Serial) {}

  // pinMode(B0PIN, INPUT);
}

void loop() {
  // read pins
  a0Val = analogRead(A0);
  a1Val = analogRead(A1);
 
  // knock
  float currentD9Value = float(analogRead(D9));
  int avgD9Value = int(0.9 * prevD9Value + 0.1 * currentD9Value);
  prevD9Value = avgD9Value;

  int currentKnockValue = (avgD9Value > THRESHOLD);

  if (prevKnockValue != currentKnockValue) {
    knockCount += currentKnockValue;
  }
  prevKnockValue = currentKnockValue;

  // Serial.println(String(currentD9Value) + " " + currentKnockValue + " " + knockCount);


  // check if there was a request for data, and if so, send new data
  if (Serial.available() > 0) {
    int byteIn = Serial.read();
    if (byteIn == 0xAB) {
      Serial.flush();
      sendData();
    }
  }

  // Serial.println(String(a0Val) + " " + a1Val);
  delay(20);
}
