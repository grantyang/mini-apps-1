window.addEventListener('DOMContentLoaded', function() {
  $('#submitBtn').on('click', event => {
    event.preventDefault();
    postJSON($('#jsonInput').val());
    $('#jsonInput').val('');
  });
});

var postJSON = function(input) {
  fetch('http://127.0.0.1:3000/json', {
    body: input, // must match 'Content-Type' header
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  }).then(response => {
    return response.text()
  }).then(responseData => {
    $('#result').html(responseData)
  }); 
}
// $.ajax({
//   type: 'POST',
//   url: 'http://127.0.0.1:3000/json',
//   contentType: 'application/json',
//   data: input,
//   success: (responseData) => {
//     $('#result').html(responseData)
//   },
//   error: (error) => {
//     console.log('there was an error', error)
//   }
// })