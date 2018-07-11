var mysql = require('mysql');
var passwordHash = require('password-hash');
var Configs = require('./Configs')

class Users{
	constructor(){
		this.connection= mysql.createConnection({
				host:Configs.mysql.host,
				user:Configs.mysql.user,
				password:Configs.mysql.password,
				database:Configs.mysql.database	
		});

		// this.connection.connect(function(err){
		// if (err) throw err;
		console.log('\x1b[33m%s\x1b[0m',"---------------------------------------------------------");
		console.log('\x1b[33m%s\x1b[0m',"Connected to the mysql database...                      |"); //});
		console.log('\x1b[33m%s\x1b[0m',"---------------------------------------------------------");

	}

	RegisterVoter(request,response){
		var fullname = request.body.fullname;
		var address = request.body.address;
		var dob = request.body.dob;
		var uniqueID = request.body.uniqueID;
		var username = request.body.username;
		var email = request.body.email;
		var password = passwordHash.generate(request.body.password,{algorithm:'sha256'});
		var joined = new Date().toISOString().slice(0, 19).replace('T', ' ');
		//var sql = "INSERT INTO users (username,password,salt,name,address,dob,uniqueID,joined,groups) VALUES (?,?,?,?,?,?,?)";  
		//var values = [ username,password,'salt',fullname,address,dob,uniqueID,joined,'1'];

		var sql = "INSERT INTO users SET ?";
		var values = {
			username:username,
			password:password,
			name:fullname,
			address:address,
			email:email,
			dob:dob,
			uniqueID:uniqueID,
			joined:joined,
			groups:0
		};
		this.connection.query(sql,values,function(err,result,fields){
			if(err) throw err;
			if(result.affectedRows==1){
				response.send({'success':true,'message':'successfully registered'});
			}else{
				response.send({'success':false,'message':'Didnt register'});
			}
		});

	}

	LoginVoter(request,response){
		var username = request.body.username;
		var password = request.body.password;
		
		this.connection.query("SELECT * FROM users WHERE username = ?",[username],function(err,result,fields){
				if(err) throw err;
				if(result.length>0){
					if(passwordHash.verify(password,result[0].password))
						response.send({'success':true, 'message':result[0].username});
				} else {
					response.send({'success':false, 'message':'Wrong Username Or Password'});
				}
			});
		//});	
	}

	GetVotersList(request,response){
		//manage voters section 
		 this.connection.query("SELECT * FROM users",function(err,result,fields){
		// 	//fields has info about all datas (eg if they are char, int , length,etc)	
			//console.log('from GetVotersList function i:D:D'+candidatesInfo.no);
			if(err) throw err;	
			response.render('index',{result:result,candidate:null});
			response.end();

	 });
	}

	ValidateVoter(request,response){
		var username =request.body.username;
		var update =request.body.update;
		this.connection.query("UPDATE users SET groups = ? Where username = ?",[update,username],function(err,result){
			if (err) throw err;
			response.send({success:true});
	});
	}

	UserCanVote(request,response,callback){
		var username = request.body.username;
		var password = request.body.password;
		var success = false;
		this.connection.query("SELECT * FROM users WHERE username = ?",[username],function(err,result,fields){
				if(err) throw err;
				if(result.length>0){
				if(passwordHash.verify(password,result[0].password) && result[0].groups===1)
						success=true;
				} else {
					success= false;
				}
				if(callback!==null){
					callback(success);
				}else{
					return success;
				}
			});

		
	}

	RegisterEthAddress(ethPass,ethAddr,response){

		var sql = "INSERT INTO address SET ?";
		var ethPassword = passwordHash.generate(ethPass,{algorithm:'sha256'});

		var values = {
			ethPassword:ethPassword,
			ethAddress:ethAddr
		}
		this.connection.query(sql,values,function(err,result,fields){
			if(err) throw err;
			if(result.affectedRows==1){
				console.log('successfully registered in list of valid voters '+ethAddr);
				response.send({'success':true,'message':ethAddr});
			}else{
				response.send({'success':false,'message':'Some problem occured'});
			}
		});
	}
};


module.exports = Users;