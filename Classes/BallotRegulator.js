var Blockchain = require('./Blockchain');
var blockchain = new Blockchain();
var Users = require('./Users');
var users = new Users();
class BallotRegulator{
	constructor() {
		this.contractInstance=null;
	}
	LoadManagerPage(request,response){
		var candidatesInfo = null;
		if(this.contractInstance!==null){
			candidatesInfo = blockchain.GetCandidateList();
	//load all candidates and there votes 	
		}
		users.GetVotersList(request,response,candidatesInfo);
	//response.render('index',{result:result,candidate:candidatesInfo});
	//	response.end();
	}
	CreateBallot(request,response){
			var that = this;
			blockchain.CreateBallot(request,response,function(contract){
			that.Initialize(contract);
	});

	}
	Initialize(contract){
		this.contractInstance = contract;
		blockchain.contractInstance=contract;
		console.log('Initializing ballot Regulator for ballot'+this.contractInstance.address);
	}
	StartVoting(request,response){
		if(this.contractInstance!==null){
			blockchain.StartVoting(request,response);
		}else {
			response.send({'success':false,'message':'NO Ballot Yet (Ballot Regulator Not Initialized)'});
		}
	}
	StopVoting(request,response){
		if(this.contractInstance!==null){
			blockchain.StopVoting(request,response);
		}else{
			response.send({'success':false,'message':'NO Ballot Yet (Ballot Regulator Not Initialized)'});
		}
	}

	VoteForCandidate(request,response){
		blockchain.VoteStarted(request,response,function(){
			users.UserCanVote(request,response,function(success){
				if(success){
	 				blockchain.VoteForCandidate(request,response,false);
				}
				else response.send({'success':false,'message':'U are not validated To vote yet'});
			});		
		});
	}

	RequestForBallot(request,response){
		var candidatesInfo = null;
		if(this.contractInstance!==null){
			candidatesInfo = blockchain.GetCandidateList();
			response.send({'success':true,'message':candidatesInfo.candidateName});
		//load all candidates and there votes in real time	
		} else{
			response.send({'success':false,'message':'Ballot not published Yet'});
		}
	}

	TestingVoteForCandidate(){
		blockchain.VoteStarted(request,response,function(){
			blockchain.VoteForCandidate(request,response,manager=true);
		});	
	}
	
	GetBallotStatus(request,response){
		blockchain.VoteStarted(request,response,function(){
			response.send({'success':true,'message':'Voting has Started'});
		});
	}
}

module.exports=BallotRegulator;