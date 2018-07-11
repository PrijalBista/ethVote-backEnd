const path = require('path');
const rsaWrapper = {};
const fs = require('fs');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
// open and closed keys generation method
rsaWrapper.generate = (direction) => {
	let key = new NodeRSA();
	// 2048 — key length, 65537 open exponent
	key.generateKeyPair(1024, 65537);
	//save keys as pem line in pkcs8
	fs.writeFileSync(path.resolve(__dirname, 'keys', direction + '.private.pem'), key.exportKey('pkcs8-private-pem'));
	fs.writeFileSync(path.resolve(__dirname, 'keys', direction + '.public.pem'), key.exportKey('pkcs8-public-pem'));
	//rsaWrapper.BallotKey = key;
	return true;
};

// Loading RSA keys from files to variables:
rsaWrapper.initLoadBallotKey = (filename) => {
	rsaWrapper.BallotKey = fs.readFileSync(path.resolve(__dirname, 'keys', filename+'.private.pem'));
	rsaWrapper.BallotKey = new NodeRSA(rsaWrapper.BallotKey);
	return true;
};

rsaWrapper.encrypt=(vote)=>{
	// rsaWrapper.initLoadBallotKey();
	let encrypted = rsaWrapper.BallotKey.encrypt(vote,'base64');
	console.log("encryptedvote: "+encrypted);
	return encrypted;
};
rsaWrapper.decrypt=(envote)=>{
	return rsaWrapper.BallotKey.decrypt(envote,'utf8');
};




module.exports = rsaWrapper;