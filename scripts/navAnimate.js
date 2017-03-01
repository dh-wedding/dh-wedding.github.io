$(window).scroll(function() {
if($(document).scrollTop() > 174) {            //only added for modal transition fix
    $('.navbar').removeClass('notransition');
}
if($(document).scrollTop() > 175) {
  $(".navbar-fixed-top").addClass("navbar-animation");
}
else {
  $(".navbar-fixed-top").removeClass("navbar-animation");
}
});

// collapse navbar on focus out

$('#navbar').focusout(function(){
  $('.navbar-collapse').collapse('hide');
});


// window.navbarCollapsed = true;

// $(window).scroll(function() {
// if($(document).scrollTop() > 174) {            //only added for modal transition fix
//   if (navbarCollapsed) {
//       $('.navbar').removeClass('notransition');
//   }

// }


// $('.navbar-collapse').on('shown.bs.collapse', function() {
//   navbarCollapsed = false;
// });

// $('.navbar-collapse').on('hidden.bs.collapse', function() {
//   navbarCollapsed = true;
// });

// if($(document).scrollTop() > 175) {
//   $(".navbar-fixed-top").addClass("navbar-animation");
// }
// else {
//   if (navbarCollapsed) {
//     $(".navbar-fixed-top").removeClass("navbar-animation");
//   }
// }
// });

// // collapse navbar on focus out

// $('#navbar').focusout(function(){
//   $('.navbar-collapse').collapse('hide');
// });

// $(".navbar-toggle").click(function(){
//     if($(document).scrollTop() < 175) {
//         if($('.navbar-fixed-top').hasClass("navbar-animation")) {
//           if (navbarCollapsed) {
//             $(".navbar-fixed-top").removeClass("navbar-animation");
//           }
//         }
//         else {
//           $(".navbar-fixed-top").addClass("navbar-animation");
//         }
//     }
// });