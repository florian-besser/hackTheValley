require('./abi');
var express = require('express');
var Web3 = require('web3');
var web3 = new Web3();

var app = express();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545/'));
var contract = web3.eth.contract(contractAbi);
var theContract = contract.at('0x15fba6f6a793353c5f65e08ef5722b05fe72c2b4');
web3.eth.defaultAccount = '0xf88e609aac9ad4039cddfab35fbf3fd750430097';

app.get('/accounts/:account/slots', (req, res) => {
    theContract.getSlotsNumber((error, response) => {
        if (error) throw error;

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
        +req.query.bluetoothName,
         { gas:4000000 }
    , (error, response) => {
        if (error) throw error;
        res.send(response);
    });
});

app.get('accounts/:account/reservateSlot', (req, resp) => {
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
