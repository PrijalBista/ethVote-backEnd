pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => uint8) public votesReceived;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bytes32[] public candidateList;

  address ballotCreater;
  bool canVote;
  address[] usersWhoVoted;
  string ballotName;
  uint256 totalCandidates;
  modifier chkOwnership(){

    require(ballotCreater == msg.sender);
    _;
  }
  modifier chkVotingState(){
   require(canVote==true);
   _;
  }
  function chkDoubleVote()private returns (bool){
     
     for (uint i = 0; i<usersWhoVoted.length;i++){
         if(msg.sender==usersWhoVoted[i]){
             return false;
         }
     }
     return true;
  }

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(string name,bytes32[] candidateNames) public {
    ballotCreater = msg.sender;
    candidateList = candidateNames;
    ballotName=name;
    canVote = false;
    totalCandidates=candidateList.length;
  }
  function getTotalCandidates()public returns (uint256){
      return totalCandidates;
  }
  function getCandidateList() public returns (bytes){
      uint256 size = 32*totalCandidates;
      bytes memory b = new bytes(size);
      uint256 counter = 0;
      for(uint8 i= 0;i<totalCandidates;i++){
         for(uint8 j = 0;i<32;j++){
             b[counter] = candidateList[i][j];
             counter++;
         }
         b[counter] = ',';
         counter ++;
      }
      return b;
      
  }
  function votingResult()public returns(bytes32[]) {
    return candidateList;
  }
  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate) public payable chkVotingState {
    require(validCandidate(candidate));
    require(chkDoubleVote());
    votesReceived[candidate] += 1;
    usersWhoVoted.push(msg.sender);
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function startVoting()public chkOwnership {
    canVote=true;

  }

  function stopVoting()public  chkOwnership {
    canVote=false;
  }
}