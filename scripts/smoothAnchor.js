// $(document).on('click', 'a', function(event){
//     event.preventDefault();

//     $('html, body').animate({
//         scrollTop: $( $.attr(this, 'href') ).offset().top
//     }, 1000);
// });

//http://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    }, 500);
    return false;
});