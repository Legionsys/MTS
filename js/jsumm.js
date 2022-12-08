var srchAll;
var srchCli;
var srchInv;
var srchJob;
function joblstUpd(){
  var wild = $("#search-all").val();
  var cli =  $("#cli-fil").val();
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
  //Update url



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
  console.log(window.location.href);
  console.log(window.location.protocol + "//" + window.location.host + window.location.pathname + '?foo=bar');
  srchAll = getUrlParameter('wild');
  srchInv = getUrlParameter('inv');
  srchJob = getUrlParameter('job');
  srchCli = getUrlParameter('cli');
  //Check session data and update search information.

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

  $.get("/inc/cli-list-upd.php", function (data, status) {
    $("#cli-fil").html(data);
  }).done(function(){
    if (srchCli != "null" && srchCli != false) {
      $("#cli-fil").val(srchCli);
    } else {
      srchAll = 'null';
    };
    joblstUpd();
  });
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
  $("#cli-fil").change(function () {
    srchCli = $("#cli-fil").val();
    urlUpdate();
    joblstUpd();
  });
  $("input[type='radio']").change(function(){
    srchInv = $("input[name='inv_Tog']:checked").val();
    srchJob = $("input[name='job_Tog']:checked").val();
    urlUpdate();
    joblstUpd();
  });
});
