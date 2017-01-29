# hackTheValley
Hack The Valley 2017

# System Overview / Big Picture

![alt text](https://github.com/florian-besser/hackTheValley/blob/master/IMG_0322.JPG "Overview")

# How to use this repo

## The smart contract

The smart contract is registered once, globally. It can be found at the address **0x1fb63058d86fe37329112cc299daaa6e9f6e0eeb** on the norsborg test net.

If you wish to look at the source, you can find it in the *contract* folder.

If you want to deploy your own contract, have a look at the **For Developers** section below.

## Arduino / Geth Barrier

The arduino control (on the same device running geth) can be found in *arduino/control.py*.

The low-level arduino code to be run on the arduino itself can be found in *arduino/ble-gate/ble-gate.ino*

The Arduino will listen for incoming data via Bluetooth. The data sent should be the address of the driver which previously reservated a parking slot. 

It will send this data to the control component, which will verify whether the address truly reserved the slot.

The copntrol component will then send back the command to open the gate or not.

## Driver App

An Ionic app for your viewing pleasure.

Download the **Ionic View** App from the App Store (Android & iPhone currently). Create an account in the App and then enter **9e8710c8** as App Id.

You must first confirm the IP and port for your corresponding NodeJs server. The NodeJS server must be set up so that it can communicate with a Geth node.

Then switch over to the **Find Parking** tab and you'll see parking spaces fetched from the Blockchain. Select which parking slot you want and follow the GUI.

# For Developers

## The Geth CLI

### Useful general commands

Disable log output for geth:
```
debug.verbosity(1)
```

### Generating / unlocking accounts
```
personal.newAccount("<password>");

web3.eth.defaultAccount = eth.accounts[1];

web3.personal.unlockAccount(eth.accounts[1], "<password>", 1000);
```
### Deploying the smart contract

Copy the entire contract in *contract/parking.sol* into [Browser Solidity](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.8+commit.60cc1668.js)

Copy the output in the text area marked **Web3 deploy** into Geth

Alternatively, you can compile the contract in *contract/parking.sol*, or use the compilation output from the bin folder.

### Loading a contract 

Copy the entire contract in *contract/parking.sol* into [Browser Solidity](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.8+commit.60cc1668.js)

Copy the variable **parkingContract** in the text area marked **Web3 deploy** into Geth.
```
var theContract = parkingContract.at('<address>');
```
### Working on a contract
Providing a new parking slot (*1337* being the unique **slot id**):
```
theContract.provideSlot(1337, 10, "ArduinoTest", 123, 456, "bluetoothName", {gas:4000000});
theContract.provideSlot(<slot id>, <price in wei per minute>, <description>, <xCoord>, <yCoord>, <name of the bluetooth device>, {gas:4000000});
```
Reservating a slot:
```
theContract.reservateSlot(1337, 60, {gas:4000000, value:600});
theContract.reservateSlot(<slot id>, <minutes>, {gas:4000000, value:<price in wei per minute>*<minutes>});
```
Checking if an address has access (only the address which did the reservation has access):
```
theContract.hasAccess(1337, "0x4936c7d5785d9189a5d1af838c3fadcd0db1da3c");
theContract.reservateSlot(<slot id>, <address>);
```
### Debug transactions
```
eth.getTransactionReceipt("0xb0b202a37cc995d047ae7750f191979e39c05ddc53386e4d1a705bfd867003bf")
eth.getTransactionReceipt(<transaction id>)
```