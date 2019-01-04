pragma solidity ^0.4.24;

contract Lottery{
  
   
    uint public ticketPrice;
    uint public submissionDeadline;
    uint  public revealDeadline;
    uint[] public winnerTicketNumbers;
    uint []  rewardPrices=[50000 ether,10000 ether,400 ether,400 ether,200 ether,200 ether,200 ether,200 ether,200 ether,200 ether,200 ether,200 ether,200 ether,200 ether,200 ether,100 ether,100 ether,100 ether,100 ether,100 ether,40 ether,10 ether,4 ether];
    struct intIndex{
        bool isExist;
        uint index;
    }
    mapping (uint => intIndex) public isWinnerTicketNumbers;
    bool public isAvailable;
    uint public periodno;
    uint[] public revealRandomNumbers;
    uint[] public allTicketNumbers; 
    
    bytes32[] public commitmentAll;//all hash number
    mapping (uint => bool) public isExistTicket;
    mapping (uint => bool) public isWithdrawed;
    mapping (bytes32 => bool) public isSavedRandomNumber;
    uint public totalCost;
    //participent struct
    struct participent{
        uint[] ticketNumbers;
        mapping ( uint => bool) hasTicketNumber;
        bytes32[] commitment;
        mapping ( bytes32 => bool) commitmentVerify;
    }
    mapping (address=>participent) personalInfo;
    
    constructor() public payable  {	
      //constants 
		periodno = 1;		
		ticketPrice	=	2 ether;		
		submissionDeadline =	block.timestamp	+ 5 days;	
		revealDeadline =	block.timestamp	+  7 days;
		// we calculated:  68900 is sum of max prizes amount  
		totalCost=68900 ether;
	}	
    
    
    function purchase(uint ticketNumber, bytes32 _hash) public payable returns(bool){
        //checking the time for period. refreshing the new week.
        if( revealDeadline<block.timestamp){
            periodno=periodno+1;
            submissionDeadline =	block.timestamp	+ 5 days;	
		    revealDeadline =	block.timestamp	+  7 days;
        }
        
        //checking if sender has enough money and entered suitable lottery number 
        require(msg.value==ticketPrice && ticketNumber<99999 && ticketNumber>=0);
        //checking is ticketNumber unique or not , and time for 
        if(block.timestamp<submissionDeadline && isExistTicket[ticketNumber]==false &&msg.value==ticketPrice){
            // in purchase/submission period
            personalInfo[msg.sender].ticketNumbers.push(ticketNumber);
            personalInfo[msg.sender].hasTicketNumber[ticketNumber]=true;
            //adding person ticket and hashes
            personalInfo[msg.sender].commitment.push(_hash);
            personalInfo[msg.sender].commitmentVerify[_hash]=true;
            allTicketNumbers.push(ticketNumber);
            commitmentAll.push(_hash);
            isExistTicket[ticketNumber]=true;
            
        }
        return true;
    }
    
    
    function reveal(uint randomnumber) public returns (bool) {
        //checking the time of beetween last 2 days in week.
        require (block.timestamp>submissionDeadline && block.timestamp<revealDeadline);
        
        //checking  same user doesnt reveal the same number more than once

        require(isSavedRandomNumber[sha256(abi.encodePacked(randomnumber,msg.sender))]==false);
        if(personalInfo[msg.sender].commitmentVerify[sha256(abi.encodePacked(randomnumber,msg.sender))]==false){
            //checking 
             
            revert();
            return false;
            
        }
        else{
            
            revealRandomNumbers.push(randomnumber);
            //adding the user reval number is used
            isSavedRandomNumber[sha256(abi.encodePacked(randomnumber,msg.sender))]=true;
             return true;
        }
        
        
       
    
}
    
    function result() public returns (bool){
          // generating 23 luckly winner number
                uint total=0;
                for(uint i=0;i<revealRandomNumbers.length;i++){
                   total=total+revealRandomNumbers[i];
                }
                //we summed all randomnumbers and used sha256 for hashing then converted to int
                //this prosedure used for all 23  winner number
               for(uint a=0;a<20;a++){
                winnerTicketNumbers.push((uint(sha256(abi.encodePacked(total)))) %100000);
                isWinnerTicketNumbers[(uint(sha256(abi.encodePacked(total)))%100000)].isExist=true;
                isWinnerTicketNumbers[(uint(sha256(abi.encodePacked(total)))%100000)].index=a;
                
                   total=uint(sha256(abi.encodePacked(total)));
               }
               //XXXX 4 digits
                winnerTicketNumbers.push(uint(sha256(abi.encodePacked(total))) %10000);
                isWinnerTicketNumbers[(uint(sha256(abi.encodePacked(total)))%10000)].isExist=true;
                isWinnerTicketNumbers[(uint(sha256(abi.encodePacked(total)))%10000)].index=20;

                total=uint(sha256(abi.encodePacked(total)));

                // XXX 3 digits
                winnerTicketNumbers.push(uint(sha256(abi.encodePacked(total))) %1000);
                isWinnerTicketNumbers[(uint(sha256(abi.encodePacked(total)))%1000)].isExist=true;
                isWinnerTicketNumbers[(uint(sha256(abi.encodePacked(total)))%1000)].index=21;                
                total=uint(sha256(abi.encodePacked(total)));

                //XX 2 digits
                winnerTicketNumbers.push(uint(sha256(abi.encodePacked(total))) %100);
                isWinnerTicketNumbers[(uint(sha256(abi.encodePacked(total)))%100)].isExist=true;
                isWinnerTicketNumbers[(uint(sha256(abi.encodePacked(total)))%100)].index=22;
                total=uint(sha256(abi.encodePacked(total)));
                
               
                if(totalCost<=allTicketNumbers.length*ticketPrice){
                    //pay the participent the prizes because we have enough money to share 
                    isAvailable=true;
                    return true;
                 //DONATION ADDRESS OF UNESCO :D
                 //we send the extra money 
                 
                      
                    0xdD870fA1b7C4700F2BD7f44238821C26f7392148.transfer((allTicketNumbers.length*ticketPrice)-totalCost);
                 
                }
                else{
                    //not enough ethers collected so we should refund. :(
                    isAvailable=false;
                    return false;
                }
                
                
        }
    
    function withdrawMoney (uint ticket) public returns (uint){
        
        uint status=0;
        //for checking sender has really the ticket
        require(personalInfo[msg.sender].hasTicketNumber[ticket]=true);
      
        bool isWin=false;
        //checking,if  we have enought ether to share the prizes
        if (isAvailable){
       
        //checking user didnt withdrawed before
        require(isWithdrawed[ticket]==false);
            
        if(isWinnerTicketNumbers[ticket].isExist==true){
            //for the first 20 prizes
            msg.sender.transfer(rewardPrices[isWinnerTicketNumbers[ticket].index]);
            isWin=true;
        }
        
         if(isWinnerTicketNumbers[ticket%10000].isExist==true){
             //last 4 digits
            msg.sender.transfer(rewardPrices[isWinnerTicketNumbers[ticket%10000].index]);
            isWin=true;
        }
        if(isWinnerTicketNumbers[ticket%1000].isExist==true){
            //last 3 digits
            msg.sender.transfer(rewardPrices[isWinnerTicketNumbers[ticket%1000].index]);
            isWin=true;
        }
        
        if(isWinnerTicketNumbers[ticket%100].isExist==true){
            //last 2 digits
            msg.sender.transfer(rewardPrices[isWinnerTicketNumbers[ticket%100].index]);
            isWin=true;
        }
        
        if(isWin){
            //a user must get the prizes only once.
            isWithdrawed[ticket]=true;
            status=1;
        }
            
        }
        else{
            
            // refunding the money and sending the 2 ether
             if(isWithdrawed[ticket]==false){
            msg.sender.transfer(ticketPrice);
            isWithdrawed[ticket]=true;
                 status=2;
             }
        }
        
        return status; 
    }
       
    }
        
        
        
