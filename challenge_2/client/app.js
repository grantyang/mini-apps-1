window.addEventListener('DOMContentLoaded', function(){
  $('#submitBtn').on('click', (event)=>{
    event.preventDefault()
    postJSON($('#jsonInput').val())
  })
})

var postJSON = function(input){
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3000/json',
    contentType: 'application/json',
    data: input,
    success: (responseData) => {
      console.log('success', responseData)
      $('#result').html(responseData)
    },
    error: (error) => {
      console.log('there was an error', error)
    }
  })
}