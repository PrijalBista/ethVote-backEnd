var Blockchain = require('./BlockChain');
var blockchain=[]; //every admin will have its own instance of blockchain object
var Users = require('./Users');
var users = new Users();
var Ballots = require('./Ballots');
var ballots = new Ballots();
var abiDefination;
class BallotRegulator{
	constructor() {
		this.contractInstance=[];
		this.user_id='';
	}
	getCandidateList(request,response){		
		if(this.contractInstance[request.session.user_id]){
			let candidatesInfo = blockchain[request.session.user_id].GetCandidateList();
			//load all candidates and there votes 	
			response.send({'success':true,'data':candidatesInfo});
		}else{
			response.send({'success':false,'message':'no ballot published'});
		}		
	}
	LoadManagerPage(request,response){
	if(!blockchain[request.session.user_id]){
	blockchain[request.session.user_id]=new Blockchain();
	}

		//var candidatesInfo = null;
	// 	if(this.contractInstance[request.session.user_id]!==null){
	// 		candidatesInfo = blockchain[request.session.user_id].GetCandidateList();
	// //load all candidates and there votes 	
	// 	}
		//users.GetVotersList(request,response,candidatesInfo);
		
	//response.render('index',{result:result,candidate:candidatesInfo});
	//	response.end();
		ballots.getBallots(request.session.user_id,function(ballots){
			users.GetVotersList(request,response,function(voters){
				response.render('adminDashboard',{result:voters,candidate:null,ballots:ballots});
				response.end();
			});
		});
	}
	CreateBallot(request,response){

			var that = this;
			blockchain[request.session.user_id].CreateBallot(request,response,function(contract){
			that.Initialize(contract,request.session.user_id);
			response.redirect("/admin/manager");
			});

	}
	SelectBallot(request,response){
		if(blockchain[request.session.user_id].selectContract(request.body.ballotName,request.body.ballotAddress)){
			this.contractInstance[request.session.user_id]= blockchain[request.session.user_id].contractInstance;
			this.user_id=request.session.user_id;
			//console.log(this.contractInstance);
			response.send({'success':true,'message':'ballot selected'});response.end();
		}else{
			response.send({'success':false,'message':'(Ballot Not Initialized)'});response.end();
		}

	}
	Initialize(contract,user_id){
		this.contractInstance[user_id] = contract;
		this.user_id=user_id;
		console.log('Initializing ballot Regulator for ballot'+this.contractInstance[user_id].address);
	}
	StartVoting(request,response){
		if(this.contractInstance[request.session.user_id]!==null){
			blockchain[request.session.user_id].StartVoting(request,response);
		}else {
			response.send({'success':false,'message':'NO Ballot Yet (Ballot Regulator Not Initialized)'});
		}
	}
	StopVoting(request,response){
		if(this.contractInstance[request.session.user_id]!==null){
			blockchain[request.session.user_id].StopVoting(request,response);
		}else{
			response.send({'success':false,'message':'NO Ballot Yet (Ballot Regulator Not Initialized)'});
		}
	}

	VoteForCandidate(request,response){
		let userid = this.user_id;
		blockchain[userid].VoteStarted(request,response,function(){
			users.UserCanVote(request,response,function(success){
				if(success){
	 				blockchain[userid].VoteForCandidate(request,response,false);
				}
				else response.send({'success':false,'message':'U are not validated To vote yet'});
			});		
		});
	}

	RequestForBallot(request,response){
		var candidatesInfo = null;
		if(this.contractInstance[this.user_id]!==null && blockchain[this.user_id]){
			candidatesInfo = blockchain[this.user_id].GetCandidateList();
			response.send({'success':true,'message':candidatesInfo.candidateName});
		//load all candidates and there votes in real time	
		} else{
			response.send({'success':false,'message':'Ballot not published Yet'});
		}
	}

	TestingVoteForCandidate(request,response){
		blockchain[request.session.user_id].VoteStarted(request,response,function(){
			blockchain[request.session.user_id].VoteForCandidate(request,response,true);
		});	
	}
	
	GetBallotStatus(request,response){
		if(blockchain[request.session.user_id]){
			blockchain[request.session.user_id].VoteStarted(request,response,function(){
				response.send({'success':true,'message':'Voting has Started'});
			});
		}
	}
}

module.exports=BallotRegulator;