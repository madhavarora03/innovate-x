const AffiliateRewards = artifacts.require("AffiliateRewards");

module.exports = function (deployer) {
  deployer.deploy(AffiliateRewards, web3.utils.toWei("0.1", "ether"));
};
