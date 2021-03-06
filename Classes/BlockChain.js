//solidity compiler to compile our contract
var solc = require('solc');
//web3 communicates with the blockchain
var Web3 = require('web3');
//filesystem fs
var fs = require('fs');

class Blockchain{

	constructor(){
		 // use http://localhost:7545 for ganache-gui
		 this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		 this.contractInstance = null;
		 if (this.web3.isConnected()){
		 	console.log('\x1b[36m%s\x1b[0m','Connected to the blockchain database....                |');
			console.log('\x1b[36m%s\x1b[0m',"---------------------------------------------------------\n");

		 }else{
		 	console.log('PROBLEM CONNECTING BLOCKCHAIN (START node using cmd  "ganache-cli" )');
		 }
	}

    CreateBallot(request,response,callback){
		var ballotName = request.body.ballotName;
		var votersAddress = request.body.votersAddress;
		var candidateNames = request.body.candidateNames.split(",");
		//console.log(typeof(candidateNames));
  		var code = fs.readFileSync(__dirname+'/../Contracts/Voting.sol').toString();

  		var compiledCode = solc.compile(code);
	  	var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
		//VotingContract = new web3.eth.contract(abiDefinition);
		var VotingContract = this.web3.eth.contract(abiDefinition);
	  	var byteCode = compiledCode.contracts[':Voting'].bytecode;
	  	var deployedContract=VotingContract.new(ballotName,candidateNames,{data: byteCode, from: this.web3.eth.accounts[0], gas: 4700000},function(err,contract){
	  		if(!err){
	  			//NOTE: the callback will fire twice
	  			//Once the contract has the transactionHash property set and once its deployed on an address.
	  			if(!contract.address){
	  				//this condition is for when transactionHash is set
	  				//console.log("transaction hash "+contract.transactionHash);
	  			}else{
	  				console.log('Contract Deployed Successfully address: '+contract.address)
	  				response.redirect("/manager");
	  				callback(contract);
	  			}
	  		}else{
	  			console.log(err);
	  			response.send("Not deployed");
	  			return null;
	  		}
	  	});
	  	this.contractInstance=deployedContract;
	  	//console.log('blockchain instance'+ this.contractInstance);
	}


	StartVoting(request,response){
		if(this.contractInstance===null){
			console.log("no instance");
		}
		this.contractInstance.startVoting({from:this.web3.eth.accounts[0]},function(){
			console.log(' \n VOTING STARTEd.........D');
			response.send({'success':true,'message':'Voting has Started'});
		});
	}

	StopVoting(request,response){
		this.contractInstance.startVoting({from:this.web3.eth.accounts[0]},function(){
			console.log(' \n VOTING SToped.........D');
			response.send({'success':true,'message':'Voting has Stopped'});
		});

	}
	
	VoteForCandidate(request,response,manager){
		var name=request.body.candidateName;
		if (manager){
			this.contractInstance.voteForCandidate(name,{from:this.web3.eth.accounts[2]},function(){
				console.log('Manager Voted');
				response.send({'success':true,'message':'successfully voted for '+name});
			});		
		}
		else{
			var ethAddr = request.body.ethAddress;
			var ethPass = request.body.ethPassword;
			this.web3.personal.unlockAccount(ethAddr,ethPass,()=>{
				this.contractInstance.voteForCandidate(name,{from:ethAddr},function(){
					console.log('SOmeone Voted just now :O  ..VOTE ADDED FOR  '+name);
					response.send({'success':true,'message':'successfully voted for'+name});
				});
			});
		}
		
	}

	GetCandidateList(){
		var no =this.contractInstance.candidateNo();
		var candidates = [];
		var votes = [];
		var i;
		for(i=0;i<no;i++){
			candidates[i]= this.contractInstance.candidateName(i);
			votes[i] = this.contractInstance.totalVotesFor(candidates[i]).toNumber();
			candidates[i] = this.web3.toAscii(candidates[i]).toLocaleString();
		}
		
		//return an obj with member datas candidates and votes which are arrays
		var result = {
				no:no,
				candidateName:candidates,
				votes:votes	
		};
		return result;
	}

	GetNewAccount(request,response,callback){
		//this function will give all validated voters a new ethereum account to vote
		// however all new accounts have 0 balance paxi manager ley daan dinxa halka
		//asuming manager account is the first one and lending money 5ether to every new valid voter address
		var ethPassword = request.body.ethPassword;  
		var W3=this.web3;//because newaccount func ko call back maa this.web3 chinena so
		this.web3.personal.newAccount(ethPassword,function(err,result){
			// this.web3.eth.sendTransaction({from:this.web3.eth.accounts[0], to:result,value:this.web3.toWei(5,'ether')},function(err,res){
				W3.eth.sendTransaction({from:W3.eth.accounts[0], to:result,value:W3.toWei(5,'ether')},function(err,res){
			 	console.log("new Voting Adress Generated : "+ result);
				callback(ethPassword,result);
			 });
			
		});

	}
	VoteStarted(request,response,callback){
		if(this.contractInstance===null){
			response.send({'success':false,'message':'Ballot not Published'});
			return ;// dont run code below this 
		}
		this.contractInstance.voteStarted({},function(err,voteStarted){
			if(voteStarted){
				callback();
			}else response.send({'success':false,'message':'Voting Has Not started Yet'});
		});
	}
};

module.exports = Blockchain;