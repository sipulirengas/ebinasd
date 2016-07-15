// Settings

var debug = true;

// Initialization

$(function() {

	if(debug){console.log('dashboard - dom loaded');}

	//submit Handler for create model forms
	$('.createModel').submit(function(e) {

		e.preventDefault();

		var data = $(this).serializeObject();
		var model = $(this).attr('model');
		var url = '/' + model;

		if(debug){console.log('dashboard:createModel - data: ' + data + ' url: ' + url);}

		io.socket.post(url, data, function (resData, jwRes) {

			if(debug){console.log('dashboard:createModel - response: ' + jwRes.statusCode + ' data: ' + resData);}

			if(jwRes.statusCode == 201){
				var message =  model + ' article was created!';
				$.notify( message, 'success');
			}
		});

	});	
    
});      

