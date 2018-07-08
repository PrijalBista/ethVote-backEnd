//Users helps to communicate with mysql database
var Users = require('./Users');
var users= new Users()
//blockchain module helps in performing blockchain operations and queries
var Blockchain = require('./BlockChain');
var blockchain= new Blockchain();
class Verifier{
	RegisterVoter(request,response){
		users.RegisterVoter(request,response);
	}

	LoginVoter(request,response){
		users.LoginVoter(request,response);
	}

	ValidateVoter(request,response){
		users.ValidateVoter(request,response);
	}

	GetEthereumAddress(request,response){
		users.UserCanVote(request,response,function(success){
			if(success){
	 			blockchain.GetNewAccount(request,response,function(ethPassword,ethAddr){
	 				users.RegisterEthAddress(ethPassword,ethAddr,response);
	 			});
				console.log(request.body.username+' Request to get Ethereum address');
	 		}
			else response.send({'success':false,'message':'U are not validated To vote yet'});	
		});
	}
		
}
module.exports=Verifier;