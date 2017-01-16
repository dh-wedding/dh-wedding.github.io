//----- set up mobile select picker -----//

$(document).ready(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
      $('.selectpicker').selectpicker('mobile');
    }
});


//----------------------- db ------------------------------//

  // var url = "http://dh-wedding.herokuapp.com/?fname=Derek&lname=Kidd";

$(".mbtn-1").click(function(){
  showSearch();
});

var numInvitees = 0;

function getInvitees() {
  var fname = $("#fname")[0].value;
  var lname = $("#lname")[0].value;
  var params = "?fname=" + fname + "&lname=" + lname;
  var url = "http://dh-wedding.herokuapp.com/"+ params;
  $.get(url, function(data, status){
    if (status == "success") {                                  //to emulate a failure to find invite change this to "!="
      var ab_1 = "<div class=\"attend-block\">" +
                   "<div class=\"guest-name\">";
      var ab_2 =   "</div>" +
                   "<select class=\"selectpicker will\" id=\"attendingSelect_";
      var ab_3 =                                                                     "\">" +
                     "<option>will</option>" +
                     "<option>will not</option>" +
                   "</select>" +
                   "<div>" +
                     "&nbsp;be attending." +
                   "</div>" +
                 "</div>";
      var data_obj = JSON.parse(data);
      for (var i = 0; i < data_obj.length ;i++) {
        $("#attend-form").append(ab_1 + data_obj[i].fname + " " + data_obj[i].lname + "&nbsp;" + ab_2 + i + ab_3);
      }
      $('.selectpicker').selectpicker('refresh');
      numInvitees = data_obj.length;
      if (numInvitees < 2) {
        wellToIll();
      }
      buildAttendingWatches();
      hideSearch_success();
    }
    else {
      hideSearch_fail();
    }
  });
}

// $(".mbtn-1").click(function(){
//   $.ajax({
//     type: "GET",
//     url: "http://dh-wedding.herokuapp.com/?fname=Derek&lname=Kidd",
//     crossDomain: true,
//     data: {},
//     dataType: "json",
//     success: function() { alert('Success!'); }
//   });
// });



//---------------------- gui ------------------------------//

//----- modal 1 -----//

function showSearch() {
  if($('.notFound').is(':visible')) {
    $('.notFound').fadeOut("slow", function(){
      $('.notFound').hide( function() {
        $('.searching').fadeIn("slow", function(){    // This is duplicating functionality of the else
          $('.searching').show(getInvitees());        // I need it to not have an else, and do this portion regardless
        });                                           // if notFound is visible
      });
    });
  }
  else {
    $('.searching').fadeIn("slow", function(){
      $('.searching').show(getInvitees());
    });
  }
}

function hideSearch_success() {
  $('.searching').fadeOut("slow", function(){
    $('.searching').hide(showModal2());
  });
}

function hideSearch_fail() {
$('.searching').fadeOut("slow", function(){
    $('.searching').hide(function(){
      $('.notFound').fadeIn("slow", function(){
        $('.notFound').show();
      });
    });
  });
}

function showModal2() {
  $('.modal-body').fadeOut("slow", function(){
    $('.mb-1').hide();
    $('.modal-body').fadeIn("slow");
    $('.mb-2').show();
    showBackButton();
  });
  $('.modal-footer').fadeOut("slow", function(){
    $('.mf-1').hide();
    $('.modal-footer').fadeIn("slow");
    $('.mf-2').show();
  });
}

//----- modal 2 -----//

function showBackButton() {
  $('.modal .back').fadeIn("slow", function() {
    $('.modal .back').show();
  });
}

function hideBackButton() {
  $('.modal .back').fadeOut("slow", function() {
    $('.modal .back').hide();
  });
}

function wellToIll(){
  $('#ill_well').fadeOut("slow", function(){
    var div = $("<div id=\"ill_well\">I\'ll</div>").hide();
    $(this).replaceWith(div);
    $('#ill_well').fadeIn("slow");
  });
}

function illToWell() {
  $('#ill_well').fadeOut("slow", function(){
    var div = $("<div id=\"ill_well\">We\'ll</div>").hide();
    $(this).replaceWith(div);
    $('#ill_well').fadeIn("slow");
  });
}

inviteeResponses = [];                                  //this is global


