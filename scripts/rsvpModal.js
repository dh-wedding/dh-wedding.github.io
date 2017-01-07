
//Find My Invitation button
$('.mbtn-1').click(function (e){
    e.preventDefault();
    $('.modal-body').fadeOut("slow", function(){
        $('.mb-1').hide();
        $('.modal-body').fadeIn("slow");
        $('.mb-2').show();
    });
    $('.modal-footer').fadeOut("slow", function(){
        $('.mf-1').hide();
        $('.modal-footer').fadeIn("slow");
        $('.mf-2').show();
    });
});

//Next button
// $('.mbtn-2').click(function (e){
//     e.preventDefault();
//     $('.modal-body').fadeOut("slow", function(){
//         $('.mb-2').hide();
//         $('.modal-body').fadeIn("slow");
//         $('.mb-3').show();
//     });
//     $('.modal-footer').fadeOut("slow", function(){
//         $('.mf-2').hide();
//         $('.modal-footer').fadeIn("slow");
//         $('.mf-3').show();
//     });
// });