# hackTheValley
Hack The Valley 2017

# Useful general commands

Disable log output for geth:
debug.verbosity(1)

# Generating / unlocking accounts
personal.newAccount("zuehlke");
web3.eth.defaultAccount = eth.accounts[1];
web3.personal.unlockAccount(eth.accounts[1], "zuehlke", 1000);

# Deploying a contract

Copy the entire contract in contract/parking.sol into https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.8+commit.60cc1668.js
Copy the output in the text area marked "Web3 deploy" into Geth

# Loading a contract 

Uses the same variable "parkingContract" which was defined in the section above.
var theContract = parkingContract.at('0x3f450821dde5a19cc5b61340ad1944a37d515363');

# Working on a contract

theContract.provideSlot(1337, 0, "ArduinoTest", 123, 456, "bluetoothName", {gas:4000000});

//My Account: "0x4936c7d5785d9189a5d1af838c3fadcd0db1da3c"
theContract.reservateSlot(1337, 10000);

theContract.hasAccess(1337, "0x4936c7d5785d9189a5d1af838c3fadcd0db1da3c");

# Debug transactions

eth.getTransactionReceipt("0xb0b202a37cc995d047ae7750f191979e39c05ddc53386e4d1a705bfd867003bf")
