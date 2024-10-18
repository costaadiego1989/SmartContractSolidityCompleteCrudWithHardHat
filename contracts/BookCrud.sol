// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

contract BookCrud {

    struct Book {
        string title;
        uint128 year;
    }

    address private immutable owner;
    uint256 public constant taxAmount = 100000 wei;
    uint128 private nextIndex = 0;
    uint256 public count;

    mapping(uint128 => Book) public books;

    constructor() {
        owner = msg.sender;
    }

    event EventAddBock(address indexed from, Book book, uint256 time);

    error NoFoundsToWithdraw();

    function addBook(Book memory newBook) public payable {
        require(msg.value >= taxAmount, "Do u need to pay tax");
        nextIndex++;
        Book memory book = books[nextIndex] = newBook;
        count++;

        emit EventAddBock(msg.sender, book, block.timestamp);
    }

    function balanceOf() public view returns(uint256) {
        return address(this).balance;
    }

    function transferFrom() public payable restricted {
        uint256 balance = address(this).balance;

        if (balance <= 0) {
            revert NoFoundsToWithdraw();
        } else {
            payable(owner).transfer(balance);
        }

    }

    function updateBook(uint32 index, Book memory newBook) public {
        books[index] = newBook;
    }

    function deleteBook(uint128 index) public restricted {
        if (books[index].year > 0) {
            delete books[index];
            count--;
        }
    }

    modifier restricted() {
        require(owner == msg.sender, "You don't have permission");
        _;
    }

}