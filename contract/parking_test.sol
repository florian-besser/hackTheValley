pragma solidity ^0.4.4;

// virtual "dapple" package imported when `dapple test` is run
import 'dapple/test.sol';
import 'parking.sol';

// Deriving from `Test` marks the contract as a test and gives you access to various test helpers.
contract ParkingTest is Test {
    Parking parking;
    Tester proxy_tester;
    // The function called "setUp" with no arguments is
    // called on a fresh instance of this contract before
    // each test.
    function setUp() {
        parking = new Parking();
        proxy_tester = new Tester();
        proxy_tester._target(parking);
    }
    
    function testEmptyContractZeroSlots() logs_gas() {
        assertEq( parking.getSlotsNumber(), 0);
    }

    function testProvideSlotOneSlot() logs_gas() {
        parking.provideSlot(1, 123, "desc", 0, 0);
        assertEq( parking.getSlotsNumber(), 1);
    }

    function testDeleteSlotNoMoreSlotsPresent() logs_gas() {
        parking.provideSlot(1, 123, "desc", 0, 0);
        parking.provideSlot(2, 123, "desc", 0, 0);
        parking.deleteSlot(1);
        assertEq( parking.getSlotsNumber(), 1);
        parking.deleteSlot(2);
        assertEq( parking.getSlotsNumber(), 0);
    }
}