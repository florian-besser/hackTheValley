pragma solidity ^0.4.1;
contract parking {

    function provideSlot(uint32 slotId, uint32 pricePerMinute, string descr, uint32 xCoord, uint32 yCoord) returns (bool success) {

    }

    function getFreeSlotsNumber() constant returns (uint32 slotNumber) {

    } 

    function getEntry(uint32 slotNumber) constant returns (uint32 slotId, uint32 pricePerMinute, string descr, uint32 xCoord, uint32 yCoord) {

    }

    function hasAccess(uint32 slotId, address address) constant returns (bool access) {

    }

    function bookSlot(uint32 slotId, uint32 durationInMinutes) returns (bool success) {

    }

    //for fast development
    function cleanUp(uint32 slotId) returns (bool success){

    }
}