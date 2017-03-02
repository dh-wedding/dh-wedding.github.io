//----- set up mobile select picker -----//

$(document).ready(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
      $('.selectpicker').selectpicker('mobile');
    }
});


//----------------------- db ------------------------------//

  // var url = "//dh-wedding.herokuapp.com/?fname=Derek&lname=Kidd";

$(".mbtn-1").click(function(){
  showSearch();
});

var numInvitees = 0;
var inviteeNames = [];
var inviteId = null;
var inviteeResponses = [];

function getInvitees() {
  var fname = $("#fname")[0].value.toLowerCase();
  var lname = $("#lname")[0].value.toLowerCase();
  var params = "?fname=" + fname + "&lname=" + lname;
  var url = "//dh-wedding.herokuapp.com/"+ params;
  $.get(url, function(data){
    if (JSON.parse(data).status == "success") {                                  //to emulate a failure to find invite change this to "!="
      var ab_1 = "<div class=\"attend-block\">" +
                   "<div class=\"guest-name\">";
      var ab_2 =   "</div>" +
                   "<select class=\"selectpicker will\" id=\"attendingSelect_";
      var ab_3 =                                                              "\">" +
                     "<option>will</option>" +
                     "<option>will not</option>" +
                   "</select>" +
                   "<div>" +
                     "&nbsp;be attending." +
                   "</div>" +
                 "</div>";
      var data_obj = JSON.parse(data);
      for (var i = 0; i < data_obj.invite.length ;i++) {
        $("#attend-form").append(ab_1 + data_obj.invite[i].fname + " " + data_obj.invite[i].lname + "&nbsp;" + ab_2 + i + ab_3);
        inviteeNames.push(data_obj.invite[i].fname + " " + data_obj.invite[i].lname);
      }
      $('.selectpicker').selectpicker('refresh');
      inviteId = data_obj.invite.inviteId;
      numInvitees = data_obj.invite.length;
      if (numInvitees < 2) {
        wellToIll();
      }
      else {
        illToWell();
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
//     url: "//dh-wedding.herokuapp.com/?fname=Derek&lname=Kidd",
//     crossDomain: true,
//     data: {},
//     dataType: "json",
//     success: function() { alert('Success!'); }
//   });
// });



//---------------------- gui ------------------------------//

//----- modal 1 -----//

$("#lname").keyup(function(event){
  if (event.keyCode == 13){
      $(".mbtn-1").click();
  }
});

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
    $('.searching').hide(showModal2(1));
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

function showModal1() {
  $('.modal-body').fadeOut("slow", function(){
    $('.mb-2').hide(function() {
      clearAllModalFields();
    });
    $('.modal-body').fadeIn("slow");
    $('.mb-1').show();
    hideBackButton();
  });
  $('.modal-footer').fadeOut("slow", function(){
    $('.mf-2').hide();
    $('.modal-footer').fadeIn("slow");
    $('.mf-1').show();
  });
}

function showModal2(prevModal) {
  if (prevModal == 1) {
    $('.modal-body').fadeOut("slow", function(){
      $('.mb-1').hide();
      $('.modal-body').fadeIn("slow");
      $('.mb-2').show();
      setupBackButton(2);
      showBackButton();
    });
    $('.modal-footer').fadeOut("slow", function(){
      $('.mf-1').hide();
      $('.modal-footer').fadeIn("slow");
      $('.mf-2').show();
    });
  }
  else if (prevModal == 3) {
    $('.modal-body').fadeOut("slow", function(){
      $('.mb-3').hide();
      $('.modal-body').fadeIn("slow");
      $('.mb-2').show();
      setupBackButton(2);
    });
    $('.modal-footer').fadeOut("slow", function(){
      $('.mf-3').hide();
      $('.modal-footer').fadeIn("slow");
      $('.mf-2').show();
    });
  }
}

//----- modal 2 -----//
function setupBackButton(modalNumber) {
  $('.modal .back').off("click");
  if (modalNumber == 2) {
    $('.modal .back').click(function() {
      showModal1();
      clearModal1();                   //if this starts looking buggy, move this call to the showBackButton's show callback
    });
  }
  else if (modalNumber == 3) {
    $('.modal .back').click(function() {
      showModal2(3);
      clearModal3();
    });
  }
}

function clearAllModalFields() {
  resetGlobals();
  clearModal1();
  clearModal2();
  clearModal3();
  clearModal4();
}

function resetGlobals() {
  numInvitees = 0;
  inviteeNames = [];
  inviteeResponses = [];
}

function clearModal1() {
  $("#fname").val("");
  $("#lname").val("");
  $('.notFound').hide();
  $('.searching').hide();

}

function clearModal2() {
  $("#attend-form").empty();
  $("#chkbx").prop('checked', false);
  checkboxHandler();
}

function clearModal3() {
  setTimeout(function(){
    $("#attendingInvitees").empty();
    $(".inviteesWillAttend").hide();
    $(".inviteesWillNotAttend").hide();
    $("#addAdultsCount").html(0);
    $("#addChildrenCount").html(0);
    $("#note").val("");
  }, 650);                                       //safest-looking timeout
}

function clearModal4() {
  $("#email").val("");
}

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

function buildAttendingWatches() {
  $('.will .selectpicker').each(function() {
      inviteeResponses.push($(this).val());
  });

  $('.will .selectpicker').on('change', function(){
    if (inviteeResponses.length > 0) {                          //check to see if invitee responses has been filled before
      inviteeResponses = [];                                    //clear invitee responses
      $('.will .selectpicker').each(function() {
        inviteeResponses.push($(this).val());
      });
      willArray = checkInviteeResponses();
      if (!willArray[0]) {                                      //all responses are "will not"
        $("#chkbx").prop('checked', false);
        checkboxHandler();                                      //// created this handler to take care of hiding add-numbers
        $("#chkbx").prop('disabled', true);
      }
      else {                                                    //at least one response is "will"
        $("#chkbx").prop('disabled', false);
        if ((numInvitees - willArray[1]) == numInvitees - 1) {  //only one invitee said "will" //when numInvitees > 1
          wellToIll();
        }
        else {                                                  //more than one response is "will"
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

function checkAddGuestsCount() {
  return [parseInt($('select#add-adults').val()), parseInt($('select#add-children').val())];
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
    setupInviteeBlock();
    setupAddGuestsCount();
    setupTotalAttending();
});


function showModal3() {
  $('.modal-body').fadeOut("slow", function(){
    $('.mb-2').hide();
    $('.modal-body').fadeIn("slow");
    $('.mb-3').show();
    setupBackButton(3);
  });
  $('.modal-footer').fadeOut("slow", function(){
    $('.mf-2').hide();
    $('.modal-footer').fadeIn("slow");
    $('.mf-3').show();
  });
}

//----- modal 3 -----//


function setupInviteeBlock() {
  if ($.inArray("will", inviteeResponses) != -1) {
    $(".inviteesWillAttend").show();
    var ib_1 = "<div class=\"row\">" +
                 "<div class=\"col-md-6 col-sm-6 col-xs-6 invitee\">";
    var ib_2 =                                     "</div>" +
                 "<div class=\"col-md-6 col-sm-6 col-xs-6 text-right count\">";
    var ib_3 =                                              "</div>" +
               "</div>";

    for (var i = 0; i < inviteeResponses.length ;i++) {
      if (inviteeResponses[i] == "will") {
        $("#attendingInvitees").append(ib_1 + inviteeNames[i] + ib_2 + 1 + ib_3);
      }
    }
  }
  else {
    $(".inviteesWillNotAttend").show();
  }
  showModal3();
}

function setupAddGuestsCount() {
  if ($("#chkbx").prop('checked') == true) {
    $("#addAdultsCount").html($('select#add-adults').val());
    $("#addChildrenCount").html($('select#add-children').val());
  }
}

function setupTotalAttending() {
  $("#totalAttending").html(getTotalAttending());
}

function getTotalAttending() {
  return parseInt(checkInviteeResponses()[1]) + checkAddGuestsCount().reduce( ( prev, cur ) => prev + cur );
}

function sendRSVP(){
  var rsvpData = {
    inviteId: inviteId,
    inviteeNames: inviteeNames,
    inviteeResponses: inviteeResponses,
    addGuests: $("#chkbx").prop('checked'),
    addAdults: checkAddGuestsCount()[0],
    addChildren: checkAddGuestsCount()[1],
    total: getTotalAttending(),
    note: $('#note').val()
  }
  //http://127.0.0.1:4567
  var url = "//dh-wedding.herokuapp.com/";
  $.ajax({
    url: url,
    type: "PUT",
    success: showModal4,
    data: rsvpData
  });
}

$('.mbtn-3').click(function (e){
    e.preventDefault();
    sendRSVP();
});

//----- modal 4 -----//

function showModal4() {
  $('.modal-body').fadeOut("slow", function(){
    $('.mb-3').hide();
    $('.modal-body').fadeIn("slow");
    $('.mb-4').show();
    hideBackButton();
  });
  $('.modal-footer').fadeOut("slow", function(){
    $('.mf-3').hide();
    $('.modal-footer').fadeIn("slow");
    $('.mf-4').show();
  });
}

function sendEmail(){
  var emailAddress = {
    inviteId: inviteId,
    email: $("#email").val()
  }
  var url = "//dh-wedding.herokuapp.com/email";
  $.ajax({
    url: url,
    type: "PUT",
    success: closeModal,
    data: emailAddress
  });
}

$('.mbtn-4').click(function (e){
    e.preventDefault();
    sendEmail();
});


//----- close modal -----//

function resetModal() {
    $('.mb-2').hide();
    $('.mf-2').hide();
    $('.mb-3').hide();
    $('.mf-3').hide();
    $('.mb-4').hide();
    $('.mf-4').hide();
    //need to add in modal 4 and 5
}

function closeModal() {
  $('#rsvpModal').modal('hide');
}

$('#rsvpModal').on('hidden.bs.modal', function (e) {
  resetModal();
  showModal1();
});




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