function buildAttendingWatches() {
  $('.will .selectpicker').each(function() {
      inviteeResponses.push($(this).val());
  });

  $('.will .selectpicker').on('change', function(){
    if (inviteeResponses.length > 0) {
      inviteeResponses = [];
      $('.will .selectpicker').each(function() {
        inviteeResponses.push($(this).val());
      });
      willArray = checkInviteeResponses();
      if (!willArray[0]) {                               //all responses are "will not"
        $("#chkbx").prop('checked', false);
        checkboxHandler();                               //// created this handler to take care of hiding add-numbers
        $("#chkbx").prop('disabled', true);
      }
      else {                                             //at least one response is "will"
        $("#chkbx").prop('disabled', false);
        if (willArray[1] == numInvitees - 1) {           //only one invitee said "will"
          wellToIll();
        }
        else {                                           //more than one response is "will"
          illToWell();
        }
      }
    }
  });
}

function checkInviteeResponses() {
  var willTrip = false;
  var willCount = 0;
  for(var i = 0; i < numInvitees; i++) {
    if (inviteeResponses[i] === "will") {
          willTrip = true;
          willCount += 1;
    }
  }
  return [willTrip, willCount];
}

// $('#chkbx').prop("checked", $('#chkbx').prop("checked")).change(function(){}); //true checkbox onchange event

$("#chkbx").change(function(){
  checkboxHandler();
});

function checkboxHandler() {
  if ($("#chkbx").prop('checked') == true) {
    $("#add-numbers").fadeIn("slow", function(){
      $("#add-numbers").show();
    });
  }
  else if ($("#chkbx").prop('checked') == false){
    $("#add-numbers").fadeOut("slow", function(){
      $("#add-numbers").hide(function(){
        $('select#add-adults').val(0);
        $('#add-adults.selectpicker').selectpicker('refresh');
        $("#add-adults-label").html("adults");
        $('select#add-children').val(0);
        $('#add-children.selectpicker').selectpicker('refresh');
        $("#add-children-label").html("children");
        if (numInvitees < 2) {
          $("#ill_well").html("I\'ll");
        }
      });
    });
  }
}

$("#add-adults").change(function(){
  if ($("#add-adults.selectpicker").selectpicker('val') == "1") {
    $('#add-adults-label').fadeOut("slow", function(){
      var div = $("<div id='add-adults-label'>adult</div>").hide();
      $(this).replaceWith(div);
      $('#add-adults-label').fadeIn("slow");
    });
  }
  else {
    if($('#add-adults-label').html() == "adult") {
      $('#add-adults-label').fadeOut("slow", function(){
        var div = $("<div id='add-adults-label'>adults</div>").hide();
        $(this).replaceWith(div);
        $('#add-adults-label').fadeIn("slow");
      });
    }
  }
});

$("#add-children").change(function(){
  if ($("#add-children.selectpicker").selectpicker('val') == "1") {
    $('#add-children-label').fadeOut("slow", function(){
      var div = $("<div id='add-children-label'>child.</div>").hide();
      $(this).replaceWith(div);
      $('#add-children-label').fadeIn("slow");
    });
  }
  else { //check for the .html value of add-adults-label to see if it is adult or adults
    if($('#add-children-label').html() == "child.") {
      $('#add-children-label').fadeOut("slow", function(){
        var div = $("<div id='add-children-label'>children.</div>").hide();
        $(this).replaceWith(div);
        $('#add-children-label').fadeIn("slow");
      });
    }
  }
});


//Next button
$('.mbtn-2').click(function (e){
    e.preventDefault();
    $('.modal-body').fadeOut("slow", function(){
        $('.mb-2').hide();
        $('.modal-body').fadeIn("slow");
        $('.mb-3').show();
    });
    $('.modal-footer').fadeOut("slow", function(){
        $('.mf-2').hide();
        $('.modal-footer').fadeIn("slow");
        $('.mf-3').show();
    });
});

//----- modal 3 -----//



// $('.mbtn-1').click(function (e){
//     e.preventDefault();
//     $('.modal-body').fadeOut("slow", function(){
//         $('.mb-1').hide();
//         $('.modal-body').fadeIn("slow");
//         $('.mb-2').show();
//     });
//     $('.modal-footer').fadeOut("slow", function(){
//         $('.mf-1').hide();
//         $('.modal-footer').fadeIn("slow");
//         $('.mf-2').show();
//     });
// });
