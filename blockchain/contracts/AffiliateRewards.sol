// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AffiliateRewards {
    address public owner;
    uint public rewardAmount;

    mapping(address => uint) public balances;
    mapping(address => uint) public loyaltyPoints;

    event Purchase(
        address indexed buyer,
        address indexed referrer,
        uint amount
    );
    event Reward(address indexed user, uint amount);

    constructor(uint _rewardAmount) {
        owner = msg.sender;
        rewardAmount = _rewardAmount;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function purchase(address referrer) public payable {
        require(msg.value > 0, "Purchase amount must be greater than zero");

        if (referrer != address(0) && referrer != msg.sender) {
            balances[referrer] += rewardAmount;
            balances[msg.sender] += rewardAmount;
            emit Reward(referrer, rewardAmount);
            emit Reward(msg.sender, rewardAmount);
        }

        loyaltyPoints[msg.sender] += msg.value;
        emit Purchase(msg.sender, referrer, msg.value);
    }

    function withdraw() public {
        uint amount = balances[msg.sender];
        require(amount > 0, "No funds to withdraw");

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function setRewardAmount(uint _rewardAmount) public onlyOwner {
        rewardAmount = _rewardAmount;
    }
}
