#include <SoftwareSerial.h>

int enA = 9;
int in1 = 4;
int in2 = 5;
int enB = 10;
int in3 =6;
int in4 = 7;

char espData;
char readStringEsp();
char WhichServer=' ';
char Dir;
const int trigPinL = 2;
const int echoPinL = 3;
const int trigPinR = 11;
const int echoPinR = 12;
long durationL = 0;
int distanceL=0;
long durationR=0;
int distanceR=0;
int sumRight=0;
int sumLeft=0;

float DistanceLeft(){
  digitalWrite(trigPinL, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPinL, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPinL, LOW);
  durationL = pulseIn(echoPinL, HIGH);
  distanceL= durationL*0.034/2;
  return distanceL;
  }
float DistanceRight(){
  digitalWrite(trigPinR, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPinR, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPinR, LOW);
  durationR = pulseIn(echoPinR, HIGH);
  distanceR= durationR*0.034/2;
  return distanceR;
  }  
 
void Forword(){
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);  
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH); 
  analogWrite(enA, 100);
  analogWrite(enB, 100); 
  }
void Backword(){
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);  
  digitalWrite(in3, HIGH);  
  digitalWrite(in4, LOW)  ; 
  analogWrite(enA, 100);
  analogWrite(enB, 100);
}
void Left(){
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);  
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH); 
  analogWrite(enA, 0);
  analogWrite(enB, 170);
  }
void Right(){
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);  
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW); 
  analogWrite(enA, 170);
  analogWrite(enB, 0);
  }  
void Stop(){
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);  
  digitalWrite(in3, LOW);  
  digitalWrite(in4, LOW); 
  analogWrite(enA, 0);
  analogWrite(enB, 0); 
  }  
  

void setup(){
Serial.begin(9600); 
pinMode(enA, OUTPUT);
pinMode(enB, OUTPUT);
pinMode(in1, OUTPUT);
pinMode(in2, OUTPUT);
pinMode(in3, OUTPUT);
pinMode(in4, OUTPUT);
pinMode(trigPinL, OUTPUT); 
pinMode(echoPinL, INPUT);
pinMode(trigPinR, OUTPUT); 
pinMode(echoPinR, INPUT);
}



void loop(){
espData = readStringEsp();
Serial.println(espData);

if (espData == 't' || espData == 'o'){
  WhichServer = espData;
  }
else{
  Dir = espData;
  }  

while(WhichServer == 'o'){
  espData = readStringEsp();
  Serial.println(espData);

  if (espData == 't' || espData == 'o'){
    WhichServer = espData;
  }
  else{
    Dir = espData;
  }  
  Serial.println("Manual");
  if(Dir == 's'){
   Serial.println("Stop");
   Stop();
   }
  else if(Dir == 'b'){
    Serial.println("back");
    Backword();
    }
  else if(Dir == 'f'){
    Serial.println("Forword");
    Forword();
    }
  else if(Dir == 'l'){
    Serial.println("Left");
    Left();
    }  
  else if(Dir == 'r'){
    Serial.println("Right");
    Right();
    } 
  }  
  
while(WhichServer == 't'){
  espData = readStringEsp();
  Serial.println(espData);
  
  if (espData == 't' || espData == 'o'){
    WhichServer = espData;
  }
  else{
    Dir = espData;
  } 
  Serial.println("Automatic");
    if(Dir == 's'){
      Serial.println("Stop");
      Stop();
      }
    else if(Dir == 'f'){
      Serial.println("Forword");
      Forword();
      delay(800);
      analogWrite(enA, 0);
      analogWrite(enB, 0);
      delay(200 );
      }
     else if(Dir == 'l'){
      Serial.println("Left");
      Left();
      delay(250);
      analogWrite(enA, 0);
      analogWrite(enB, 0); 
      delay(750);
      }
     else if(Dir == 'r'){
      Serial.println("Right");
      Right();
      delay(250);
      analogWrite(enA, 0);
      analogWrite(enB, 0);
      delay(750); 
      }
  distanceR = DistanceRight();
  distanceL = DistanceLeft();
  if((distanceR <20)&&(distanceL > 20) && (distanceR != 0)&&(distanceL != 0)){
    Serial.println("Right Object");
    Left();
    delay(300);
    Forword();
    delay(400);
    Stop();
    
    }
  else if((distanceR >20)&&(distanceL < 20) && (distanceR != 0)&&(distanceL != 0)){
    Serial.println("Left Object");
    Right();
    delay(300);
    Forword();
    delay(400);
    Stop();
    }  

 
} 
}
char readStringEsp() {
  char dataRecieved ;
  char chBuffer;
  while (Serial.available() > 0) {
    chBuffer =  (char) Serial.read();
    dataRecieved = chBuffer;
    return dataRecieved;
   }  
   }
