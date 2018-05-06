function validateVoter(username,button){
		if(confirm("DO you wanna Perform the action?? ")){
			var update;
			if(button.value=="0"){
				 if(!confirm("DO you want to Enable Voting for "+username+"?")) return;
				 update=1; 
			} else{
				if(!confirm("DO you want to Disable Voting for "+username+"?")) return;
				update=0;
			}
			$.post("/validateVoter",
				{username:username,update:update},
				function(data,status){
						alert(status);
						if(update){
							//can vote status in status column
							//disable voting option in button 
							$('#'+username).html('Disable Voting');
							$('#1'+username).html('Validated (can Vote)');
							$('#'+username).val('1');
						}else{
							$('#'+username).html('Enable Voting');
							$('#1'+username).html('.Not Validated (cant Vote)');
							$('#'+username).val('0');
						}
				});

		}else{
			alert("la thik xa teso vey");
		}
	}

	function startVoting(){
		if(confirm("DO YOU wanna Start Voting ?")){
			$.post('/startVoting',{start:true},function(data,status){
				alert(data.message);
				$('#votingStatus').html('Voting has Started');
			});
		}
	}
	function stopVoting(){
		if(confirm("DO YOU wanna stop Voting ?")){
			$.post('/stopVoting',{stop:true},function(data,status){
				alert(data.message);
				$('#votingStatus').html('Voting has Stoped');
			});
		}
	}
	function voteForCandidate(){
	var name=$('#voteCandidateName').val();
	$.post('/voteForCandidate',{candidateName:name},function(data,status){
		alert(status+'fully voted :D');
	});
	}




//this code will run automatically after the page loads
$(document).ready(function() {
	$.post('/voteStarted',{},function(data,status){
		$('#votingStatus').html(data.message);
	});
});