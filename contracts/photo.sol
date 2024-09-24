// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract photo {

  struct Memo {
    string name;
    string message;
    uint timestamp;
    address from;
  }

  Memo[] memos;

  address payable admin = payable(0xE88F75C28545011DB58e49867ef901eC0d01A6a3);
  address payable owner;

  constructor() payable {
    owner = payable(msg.sender);
  }

  modifier onlyAdmin {
      require(msg.sender == admin);
      _;
   }
  
  function addFunds(string calldata name, string calldata message) external payable onlyAdmin {
    memos.push(Memo(name, message, block.timestamp, msg.sender));
  }

  function sellPhoto(string calldata name, string calldata message) external {
    address payable receiver = payable(msg.sender);
    uint amount = 1000000000000000;
    receiver.transfer(amount);
    memos.push(Memo(name, message, block.timestamp, msg.sender)); 
  }

  function getMemos() public view returns(Memo[] memory){
     return memos;
  }
}
