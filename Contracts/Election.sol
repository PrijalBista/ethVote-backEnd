pragma solidity ^0.4.18;

contract Election{
		//Candidate structure
		struct Candidate{
			uint id;
			string name;
			uint voteCount;
		}
		mapping(uint=>Candidate) public candidateList;

		uint public candidateCount;
		//constructor
		function Election()public{
			addCandidate("Prijal");
			addCandidate("Hari");
		}

		function addCandidate(_name)private{
			candidatesCount ++;
			candidateList[candidatesCount]= Candidate(candidatesCount,_name,0);
		}

}