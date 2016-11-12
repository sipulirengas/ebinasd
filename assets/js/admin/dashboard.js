//--Loading--

var loading = false;

//--Globals--

var debug = true;


var api = {

	//--Settings--

	notify: $.notify,

	//--Logging & notifying--

	// Status defaults to info, always show to user on success
	log: function(message,status,showUser){

		var status = status || 'info';

		if(showUser || status == 'success'){
			this.notify(message, status);
		}
    
		console.log('Status: ' + status + ' - ' + message);

	},

	//--Model management--

	// Expects form
	add: function(element){

		// Error check
		var isForm = $(element).is('form');
		if(!element || !isForm){api.log('add() - element not given or is not form','error'); return false}

		// Set loading
		loading = true;

		// Settings
		var data = $(element).serializeObject()
		  , model = $(element).attr('model')
		  , url = '/' + model;

		if(debug){api.log('add() - data: ' + data + ' url: ' + url);}

		// Post using sails.io, remember loading = false and return boolean when done
		io.socket.post(url, data, function (resData, jwRes) {

			if(debug){api.log('add() - response: ' + jwRes.statusCode + ' data: ' + resData);}

			if(jwRes.statusCode == 201){

				var message =  model + ' was created';
				api.log(message, 'success');
        
        // TODO: Redirect to model management page        
        //window.location.href = "/dashboard/" + model;

				loading = false;
				return true;
			}
		});
        
	},

	// Expects form
	update: function(element){

		// Error check
		var isForm = $(element).is('form');
		if(!element || !isForm){api.log('update() - element not given or is not form', 'error'); return false}

		// Set loading
		loading = true;

		// Settings
		var data = $(element).serializeObject()
		  , model = $(element).attr('model')
		  , id = $(element).attr('model-id')
		  , url = '/' + model + '/' + id;

		if(debug){api.log('update() - data: ' + data + ' url: ' + url);}

		// Put using sails.io, remember loading = false and return boolean when done
		io.socket.put(url, data, function (resData, jwRes) {

			if(debug){api.log('update() - response: ' + jwRes.statusCode + ' data: ' + resData);}

			if(jwRes.statusCode == 200){
				var message =  model + ' #' + id + ' was saved';
				api.log(message, 'success');

				loading = false;
				return true;
			}
		});

	},

	// Expects a
	delete: function(element){

		// Error check
		var isA = $(element).is('a')
		if(!element || !isA){api.log('delete() - element not given or is not <a>'); return false}

		// Set loading
		loading = true;

		// Settings
		var id = $(element).attr('model-id')
		  , model = $(element).attr('model')
		  , url = '/' + model + '/' + id;

		if(debug){api.log('delete() - id: ' + id + ' model: ' + model + ' url: ' + url);}

		// Delete using sails.io, remember loading = false and return boolean when done
		io.socket.delete(url, function (resData, jwRes) {

			if(debug){api.log('delete() - response: ' + jwRes.statusCode + ' data: ' + resData);}

			if(jwRes.statusCode == 200){
				var message =  model + ' #' + id + ' was deleted';
				$(element).closest('tr').fadeOut();
				api.log(message, 'error', true);

				loading = false;
				return true;
			}
		});

	},
  
	// Clear form content
	clear: function(element){

		// Error check
		var isForm = $(element).is('button');
		if(!element || !isForm){api.log('clear() - element not given or is not button', 'error'); return false}

		// Set loading
		loading = true;
    console.log(element);

		// Settings
    
		var button = $(element);

		if(debug){api.log('clear() - element: ' + button);}
    
    // start code from here
    // TODO: Make this really clear form
                      
    button.parent()[0].reset();
    button.blur();    
    
    console.log("form: " + button.parent()[0]);
    
		var message =  'form was cleared';
		api.log(message, 'success');

		loading = false;
		return true;
	},
  // close form
	close: function(element){
    // TODO: close form page
	},

}

$(function() {

	if(debug){api.log('Starting');}

	//submit Handler for create model forms
	$('.createModel').submit(function(e) {

		e.preventDefault();

		if(loading){return}

		api.add(this);


	});		

	//submit Handler for create model forms
	$('.updateModel').submit(function(e) {

		e.preventDefault();

		if(loading){return}

		api.update(this);

	});


	$('.actions .delete').click(function(e) {

		e.preventDefault();

		if(loading){return}

		api.delete(this);

	});
  
	$('.js-clearForm').click(function(e) {

		e.preventDefault();

		if(loading){return}

		api.clear(this);

	});
  
	$('.js-closeForm').click(function(e) {

		e.preventDefault();

		if(loading){return}

		api.close(this);

	});
    
});      

