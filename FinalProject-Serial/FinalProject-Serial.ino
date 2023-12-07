#include <ArduinoJson.h>

// project variables
int a0Val;

void sendData() {
  StaticJsonDocument<128> resJson;
  JsonObject data = resJson.createNestedObject("data");
  JsonObject A0 = data.createNestedObject("A0");

  A0["value"] = a0Val;

  String resTxt = "";
  serializeJson(resJson, resTxt);

  Serial.println(resTxt);
}

void setup() {
  // Serial setup
  Serial.begin(9600);
  while (!Serial) {}
}

void loop() {
  // read pins
  a0Val = analogRead(A0);

  // check if there was a request for data, and if so, send new data
  if (Serial.available() > 0) {
    int byteIn = Serial.read();
    if (byteIn == 0xAB) {
      Serial.flush();
      sendData();
    }
  }

  // Serial.println(a0Val);
  // Serial.println(String(a0Val) + " " + a1Val + " " + a6Val);
  delay(20);
}