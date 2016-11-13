//EXPLANATION + DOCUMENTATION HERE
//
//
//

//--Loading--

var loading = false;

//--Globals--

var debug = true;


var form = {
  
  //Settings
 basePath: '/dashboard/',
 inputFields: 'input:text, input:password, input:file, select, textarea',
 checkBoxes: 'input:radio, input:checkbox',
 userWritableFields: 'input:text, input:password, select, textarea',
  
	// Clear form content
  // EXPECTS FORM if not form then find closest
	clear: function(element){
    
    //INIT
    var inputFields = this.inputFields; 
    var checkBoxes = this.checkBoxes; 
    var userWritableFields = this.userWritableFields; 

		// Error check
		if(!element){api.log('form.clear() - element not given', 'error'); return false}
    
    var isForm = $(element).is('form')
      , formFound;
    
    if(!isForm){
      api.log('form.clear() - is not form, trying to find closest parent that is a form', 'warning');
      formFound = $(element).closest('form').is('form');
      if(!formFound){api.log('form.clear() - cant find form, cant continue', 'error'); return false}
    }
    

		// Set loading
		loading = true;
    console.log(element);

		// Settings
    var form;
    
    
    if(isForm){
      form = $(element);
    }else if(formFound){
      form = $(element).closest('form');
    }

		if(debug){api.log('form.clear() - element: ' + element);}
    
    // start code from here
    // TODO: Make this really clear form
  
    //Clear all inputs then all boxes and radiobuttons
    $(form).find(inputFields).val('');
    $(form).find(checkBoxes).removeAttr('checked').removeAttr('selected');
    
    //Find first user writable field and focus
    $(form).find(userWritableFields).first().focus();
    
		if(debug){api.log('form.clear() form was cleared', 'success');}

		loading = false;
		return true;
	},
  // close form
	close: function(element){
    
    var basePath = this.basePath; 
    
    // Error check
		if(!element){api.log('form.clear() - element not given', 'error'); return false}
    
    var isForm = $(element).is('form')
      , formFound;
    
    if(!isForm){
      api.log('form.clear() - is not form, trying to find closest parent that is a form', 'warning');
      formFound = $(element).closest('form').is('form');
      if(!formFound){api.log('form.clear() - cant find form, cant continue', 'error'); return false}
    }
    

		// Set loading
		loading = true;
    console.log(element);

    var form;
    
    if(isForm){
      form = $(element);
    }else if(formFound){
      form = $(element).closest('form');
    }

		if(debug){api.log('form.clear() - element: ' + element);}
    
    var model = $(form).attr('model');
    window.location.pathname = basePath + model;
	}
  
}

//Set eventHandlers for forms

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
  
	$('[type=clear]').click(function(e) {

		e.preventDefault();
    
    if(loading){return}
    
    var parentForm = $(this).closest('form');

		form.clear(parentForm);

	});
  
	$('[type=close]').click(function(e) {

		e.preventDefault();

		if(loading){return}

    var parentForm = $(this).closest('form');

		form.close(parentForm);

	});
    
});     