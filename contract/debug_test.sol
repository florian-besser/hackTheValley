pragma solidity ^0.4.4;

import 'dapple/test.sol';

contract ECRecoverTest is Test {
  function testRecovery() {
    bytes32 foobar = 0x38d18acb67d25c8bb9942764b62f18e17054f66a817bd4295423adf9ed98873e;
    uint8 v = 28;
    bytes32 r = 0xac626c104af7b7972ba9cfbf76a311c78b33201c266eb37cedb7d261d2afe709;
    bytes32 s = 0x040714b10cb16d98c2ff0a80fa02e24088133d059d443e01240b41a5c049b62c;

    log_address(ecrecover(foobar, v, r, s));
  }
}