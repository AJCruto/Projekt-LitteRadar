#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>

// important
const char* ssid = "litteradar1";
const char* password = "123456789";

// Define the RX and TX pins connected to the NEO-6M GPS module
const int RXPin = D2;  // Connect to TX of the GPS module
const int TXPin = D1;  // Connect to RX of the GPS module

// Set the GPS baud rate
const int GPSBaud = 9600;

WiFiClient client;

// Create a software serial connection to the GPS module
SoftwareSerial gpsSerial(RXPin, TXPin);

// The TinyGPS++ object
TinyGPSPlus gps;

// important: don't forget to rename the garbage bin name
String garbage_bin_name = "bin-2";

char latitude[12]; 
char longitude[12]; 

void setup(){
  Serial.begin(9600);
  gpsSerial.begin(GPSBaud);
  WiFi.begin(ssid, password);
  Serial.println(F("Device Initializing ..."));

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(F("Waiting for connection ..."));
  }

  Serial.println(F("Device Ready ..."));
}

void loop() {

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("not connected ....");
    return;
  }

    while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      if (gps.location.isValid()) {

        std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
        client->setInsecure();

        HTTPClient https;

        dtostrf(gps.location.lat(), 4, 6, latitude); 
        dtostrf(gps.location.lng(), 4, 6, longitude); 

        String url = "https://litteradar.bucocu.net/api/garbage-bin/" + String(garbage_bin_name) + "/" + String(longitude) + "/" + String(latitude);

        Serial.println("Latitude: " + String(gps.location.lat(), 6) + ", Longitude: " + String(gps.location.lng(), 6));
        Serial.println("URL: " + url);

        https.begin(*client, url);
        https.addHeader("Content-Type", "text/json");

        int httpCode = https.GET();
        String payload = https.getString();

        Serial.print(F(" Response Code: "));
        Serial.println(httpCode);

        delay(10000);
      } else {
        Serial.println("Waiting for GPS signal...");
      }
    }
  }

  // If no data is coming through, check your connections.
  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println("No GPS detected: check wiring.");
  }
}