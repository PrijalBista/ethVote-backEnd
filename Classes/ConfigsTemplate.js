var Configs ={
	mysql:{
		host:"",   			//default local mysql 127.0.0.1
		user:"",			//default root
		password:"",		//default nothing ie ""
		database:"voting"	//u can change it to another database if u want :Ds 
							//WARNING:: DOnOt Do Save (Ctrl+ save ) save as different file (Config.js)
	}
}; 

module.exports = Configs;


//after setting it all dont save it in this file (ConfigsTemplate.js)
// do save  as Configs.js  
// dont delete ConfigsTemplate.js  others also need this to configure there Configs.js :)
