pragma solidity ^0.4.4;
contract Parking {

    struct ProvidedSlot
     {
        address owner;
        uint32 slotId;
        uint32 pricePerMinute; 
        string descr;
        uint32 xCoord;
        uint32 yCoord;
        bool available;
        string bluetoothName;
        uint256 slotArrayIndex;
     }

     struct ReservatedSlot
     {
         address driver;
         uint32 slotId;
         uint256 from;
         uint32 durationInMinutes;
     }

     mapping (uint32 => ProvidedSlot) providedSlotsBySlotId;
     mapping (address => ReservatedSlot) reservatedSlotsByDriverAddr;

     uint32[] slotIds;

    function Parking() {

    }

    function provideSlot(uint32 slotId, uint32 pricePerMinute, string descr, uint32 xCoord, uint32 yCoord, string bluetoothName) returns (bool success) {
        if (providedSlotsBySlotId[slotId].owner != 0x0) {
            throw;
        }
        providedSlotsBySlotId[slotId] = ProvidedSlot(msg.sender, slotId, pricePerMinute, descr, xCoord, yCoord, true, bluetoothName, slotIds.length);
        slotIds.length++;
        slotIds[slotIds.length - 1] = slotId;

        success = true;
    }

    //TODO: only the OWNER should be able to delete a slot!
    function deleteSlot(uint32 slotId) returns (bool success) {
        delete providedSlotsBySlotId[slotId].owner;
        delete providedSlotsBySlotId[slotId].slotId;
        delete providedSlotsBySlotId[slotId].pricePerMinute;
        delete providedSlotsBySlotId[slotId].descr;
        delete providedSlotsBySlotId[slotId].xCoord;
        delete providedSlotsBySlotId[slotId].yCoord;
        delete providedSlotsBySlotId[slotId].available;
        delete providedSlotsBySlotId[slotId].bluetoothName;

        //Hack: 
        uint256 index = providedSlotsBySlotId[slotId].slotArrayIndex;
        if (index == slotIds.length - 1) {
            //Delete last index, simply drop last part of array
            slotIds.length--;
        } else {
            //Deleting something inside the array, move the last element to the location to be deleted, then drop the last element
            slotIds[index] = slotIds[slotIds.length - 1];
            slotIds.length--;

            uint32 slotIdMoved = slotIds[index];
            providedSlotsBySlotId[slotIdMoved].slotArrayIndex = index;
        }
    }

    function getSlotsNumber() constant returns (uint256 slotNumber) {
        slotNumber = slotIds.length;
    } 

    function getEntry(uint32 slotNumber) constant returns (uint32 slotId, uint32 pricePerMinute, string descr, uint32 xCoord, uint32 yCoord, bool available, string bluetoothName) {
        slotId = slotIds[slotNumber];

        pricePerMinute = providedSlotsBySlotId[slotId].pricePerMinute;
        descr = providedSlotsBySlotId[slotId].descr;
        xCoord = providedSlotsBySlotId[slotId].xCoord;
        yCoord = providedSlotsBySlotId[slotId].yCoord;
        available = providedSlotsBySlotId[slotId].available;
        bluetoothName = providedSlotsBySlotId[slotId].bluetoothName;        
    }
 
    function hasAccess(uint32 slotId, address addr) constant returns (bool access) {
        uint256 from = reservatedSlotsByDriverAddr[addr].from;
        uint32 durationInSeconds = reservatedSlotsByDriverAddr[addr].durationInMinutes * 60;
       // if (from + durationInSeconds >= block.timestamp) {
       //     access = reservatedSlotsByDriverAddr[addr].slotId == slotId;
       // } else {
       //     access = false; //Timed out
       // }

        access = reservatedSlotsByDriverAddr[addr].slotId == slotId;
    }

    function reservateSlot(uint32 slotId, uint32 durationInMinutes) payable returns (bool success) {
        if(!providedSlotsBySlotId[slotId].available){
            return false;
        }

        ProvidedSlot ps = providedSlotsBySlotId[slotId];
    
        if (msg.value < durationInMinutes * ps.pricePerMinute) {
            //TODO: Verify that enough ETHER was submitted for the entire duration
            //return false;
        }
        ps.available = false; //flag it as reservated

        reservatedSlotsByDriverAddr[msg.sender].driver = msg.sender;
        reservatedSlotsByDriverAddr[msg.sender].slotId = slotId;
        reservatedSlotsByDriverAddr[msg.sender].from = block.timestamp;
        reservatedSlotsByDriverAddr[msg.sender].durationInMinutes = durationInMinutes;
        
        return true;
    }

    //for fast development
    function cleanUpReservation(uint32 slotId) returns (bool success){
        providedSlotsBySlotId[slotId].available = true; //flag it as reservated

        delete reservatedSlotsByDriverAddr[msg.sender].driver;
        delete reservatedSlotsByDriverAddr[msg.sender].slotId;
        delete reservatedSlotsByDriverAddr[msg.sender].from;
        delete reservatedSlotsByDriverAddr[msg.sender].durationInMinutes;
    }
}