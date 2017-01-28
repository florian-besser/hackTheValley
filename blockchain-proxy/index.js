require('./abi');
var express = require('express');
var Web3 = require('web3');
var web3 = new Web3();

var app = express();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545/'));
var contract = web3.eth.contract(contractAbi);
var theContract = contract.at('0x1fb63058d86fe37329112cc299daaa6e9f6e0eeb');
web3.eth.defaultAccount = '0xf88e609aac9ad4039cddfab35fbf3fd750430097';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/accounts/defaultAccount', (req, res) => {
    res.send(web3.eth.defaultAccount);
});

app.get('/accounts/:account/slots', (req, res) => {
    theContract.getSlotsNumber((error, response) => {
        if (error) throw error;
        console.log(+response);

        var slots = [];

        for(let j = 0; j < +response; j++) {
            var slot = theContract.getEntry(j);
            slots.push({
                slotId: slot[0],
                pricePerMinute: slot[1],
                descr: slot[2],
                xCoord: slot[3],
                yCoord: slot[4],
                available: slot[5],
                bluetoothName: slot[6]
            });
        }

        res.send(slots);
    });
});

app.get('/accounts/:account/provideSlot', (req, res) => {
    theContract.provideSlot(+req.query.slotId,
        +req.query.pricePerMinute,
        req.query.descr,
        +req.query.xCoord,
        +req.query.yCoord,
        req.query.bluetoothName,
         { gas:4000000 }
    , (error, response) => {
        if (error) throw error;
        res.send(response);
    });
});

app.get('/accounts/:account/reservateSlot', (req, res) => {
    theContract.reservateSlot(+req.query.slotId,
    +req.query.durationInMinutes,
    { gas:4000000 }
    ,(error, response) => {
        if (error) throw error;
        res.send(response);
    });
});

app.listen(8088, (error) => {
    if (error) throw error;

    console.log('Express webserver running on port 8088');
});
