import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";
  
  describe("BookCrud", function () {
    async function deployFixture() {

      const [owner, otherAccount] = await hre.ethers.getSigners();
  
      const BookCrud = await hre.ethers.getContractFactory("BookCrud");
      const bookCrud = await BookCrud.deploy();
  
      return { bookCrud, owner, otherAccount };
    }
  
    it("Should count = 0", async () => {
        const { bookCrud, owner, otherAccount } = await loadFixture(deployFixture);
        const count = await bookCrud.count();
        expect(count).to.lessThanOrEqual(0);
    })

  });