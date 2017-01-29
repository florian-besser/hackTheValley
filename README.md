# hackTheValley
Hack The Valley 2017

# System Overview / Big Picture

![alt text](https://github.com/florian-besser/hackTheValley/blob/master/IMG_0322.JPG "Overview")


# How to use this repo

## The smart contract

## Arduino / Geth Barrier

## Driver App

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