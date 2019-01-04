# CmpE483: Lottery As a Solidity Smart Contract
## homework-2-fall-2018

## DEMO 
https://lottery483.herokuapp.com/


You can view it on the course page: https://piazza.com/boun.edu.tr/spring2018/cmpe483/resources


- Title: cmpe483fall2018hw2.pdf: [https://piazza.com/class_profile/get_resource/jma6isk330o1r9/jpc6y8ytch64n2](https://piazza.com/class_profile/get_resource/jma6isk330o1r9/jpc6y8ytch64n2)
- You can view it on the course page: [https://piazza.com/boun.edu.tr/fall2018/cmpe483/resources](https://piazza.com/boun.edu.tr/fall2018/cmpe483/resources)
# Caution:
- While deploying "lottery.sol", set the gas limit to more than 3.5M.
# Authors:
- Ramazan Arslan |  Hasan Berat Özfidan | Ali Mehran | Muhsin Uçarkuş (Bogazici University/ Computer Engineering Department)
# Introduction:
- Modern cryptocurrency systems like Ethereum allow complex financial transactions happen through scripts called smart contracts. They are afull-fledged programs run on blockchains. Smart contract programming languages like Solidity are turing-complete simply means they allow you to do much more than systems like bitcoin that uses a scripting language ,"Script", which is simple, stack-based, and processed from left to right; it is intentionally not Turing-complete with no loops for security reasons. Because of these features of smart contracts they have found their applications through different areas and they allow you to do more than just transferring money over network.

- Some applications of smart contracts :
  * Media: email, social media, advertisement
  * Education: certification, artificial intelligence
  * Finance: smart shopping, international trade
  * Logestic: cargo tracking, digital identity
  * Entertainment: game, lottery

## What is done in this project:
-  Create React Web Application to display Contracts User Interface 

https://lottery483.herokuapp.com/

you can clone here
https://github.com/ramazanarslan/lotterywithblockchain



-  In this project we created smart contract in both:
    *  eBloc Network
    *  Ropspen Test Network
- We will provide user interface in order to serve these data without running a node and not conflicting with network properties by using Metamask accounts in Ropspen network
    * Any person who has Metamask account can use our coming website to see what is in our smart conract
    * **Website** : "will be uploaded-under developement"
## In our user interface you can do:
- "This part will be implemented in second part of the project later"
# Our Smart Contract:
- We implemented two contracts, "lottery.sol" and "lottery_test.sol". The first one contains all the functionality of lottery mechanism which in future tries will go under optimzation for better security, concurrency and cost efficiency in order to  provide safety for participants and contract itself, faster execution, and less gas consumption objectives.
- You can find proper optimization schemes in these links:
    - http://delivery.acm.org/10.1145/3090000/3087835/p303-dickerson.pdf?ip=193.140.194.16&id=3087835&acc=ACTIVE%20SERVICE&key=956257EA1AE17323%2E900583647E9C9DBE%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35&__acm__=1544127084_48611a23dc68c053bed5fbc7ad91dc11
    - https://brage.bibsys.no/xmlui/bitstream/handle/11250/2479191/18400_FULLTEXT.pdf?sequence=1
    - https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=7884650
- "lottery_test.sol" is provided to test the main contract with different possible scenarios.
- Contract "lottery.sol" contains several functions which are described in next section.
## Functions:
| Function Name | Parameters | Description
| ------ | ------ | ------ |
| hashGen | (uint256 randomNumber) | returns a byte32 which is sha256 output for concatenation of random value generated locally by participant with his address. We call this combination participant's commitment. Example: ```sha256(randomNumber,address)``` .
| purchase | (uint256 ticketNumber) | returns nothing. It's a payable function which checks boundary conditions like submission and reveal time intervals, and the value sent by participant for buying ticket.This function also stores participant's personal information like ticket number and commitment.  |
| result |()| returns nothing. In this function we extract lucky tickets among all, we check if we have enough money gathered in contract to pay all the prizes, and donate the remaning money to a charity address. |
| reveal |(uint256 randomNumber)| returns nothing. In reveal stage of lottery it does some checks, it verifies participant's commitment and stores his revealed random number in our database.|
| withdrawMoney |(uint256 ticket)| returns nothing. In this function we let participants to withdraw their prizes. In case of lottery failure, we let them to withdraw their refunded ticket prices.|
