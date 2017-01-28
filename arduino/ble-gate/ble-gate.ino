#include <SoftwareSerial.h>
#include <Servo.h>

// TX-O pin of bluetooth mate, Arduino A0
#define bluetoothTxPin A0  
// RX-I pin of bluetooth mate, Arduino A1
#define bluetoothRxPin A1  

SoftwareSerial bluetooth(bluetoothTxPin, bluetoothRxPin);

Servo gate;
int pos;

void setup() {
  // Init traffic lights
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  digitalWrite(8, LOW);
  digitalWrite(9, LOW);
  
  Serial.begin(9600); //init serial port and set baudrate
  while(!Serial); //wait for serial port to connect (needed for Leonardo only)
  Serial.println("\nStart...");
  bluetooth.begin(9600);  // Start bluetooth serial at 9600
  delay(2000);
  Serial.println("Waking up ble module...");
  sendBluetoothInitCommand("WAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUPWAKEUP");

  Serial.println("Sending AT+NAMEBLEGate...");
  sendBluetoothInitCommand("AT+NAMEBLEGate");
  
  Serial.println("Bluetooth setup done.");

  gate.attach(7);
  closeGate();
}

void loop() {
  if(bluetooth.available()) {
    Serial.println("Bluetooth data available");
    while(bluetooth.available()) {
      String command = bluetooth.readStringUntil(';');
      Serial.println("Command: ");
      Serial.println(command);
    }
  }
  while(Serial.available()) {
    String input = Serial.readString();
    if(input.startsWith("OPEN")) {
      openGate();
      delay(5000);
      closeGate();
    } else if(input.startsWith("CLOSE")) {
      closeGate();
    }
  }
}

void openGate() {
  for (pos = 0; pos <= 90; pos++) {
    gate.write(pos);
    delay(15);
  }
  digitalWrite(8, LOW);
  digitalWrite(9, HIGH);
  
}

void closeGate() {
  digitalWrite(8, HIGH);
  digitalWrite(9, LOW);
  for (pos = 90; pos >= 0; pos --) {
    gate.write(pos);
    delay(15);
  }
}


void sendBluetoothInitCommand(String command) {
  bluetooth.print(command);
  delay(3000);
  if(bluetooth.available()) {
    Serial.print("Bluetooth response: ");
    while(bluetooth.available()) {
      char char2 = (char) bluetooth.read();
      Serial.print(char2);
    }
    Serial.print("\n");
  }
}

