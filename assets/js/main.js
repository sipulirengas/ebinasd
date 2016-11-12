//submit code for reg
$('form.code').submit(function(e) {
  e.preventDefault()
  window.location.href = "/register/" + $('form.code input').val();
}); 
