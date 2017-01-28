pragma solidity ^0.4.4;
contract parking {

     struct ProvidedSlot
     {
        address owner;
        uint32 slotId;
        uint32 pricePerMinute; 
        string descr;
        uint32 xCoord;
        uint32 yCoord;
        bool available;
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

    function provideSlot(uint32 slotId, uint32 pricePerMinute, string descr, uint32 xCoord, uint32 yCoord) returns (bool success) {
        providedSlotsBySlotId[slotId] = ProvidedSlot(msg.sender, slotId, pricePerMinute, descr, xCoord, yCoord, true, slotIds.length);
        slotIds.length++;
        slotIds[slotIds.length - 1] = slotId;

        success = true;
    }

    function deleteSlot(uint32 slotId) returns (bool success) {
        delete providedSlotsBySlotId[slotId].owner;
        delete providedSlotsBySlotId[slotId].slotId;
        delete providedSlotsBySlotId[slotId].pricePerMinute;
        delete providedSlotsBySlotId[slotId].descr;
        delete providedSlotsBySlotId[slotId].xCoord;
        delete providedSlotsBySlotId[slotId].yCoord;
        delete providedSlotsBySlotId[slotId].available;

        //Hack: 
        uint256 index = providedSlotsBySlotId[slotId].slotArrayIndex;
        slotIds[index] = slotIds[slotIds.length - 1];
        slotIds.length--;

        providedSlotsBySlotId[slotIds[index]].slotArrayIndex = index;
    }

    function getSlotsNumber() constant returns (uint256 slotNumber) {
        slotNumber = slotIds.length;
    } 

    function getEntry(uint32 slotNumber) constant returns (uint32 slotId, uint32 pricePerMinute, string descr, uint32 xCoord, uint32 yCoord, bool available) {
        slotId = slotIds[slotNumber];

        pricePerMinute = providedSlotsBySlotId[slotId].pricePerMinute;
        descr = providedSlotsBySlotId[slotId].descr;
        xCoord = providedSlotsBySlotId[slotId].xCoord;
        yCoord = providedSlotsBySlotId[slotId].yCoord;
        available = providedSlotsBySlotId[slotId].available;
    }

    function hasAccess(uint32 slotId, address addr) constant returns (bool access) {
        access = reservatedSlotsByDriverAddr[addr].slotId == slotId;
    }

    function bookSlot(uint32 slotId, uint32 durationInMinutes) payable returns (bool success) {
        if(!providedSlotsBySlotId[slotId].available){
            return false;
        }
    
        providedSlotsBySlotId[slotId].available = false; //flag it as reservated

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