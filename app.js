//importing modules defaullts
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ip = require('my-local-ip');
var session = require('express-session');
 // this is required for https connection-----------------
var http = require('http');
var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./keys/client-key.pem'),
  cert: fs.readFileSync('./keys/client-cert.pem')
};
//-------------------------------------------------------
//---Our Voting System major components Verifier and BallotRegulator 
var Verifier = require('./Classes/Verifier');
var verifier = new Verifier();
var BallotRegulator = require('./Classes/BallotRegulator');
var ballotRegulator = new BallotRegulator();
var Admin = require('./Classes/Admin');
var admin = new Admin();
//initializing express app express module returns function and that func returns application instance
// Create a service (the app object is just a callback).
var app = express();
//app holds that application instance and all server communications are handled by it

//View Engine middleware used to display htmlpages for manager webpage
app.set('view engine','ejs'); 
app.set('views',path.join(__dirname, 'views'));

app.use(session({
    secret: 'cookie_secret',
    name: 'cookie_name',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(function(req, res, next) { //making session variable available in response ie in ejs views
  res.locals.username = req.session.username;//locals ma save garepaxi templates ma sidhai username variable use garna milxa
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static path ( path where we keep our css js files)
app.use(express.static(path.join(__dirname,'public')));


/*--------------------Routes for all manager actions------------------------------- */
app.use('/admin',function(request,response,next){ //middleware to check login status
	if(request.session.username==null){
		//console.log("not logged in");
		response.redirect('/');
	}else{
	next();
	}
});
//route for the landing page/homepage/firstpage
app.get('/',function(request,response){
 	//response.render('index',{result:result,candidate:null});
 	response.render('index');
 	response.end();
});
app.post('/adminLogin',function(request,response){
	admin.adminLogin(request,response);
});
app.get('/admin/manager',function(request,response){
	ballotRegulator.LoadManagerPage(request,response);
});

app.post('/admin/validateVoter',function(request,response){
	verifier.ValidateVoter(request,response);
});

app.post('/admin/createballot',function(request,response){
	ballotRegulator.CreateBallot(request,response);
});
app.post('/admin/activateBallot',function(request,response){
	ballotRegulator.SelectBallot(request,response);
});

app.post('/admin/startVoting',function(request,response){
	ballotRegulator.StartVoting(request,response);
});

app.post('/admin/stopVoting',function(request,response){
	ballotRegulator.StopVoting(request,response);
});

app.post('/admin/voteForCandidate',function(request,response){
	ballotRegulator.TestingVoteForCandidate(request,response);
});

app.get('/admin/logout',function(request,response){
	request.session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	    response.redirect('/');
	  }
	});
})

app.post('/voteStarted',function(request,response){
	ballotRegulator.GetBallotStatus(request,response);
});

app.post('/getCandidateList',function(request,response){
	ballotRegulator.getCandidateList(request,response);
});
/*-------------------------------------------------------------------------*/
app.get('/land',function(req,res){
	res.render('adminDashboard');
});

// ----------------- Routes for all Voters(mobile app) --------------//

app.post('/voterreg',function(request,response){
	verifier.RegisterVoter(request,response);
});

app.post('/voterlogin',function(request, response){
	verifier.LoginVoter(request,response);	
});

app.post('/m/voteForCandidate',function(request,response){
	ballotRegulator.VoteForCandidate(request,response);
	
});

app.post('/m/getBallotRequest',function(request,response){	
	ballotRegulator.RequestForBallot(request,response);
});

app.post('/m/getEthereumAddress',function(request,response){
	verifier.GetEthereumAddress(request,response);
});

//---------------------------------------------------------------------------//



//.......... extra unused features ... will be added in later iterations......//
app.get('/getImage/:fileName',function(req,res) {
	var filename = req.params.fileName;
	//res.sendFile('/votedapp/pro1/public/images/'+filename);// vulnerable dont use
	
	res.sendFile('/public/images/'+filename,{root:__dirname});
});
//...............................................................................//


// // Create an HTTP service.
 http.createServer(app).listen(8080,function(){
 	console.log("\x1b[1m","Visit http://localhost:8080 in your computer           |")
 	console.log("\x1b[1m","Put this address on your app  "+ip()+":8080             ");
	console.log("\x1b[1m","---------------------------------------------------------");

 });
// // Create an HTTPS service identical to the HTTP service.
 https.createServer(options, app).listen(4433,function(){
 	console.log(' ALso added new https server ');
 	console.log("\x1b[1m","Visit https://localhost:443  in your computer           |")
 });