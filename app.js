//importing modules defaullts
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//Users helps to communicate with mysql database
var Users = require('./Classes/Users');
var users = new Users();

//blockchain module helps in performing blockchain operations and queries
var BlockChain = require('./Classes/Blockchain');
var blockchain = new BlockChain();
//this holds contract address of the BALLOT WE DEPLOYED
var contractInstance=null;



//initializing express app express module returns function and that func returns application instance
var app = express();
//app holds that application instance and all server communications are handled by it

//View Engine middleware
app.set('view engine','ejs'); 
app.set('views',path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static path ( path where we keep our css js files)
app.use(express.static(path.join(__dirname,'public')));

//route for the landing page/homepage/firstpage
app.get('/',function(request,response){
 //response.redirect('/manager');
 if(contractInstance!==null){
 	response.send(contractInstance.address);
 }else{
	 response.send("No contract Yet");
 }
});


/*--------------------Routes for all manager actions------------------------------- */
app.get('/manager',function(request,response){

	var candidatesInfo = null;
	if(contractInstance!==null){
		candidatesInfo = blockchain.GetCandidateList();
	//load all candidates and there votes in real time	
	}
	users.GetVotersList(request,response,candidatesInfo);
	//response.render('index',{result:result,candidate:candidatesInfo});
	//	response.end();
});

app.post('/validateVoter',function(request,response){
	users.ValidateVoter(request,response);
});

app.post('/createballot',function(request,response){

	contractInstance = blockchain.CreateBallot(request,response);
});

app.post('/startVoting',function(request,response){
	blockchain.StartVoting(request,response);
});

app.post('/stopVoting',function(request,response){
	blockchain.StopVoting(request,response);
});

app.post('/voteForCandidate',function(request,response){
	blockchain.VoteStarted(request,response,function(){
		blockchain.VoteForCandidate(request,response,manager=true);
	});
});
/*-------------------------------------------------------------------------*/




app.post('/m/voteForCandidate',function(request,response){
	blockchain.VoteStarted(request,response,function(){
		users.UserCanVote(request,response,function(success){
		if(success){
	 		blockchain.VoteForCandidate(request,response,manager=false);
		}
		else response.send({'success':false,'message':'U are not validated To vote yet'});
		});		
	});

	
});


app.post('/m/getEthereumAddress',function(request,response){
	users.UserCanVote(request,response,function(success){
		if(success){
	 		blockchain.GetNewAccount(request,response,function(ethPassword,ethAddr){
	 			users.RegisterEthAddress(ethPassword,ethAddr,response);
	 		});
			console.log(request.body.username+' Request to get Ethereum address');

	 	}
			else response.send({'success':false,'message':'U are not validated To vote yet'});	
	});
});

app.post('/voterreg',function(request,response){
	users.RegisterVoter(request,response);
});


app.post('/voterlogin',function(request, response){
	users.LoginVoter(request,response);
	
});

app.get('/getImage/:fileName',function(req,res) {
	var filename = req.params.fileName;
	//res.sendFile('/votedapp/pro1/public/images/'+filename);// vulnerable dont use
	
	res.sendFile('/public/images/'+filename,{root:__dirname});
});

app.listen(8080,function(){
	console.log("listening to port 8080");
});