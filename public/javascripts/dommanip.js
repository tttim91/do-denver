$(document).ready(function(){
  $('.edit').click(function(){
    $(this).next().find('.hidden_form').first().toggle()
  })
})


$('.scroll').click(function(){
  $(window).scrollTop(600)
})
