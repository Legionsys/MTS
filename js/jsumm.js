function joblstUpd(){
  var wild = $("#search-all").val();
  var cli = $("#cli-fil").val();
  var job = $("input[name='job_Tog']:checked").val();
  var inv = $("input[name='inv_Tog']:checked").val();
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
$(window).on("load", function () {
  //Check session data and update search information.

  if (sessionStorage.getItem('search-all') != "null") {
    $("#search-all").val(sessionStorage.getItem('search-all'));
  };
  
  if (sessionStorage.getItem('Inv') == "null") {
    sessionStorage.setItem('Inv','All');
  };
  $("input[name='inv_Tog'][value='"+sessionStorage.getItem('Inv')+"']").prop('checked', true);
  
  if (sessionStorage.getItem('job') == "null") {
    sessionStorage.setItem('job','All');
  };
  console.log(sessionStorage.getItem('job'));
  $("input[name='job_Tog'][value='"+sessionStorage.getItem('job')+"']").prop('checked', true);  
  
  $.get("/inc/cli-list-upd.php", function (data, status) {
    $("#cli-fil").html(data);
  }).done(function(){
    if (sessionStorage.getItem('cli-fil') != "null") {
      $("#cli-fil").val(sessionStorage.getItem('cli-fil'));
    };
    joblstUpd();
  });
  //update Client list
  joblstUpd();  
});
$(document).ready(function () {

  //search update
  $("#search-all").keyup(function () {
    sessionStorage.setItem('search-all',$("#search-all").val());

    joblstUpd();
  });
  $("#cli-fil").change(function () {
    sessionStorage.setItem('cli-fil',$("#cli-fil").val());
    joblstUpd();
  });
  $("input[type='radio']").change(function(){
    sessionStorage.setItem('Inv',$("input[name='inv_Tog']:checked").val());
    sessionStorage.setItem('job',$("input[name='job_Tog']:checked").val());
    joblstUpd();
  });
  $("#cli-fil").on("dblclick",function(){
    $("#cli-fil").val(sessionStorage.getItem('cli-fil'));
    console.log($("#cli-fil").val());
  })

});
