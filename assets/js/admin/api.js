//--Loading--

var loading = false;

//--Globals--

var debug = true;


var api = {

	//--Settings--

	notify: $.notify,

	//--Logging & notifying--

	//message MANDATORY, everything else defaults to something. status defaults to info, always show to user on success
	log: function(message,status,showUser){
    
    //todo if messagee on undefined tai tyhjä niin console logaa jotain ja kuole=return false

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
        loading = false;
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
		loading = false;

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
		loading = false;

	}


}
 