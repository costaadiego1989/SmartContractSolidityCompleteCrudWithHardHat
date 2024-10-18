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

    it("Should count = 1 (addBook)", async () => {
        const { bookCrud, owner, otherAccount } = await loadFixture(deployFixture);
        await bookCrud.addBook({
            title: "O Senhor dos Anéis: A Sociedade do Anel",
            year: 2001
        },
        {
            value: hre.ethers.parseUnits("100000", "wei")
        });
        const count = await bookCrud.count();
        expect(count).to.equal(1);
    })

    it("Should be edit a book", async () => {
        const { bookCrud, owner, otherAccount } = await loadFixture(deployFixture);
        await bookCrud.addBook({
            title: "O Senhor dos Anéis: A Sociedade do Anel",
            year: 2001
        },
        {
            value: hre.ethers.parseUnits("100000", "wei")
        });

        await bookCrud.updateBook(1, {
            title: "O Senhor dos Anéis: As Duas Torres",
            year: 2004
        });

        const book = await bookCrud.books(1);
        expect(book.title).to.equal("O Senhor dos Anéis: As Duas Torres");
    })

    it("Should be remove a book", async () => {
        const { bookCrud, owner, otherAccount } = await loadFixture(deployFixture);
        await bookCrud.addBook({
            title: "O Senhor dos Anéis: A Sociedade do Anel",
            year: 2001
        },
        {
            value: hre.ethers.parseUnits("100000", "wei")
        });

        await bookCrud.deleteBook(1);
        const count = await bookCrud.count();

        expect(count).to.equal(0);
    })

  });