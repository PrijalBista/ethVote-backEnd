var mysql = require('mysql');
var rsaWrapper = require('../Encryption/RSA');
var Configs = require('./Configs');

class Ballots{
	constructor(){
		this.connection= mysql.createConnection({
				host:Configs.mysql.host,
				user:Configs.mysql.user,
				password:Configs.mysql.password,
				database:Configs.mysql.database	
		});

	}

	addBallot(ballotName,ballotAddress){
		let created = new Date();//current timestamp
		//let filename = ballotName+Date.parse(created).toString();
		let filename = ballotName;//file name of generated key files (public and private)
		if(rsaWrapper.generate(filename)){
			let sql = 'INSERT INTO ballots SET ?';
			let values ={
				ballotName:ballotName,
				ballotAddress:ballotAddress,
				creationDate:created.toLocaleString()
			};
			this.connection.query(sql,values,function(err,result,field){
				if(err) throw err;
			if(result.affectedRows==1){
				console.log("Mysql: ballot registerd..\n");
			}else{
				console.log("Mysql: ballot not registerd");
			}
			});

		}else{
			console.log("RsaWrapper: could not generate new key pair \n");
		}
	}

	getKey(ballotName){
		if(rsaWrapper.initLoadBallotKey(ballotName)){
			return rsaWrapper;
		}else{
			console.log("Ballots.js : error loading Ballot key   ")
		}
	}



}

module.exports=Ballots;