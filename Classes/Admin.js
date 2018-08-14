var mysql = require('mysql');
var passwordHash = require('password-hash');
var Configs = require('./Configs')

class Admin{
	constructor(){
		this.connection= mysql.createConnection({
				host:Configs.mysql.host,
				user:Configs.mysql.user,
				password:Configs.mysql.password,
				database:Configs.mysql.database	
		});
	}

	adminLogin(request,response){
		let username = request.body.username;
		let password = request.body.password;
		let sess = request.session;
		this.connection.query("SELECT * FROM admin WHERE username = ?",[username],function(err,result,fields){
				if(err) throw err;
				if(result.length>0){
					if(passwordHash.verify(password,result[0].password)){
						sess.username = username;
						sess.user_id=result[0].id;
						response.redirect('/admin/manager');response.end();
					}else{ response.send("wrong username or password");response.end(); }
				} else { response.send("wrong username or password");response.end(); }
			});	
	}

}

module.exports=Admin;
