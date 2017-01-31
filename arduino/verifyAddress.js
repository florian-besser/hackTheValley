var contractAbi = [{"constant":false,"inputs":[{"name":"slotId","type":"uint32"},{"name":"pricePerMinute","type":"uint32"},{"name":"descr","type":"string"},{"name":"xCoord","type":"uint32"},{"name":"yCoord","type":"uint32"}],"name":"provideSlot","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"slotId","type":"uint32"}],"name":"cleanUpReservation","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"slotId","type":"uint32"},{"name":"addr","type":"address"}],"name":"hasAccess","outputs":[{"name":"access","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"slotNumber","type":"uint32"}],"name":"getEntry","outputs":[{"name":"slotId","type":"uint32"},{"name":"pricePerMinute","type":"uint32"},{"name":"descr","type":"string"},{"name":"xCoord","type":"uint32"},{"name":"yCoord","type":"uint32"},{"name":"available","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"slotId","type":"uint32"},{"name":"durationInMinutes","type":"uint32"}],"name":"reservateSlot","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getSlotsNumber","outputs":[{"name":"slotNumber","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"slotId","type":"uint32"}],"name":"deleteSlot","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"}];

var address = "0x1fb63058d86fe37329112cc299daaa6e9f6e0eeb";

var contract = web3.eth.contract(contractAbi).at(address);

// var slotId = 33;

// var driverAddress = "0x8c99ca0e55ec2f35ad18e9e7a20883ad1ffe859e";

// contract.hasAccess(slotId, driverAddress);
