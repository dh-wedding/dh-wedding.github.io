$(window).scroll(function() {
if($(document).scrollTop() > 175) {
  $(".navbar-fixed-top").addClass("navbar-animation");
}
else {
  $(".navbar-fixed-top").removeClass("navbar-animation");
}
});