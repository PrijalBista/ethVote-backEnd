function activateBallot(ballotAddress,ballotName){
	alert(ballotName+ballotAddress);
	$.post('/admin/activateBallot',{ballotAddress:ballotAddress,ballotName:ballotName},function(data,status){
		alert("done");
	});
}
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
			$.post("/admin/validateVoter",
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
			$.post('/admin/startVoting',{start:true},function(data,status){
				alert(data.message);
				$('#votingStatus').html('Voting has Started');
			});
		}
}
function stopVoting(){
		if(confirm("DO YOU wanna stop Voting ?")){
			$.post('/admin/stopVoting',{stop:true},function(data,status){
				alert(data.message);
				$('#votingStatus').html('Voting has Stoped');
			});
		}
}
function voteForCandidate(){
	var name=$('#voteCandidateName').val();
	var ballotName = $('#ballotName').val();
	$.post('/admin/voteForCandidate',{ballotName:ballotName,candidateName:name},function(data,status){
		alert(status+'fully voted :D');
	});
}

function tallyVotes(){
	var tb = $('#tallyVotesTableData');
	tb.html('loading');
	$.post('/getCandidateList',{},function(response,status){
		if(status && response.success){
			var candidate=response.data;
			var str="";
			for(i=0;i<candidate.no;i++){
				str+="<tr>";
				str= str+"<td>"+candidate.candidateName[i]+"</td>";
				str= str + "<td>"+candidate.votes[i]+"</td>";
				str+="</tr>";
			}
			tb.html(str);
			updateCharts(response.data);
		}else{tb.html(response.message);}
	});
}


//this code will run automatically after the page loads
$(document).ready(function() {
	M.AutoInit();
	$.post('/voteStarted',{},function(data,status){
		$('#votingStatus').html(data.message);
	});
});


// $(document).ready(function(){
			
// 			//$('.sidenav').sidenav();
// 		});
		// var ctx = document.getElementById("votesCount").getContext('2d');
		// var myChart = new Chart(ctx, {
		//     type: 'bar',
		//     data: {
		//         labels: [""],
		//         datasets: [{
		//             label: '# of Votes',
		//             data: [],
		//             backgroundColor: [
		//                 'rgba(255, 99, 132, 0.2)',
		//                 'rgba(54, 162, 235, 0.2)',
		//                 'rgba(255, 206, 86, 0.2)',
		//                 'rgba(75, 192, 192, 0.2)',
		//                 'rgba(153, 102, 255, 0.2)',
		//                 'rgba(255, 159, 64, 0.2)'
		//             ],
		//             borderColor: [
		//                 'rgba(255,99,132,1)',
		//                 'rgba(54, 162, 235, 1)',
		//                 'rgba(255, 206, 86, 1)',
		//                 'rgba(75, 192, 192, 1)',
		//                 'rgba(153, 102, 255, 1)',
		//                 'rgba(255, 159, 64, 1)'
		//             ],
		//             borderWidth: 1
		//         }]
		//     },
		//     options: {
		//         scales: {
		//             yAxes: [{
		//                 ticks: {
		//                     beginAtZero:true
		//                 }
		//             }]
		//         }
		//     }
		// });

		var v = document.getElementById('voters').getContext('2d');
		var myDoughnutChart = new Chart(v, {
		    type: 'doughnut',
		    data: {
		    	labels:["Voted","not voted"],
		    	datasets:[{
		    		label:'voted',
		    		data:[40,60],
		    		backgroundColor: ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)']
		    	}]
		    },
		   
		});

// function updateCharts(candidate){
// 	//console.log(candidate);
// 	//console.log(candidate.candidateName);
// 	for(i=0;i<candidate.no;i++){
// 		let c = candidate.candidateName[i].split(" ");
// 		console.log(c[0]);
// 		myChart.data.labels.push(c[0]);
// 	    // myChart.data.datasets.forEach((dataset) => {
// 	    //    	dataset.data.push(data);
//     	// });
// 	}
//     myChart.update();
// }