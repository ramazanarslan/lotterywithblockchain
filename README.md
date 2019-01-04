# CmpE483: Lottery As a Solidity Smart Contract

## DEMO 
https://lottery483.herokuapp.com/


You can view it on the course page: https://piazza.com/boun.edu.tr/spring2018/cmpe483/resources



<h2>Function Calls:</h2>

+ <b>purchase(uint ticket number, bytes32 hash) public payable:</b> 
Payable function to buy ticket and enter the random number. Before running this function, all the user must generate their own secret number by commintment of their N with addresses and give those input parameters to this function to be able to run it. Simply, generateHash function helps to generate hashes. It can be used in that part.
  
+ <b>function reveal(uint32 ticketNumber) public:</b><br>
  2nd round. Users must reveal their numbers. If their commintments from 1st round is matching with this commintment by entering number. Than, it is okey for that user to go on.
  
