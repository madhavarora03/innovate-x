const AffiliateRewards = artifacts.require("AffiliateRewards");

contract("AffiliateRewards", (accounts) => {
  const [owner, addr1, addr2] = accounts;

  beforeEach(async () => {
    this.affiliateRewards = await AffiliateRewards.new(
      web3.utils.toWei("0.1", "ether"),
      { from: owner }
    );
  });

  it("Should allow a purchase with a referrer", async () => {
    await this.affiliateRewards.purchase(addr2, {
      from: addr1,
      value: web3.utils.toWei("1", "ether"),
    });

    const referrerBalance = await this.affiliateRewards.balances(addr2);
    const buyerBalance = await this.affiliateRewards.balances(addr1);
    assert.equal(referrerBalance.toString(), web3.utils.toWei("0.1", "ether"));
    assert.equal(buyerBalance.toString(), web3.utils.toWei("0.1", "ether"));
  });

  it("Should allow a purchase without a referrer", async () => {
    await this.affiliateRewards.purchase(
      "0x0000000000000000000000000000000000000000",
      { from: addr1, value: web3.utils.toWei("1", "ether") }
    );

    const buyerBalance = await this.affiliateRewards.balances(addr1);
    assert.equal(buyerBalance.toString(), "0");
  });

  it("Should allow withdrawal of rewards", async () => {
    await this.affiliateRewards.purchase(addr2, {
      from: addr1,
      value: web3.utils.toWei("1", "ether"),
    });
    await this.affiliateRewards.withdraw({ from: addr2 });

    const referrerBalance = await web3.eth.getBalance(addr2);
    assert.isAbove(
      Number(referrerBalance),
      Number(web3.utils.toWei("100", "ether"))
    );
  });

  it("Should only allow owner to set reward amount", async () => {
    try {
      await this.affiliateRewards.setRewardAmount(
        web3.utils.toWei("0.2", "ether"),
        { from: addr1 }
      );
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(
        error.message.includes("Not the contract owner"),
        `Unexpected error: ${error.message}`
      );
    }

    await this.affiliateRewards.setRewardAmount(
      web3.utils.toWei("0.2", "ether"),
      { from: owner }
    );
    const rewardAmount = await this.affiliateRewards.rewardAmount();
    assert.equal(rewardAmount.toString(), web3.utils.toWei("0.2", "ether"));
  });
});
