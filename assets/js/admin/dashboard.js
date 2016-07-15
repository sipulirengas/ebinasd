// Settings

var debug = true;

// Initialization

$(function() {

	if(debug){console.log('dashboard - dom loaded');}

	//submit Handler for create model forms
	$('.createModel').submit(function(e) {

		e.preventDefault();

		var data = $(this).serializeObject()
		  , model = $(this).attr('model')
		  , url = '/' + model;

		if(debug){console.log('dashboard:createModel - data: ' + data + ' url: ' + url);}

		io.socket.post(url, data, function (resData, jwRes) {

			if(debug){console.log('dashboard:createModel - response: ' + jwRes.statusCode + ' data: ' + resData);}

			if(jwRes.statusCode == 201){
				var message =  model + ' article was created';
				$.notify( message, 'success');
			}
		});

	});		

	//submit Handler for create model forms
	$('.updateModel').submit(function(e) {

		e.preventDefault();

		var data = $(this).serializeObject()
		  , model = $(this).attr('model')
		  , id = $(this).attr('model-id')
		  , url = '/' + model + '/' + id;

		if(debug){console.log('dashboard:updateModel - data: ' + data + ' url: ' + url);}

		io.socket.put(url, data, function (resData, jwRes) {

			if(debug){console.log('dashboard:updateModel - response: ' + jwRes.statusCode + ' data: ' + resData);}

			if(jwRes.statusCode == 200){
				var message =  model + ' article #' + id + ' was saved';
				$.notify( message, 'success');
			}
		});

	});	


	$('.actions .delete').click(function(e) {

		var element = $(this)
		  , id = element.attr('model-id')
		  , model = element.attr('model')
		  , url = '/' + model + '/' + id;

		if(debug){console.log('dashboard:createModel - id: ' + id + ' model: ' + model + ' url: ' + url);}

		io.socket.delete(url, function (resData, jwRes) {

			if(debug){console.log('dashboard:createModel - response: ' + jwRes.statusCode + ' data: ' + resData);}

			if(jwRes.statusCode == 200){
				var message =  model + ' article #' + id + ' was deleted';
				element.parent().parent('tr').fadeOut();
				$.notify( message, 'error');
			}
		});

	});
    
});      

