#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h> 
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include<SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h>
SoftwareSerial s(3,1);

const char* ssid = "STUDBME2";
const char* password = "BME2Stud";
constexpr uint8_t RST_PIN = D3;     // Configurable, see typical pin layout above
constexpr uint8_t SS_PIN = D4;     // Configurable, see typical pin layout above


MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
MFRC522::MIFARE_Key key;
String tag="";
String payload="";
char WhichServer=' ';

void setup() {
  s.begin(9600);
  Serial.begin(9600);
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.println("Connecting.."); 
  }
  Serial.println("CONNECTED");
}


void loop() {
  
if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

  HTTPClient http;  //Declare an object of class HTTPClient
  http.begin("http://172.28.133.173:5000/");  //Specify request destination
  int httpCode = http.GET();                                                                  //Send the request
  if (httpCode > 0) { //Check the returning code
    payload = http.getString(); //Get the request response payload
    s.write(payload[12]);
    Serial.println(payload[12]);
    if (payload[12] == 'o' || payload[12]== 't'){
      WhichServer = payload[12];
    }; 
    http.end();
  }
  if (WhichServer == 't'){
    http.begin("http://172.28.133.173:5000/image");  //Specify request destination
    int httpCode = http.GET();                                                                  //Send the request
    if (httpCode > 0) { //Check the returning code
      payload = http.getString(); //Get the request response payload
      s.write(payload[0]);
      Serial.println(payload[0]); 
    }
    delay(1500);
    http.end();
  };
  if (WhichServer == 'o'){
        //Specify request destination
  if ( ! rfid.PICC_IsNewCardPresent()){
      http.begin("http://172.28.133.173:5000/");  //Specify request destination
    int httpCode = http.GET();                                                                  //Send the request
    if (httpCode > 0) { //Check the returning code
      payload = http.getString(); //Get the request response payload
      s.write(payload[12]);
      Serial.println(payload[12]); 
    delay(100);   
    http.end();   //Close connection
  
    };}
   if (rfid.PICC_ReadCardSerial()) {
      http.begin("http://172.28.133.173:5000/id");
      for (byte i = 0; i < 4; i++) {
        tag += rfid.uid.uidByte[i];
      }
      Serial.println(tag);
      rfid.PICC_HaltA();
      rfid.PCD_StopCrypto1();
   
    http.addHeader("Content-Type", "application/json");
    String httpRequestData = "{\"id\":\"" + String(tag) + "\"}";           
    // Send HTTP POST request
    int httpResponseCode = http.POST(httpRequestData);
    tag = "";
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    delay(00);   
    http.end(); }  //Close connection
  
    
  
  }
}
}  
