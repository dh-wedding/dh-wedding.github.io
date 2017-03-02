window.navbarCollapsed = true;

$('.navbar-collapse').on('shown.bs.collapse', function() {
  navbarCollapsed = false;
});

$('.navbar-collapse').on('hidden.bs.collapse', function() {
  navbarCollapsed = true;
});

$(window).scroll(function() {
  if($(document).scrollTop() > 174) {            //only added for modal transition fix
      $('.navbar').removeClass('notransition');
  }
  if($(document).scrollTop() > 175) {
    $(".navbar-fixed-top").addClass("navbar-animation");
  }
  else {
    if (navbarCollapsed) {
        $(".navbar-fixed-top").removeClass("navbar-animation");
    }
  }
});

$(".navbar-toggle").click(function(){
  if ($(document).scrollTop() < 175) {
    if (!navbarCollapsed) {
      $(".navbar-fixed-top").removeClass("navbar-animation");
    }
    else {
      if (!$(".navbar-fixed-top").hasClass("navbar-animation")) {
          $(".navbar-fixed-top").addClass("navbar-animation")
      }
    }
  }
});

// collapse navbar on focus out

$('#navbar').focusout(function(){
  $('.navbar-collapse').collapse('hide');
});