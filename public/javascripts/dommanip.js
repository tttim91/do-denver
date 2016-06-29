$(document).ready(function(){
  $('.edit').click(function(){
    $(this).next().find('.hidden_form').first().toggle()
  })
})
