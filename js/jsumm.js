var srchAll;
var srchCli;
var srchInv;
var srchJob;
var actcli = [];
var inact = [];
function joblstUpd(){
  var wild = $("#search-all").val();
  var cli =  srchCli;
  var job = srchJob;
  var inv = srchInv;
  console.log(wild + " - " + cli + " - " + job + " - " + inv);
  //Update jobs
  $.post(
    "/inc/job-summ-upd.php",
    { wild: wild, cli: cli, job: job, inv: inv },
    function (data, status) {
      $("#job_board").html(data);
    }
  );
};

function urlUpdate() {
  var filters;
  if (srchAll == 'null' || srchAll == false) {
    filters = 'wild=null';
  } else {
    filters = 'wild=' + srchAll;
  }
  if (srchCli == 'null' || srchCli == false) {
    filters = filters + '&cli=null';
  } else {
    filters = filters + '&cli=' + srchCli;
  }
  if (srchInv == 'null' || srchInv == false) {
    filters = filters + '&inv=null';
  } else {
    filters = filters + '&inv=' + srchInv;
  }
  if (srchJob == 'null' || srchJob == false){
    filters = filters + '&job=null';
  } else {
    filters = filters + '&job=' + srchJob;
  }
  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + filters;
  window.history.pushState({path:newurl},'',newurl);
};
function cliupd() {
  $.get("/inc/lstcli.php", function (data, status) {
    var clients = $.parseJSON(data);
    $.each(clients, function (i,v){
      if(v.act == "1"){
        actcli.push(v);
      } else {
        inact.push(v);
      }
      if (srchCli == v.clientId) {
        $("#clisel").html(v.clientName);
      }
    });
    //console.log(actcli);
  }).done(function(){
    clilstupd();
  });
}
function clilstupd(){
  $("#actclilst").html("");
  $.each(actcli, function (i,v){
    if($('#search-cli').val() == ''){
      $("#actclilst").append(
        '<div class="selCli" data-id="' + v.clientId + '"><div class="scname">' + v.clientName + '</div><div class="vtog"><img src="img/hide.svg" alt="hide client"></div></div>'
      )
    } else {
      if (v.clientName.toLowerCase().includes($('#search-cli').val().toLowerCase())){
      $("#actclilst").append(
        '<div class="selCli" data-id="' + v.clientId + '"><div class="scname">' + v.clientName + '</div><div class="vtog"><img src="img/hide.svg" alt="hide client"></div></div>'
      )}
    }
  });
  $("#deaclilst").html("");
  $.each(inact, function (i,v){
    if($('#search-cli').val() == ''){
      $("#deaclilst").append(
        '<div class="selCli" data-id="' + v.clientId + '"><div class="scname">' + v.clientName + '</div><div class="vtog"><img src="img/view.svg" alt="view client"></div></div>'
      )
    } else {
      if (v.clientName.toLowerCase().includes($('#search-cli').val().toLowerCase())){
        $("#deaclilst").append(
          '<div class="selCli" data-id="' + v.clientId + '"><div class="scname">' + v.clientName + '</div><div class="vtog"><img src="img/view.svg" alt="view client"></div></div>'
        )
      }
    }
  });
}
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};
$(window).on("load", function () {
  //console.log(window.location.href);
  //console.log(window.location.protocol + "//" + window.location.host + window.location.pathname + '?foo=bar');
  srchAll = getUrlParameter('wild');
  srchInv = getUrlParameter('inv');
  srchJob = getUrlParameter('job');
  srchCli = getUrlParameter('cli');
  //Check session data and update search information.
  joblstUpd();
  cliupd();
  //check URL for parameters for search filters
  //set search filters from parameters


  
  if (srchAll != "null" && srchAll != false ) {
    $("#search-all").val(srchAll);
  } else {
    srchAll = 'null';
  };
  
  if (srchInv == "null" || srchInv == false) {
    srchInv = 'All';
  };
  $("input[name='inv_Tog'][value='"+srchInv+"']").prop('checked', true);
  
  if (srchJob == "null" || srchJob == false) {
    srchJob = 'All';
  }
  $("input[name='job_Tog'][value='"+srchJob+"']").prop('checked', true);


  //update Client list
  //joblstUpd();  
});
$(document).ready(function () {

  //search update
  $("#search-all").keyup(function () {
    srchAll = $("#search-all").val();
    joblstUpd();
  });
  $("#search-all").change(function () {
    urlUpdate();
  });  

  $("input[type='radio']").change(function(){
    srchInv = $("input[name='inv_Tog']:checked").val();
    srchJob = $("input[name='job_Tog']:checked").val();
    urlUpdate();
    joblstUpd();
  });
  $('#search-cli').keyup(function() {
    clilstupd()
  })

  $("#clisel").click(function () {
    event.stopPropagation();
    $("#clilst").removeClass("hidden");
    var value = $("#search-cli").val();
    $("#search-cli").focus().val('').val(value);
  });
  $("body").click(function () {
    console.log("body click");
    $("#clilst").addClass("hidden");
  });
  $("#clilst").click(function () {
    event.stopPropagation();
  });
  $(".clilstr").click(function(){
    if($("#actclilst").hasClass("hidden")){
      $("#actclilst").removeClass("hidden");
      $("#deaclilst").addClass("hidden");
      $("#actimg").html('<img src="img/down.svg" alt="Open list">');
      $("#decimg").html('<img src="img/left.svg" alt="Open list">');
    } else {
      $("#deaclilst").removeClass("hidden");
      $("#actclilst").addClass("hidden");
      $("#decimg").html('<img src="img/down.svg" alt="Open list">');
      $("#actimg").html('<img src="img/left.svg" alt="Open list">');
    }
  })
  $('#cliclr').click(function(){
    srchCli = 'null';
    $("#clisel").html();
    $('#search-cli').val('');
    urlUpdate();
    joblstUpd();
  })

  $("#clilst").on('click',".scname", function () {
    console.log($(this).parents().attr("data-id"));
    console.log($(this).html());
    srchCli = $(this).parents().attr("data-id");
    $("#clisel").html($(this).html());
    $("#clilst").addClass("hidden");
    urlUpdate();
    joblstUpd();
  })
  $("#clilst").on('click',".vtog", function () {
    event.stopPropagation();
    console.log('vtogclick - ' + $(this).parents().attr("data-id"));
    console.log('vtogclick - ' + $(this).parents().parents().attr("id"));
    console.log($(this).parents().parents().attr("id").substring(0,3));
    var obj = {};
    var ind = 0;
    var clId = $(this).parents().attr("data-id");
    //check if Active of Deactive list
    if($(this).parents().parents().attr("id").substring(0,3) == 'act') {
      //if Active
      inact.unshift(actcli[actcli.findIndex(x => x.clientId === clId)]);
      actcli = $(actcli).not($.grep(actcli, function(e){ return e.clientId == clId; })).get();
    } else if($(this).parents().parents().attr("id").substring(0,3) == 'dea') {
      //If Deactivated
      ind = 1;
      actcli.unshift(inact[inact.findIndex(x => x.clientId === clId)]);
      inact = $(inact).not($.grep(inact, function(e){ return e.clientId == clId; })).get();
    } else {
      //Error thrown
      alert('Please note that there was an issue trying to update the status of the selected client. Please contact IT with the client name that you were trying to update.');
      return false;
    }
    clilstupd()
    $.post(
      "/inc/cliact_upd.php",
      { cli: clId, mkr: ind },
      function (data, status) {
        console.log(data);
        console.log(status);
      }
    ).fail(function (response) {
      console.log("Error: " + response.responseText);

    });

  })
});
