pragma solidity ^0.8.0;
contract ImageData {
  uint public price;
  address payable public user;
  address payable public app;
  enum State {Created, Locked, Release, Inactive}
  State public state;
  
  modifier condition(bool c) {
    require(c);
    _;
  }

  modifier onlyApp() {
    if (msg.sender != app)
       revert OnlyApp();
    _;
  }

  modifier onlyUser() {
    if (msg.sender != user)
       revert OnlyUser();
    _;
  }

  modifier inState(State s) {
    if (state != s)
       revert InvalidState();
    _;
  }

  event Aborted();
  event Confirmed();
  event DataRecieved();
  event Refund();

  constructor() payable {
    user = payable(msg.sender);
    price = msg.price / 2;
    if ((2 * price) != msg.price)
    revert ValueNotEven();
  }
  //aborts the exchange and returns the ether 
  function abort()
    external
    onlyUser
    instate(State.Created)
  {
    emit Aborted();
    state = State.Inactive;
    user.transfer(address(this).balance);
  }

  function confirmPurchase()
    external
    inState(State.Created)
    condition(msg.price == (2*price))
    payable
  {
    emit Confirmed();
    app = payable(msg.sender);
    state = State.Locked;
  }

  function confirmRecieved()
    external
    onlyApp
    instate(State.locked)
  {
    emit DataReceived();
    state = State.Release;
    app.transfer(price)
  }
 
  function refundSeller()
    external
    onlyUser
    inState(State.Release)
    {
      emit Refunded();
      user.transfer(3*value);
    }
}
    


