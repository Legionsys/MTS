indi = 0;
function useridchk(){
    $.get("/inc/usrlst.php", function (data, status) {
        $('#usrlist').html(data);
      });

  };
  function mechk(){
    $.get("/inc/usrlst_me.php", function (data, status) {
        $('#usrdet').html(data);
      });
  };  
  function usrclr(){
    $("#upd_name").val('');
    $("#upd_email").val('');
    $("#upd_scrn").val('');
    $("#usract").html('ACTIVE');
    $("#pwdchange").html('ADD USER');
    $(".actusrcard").attr("data-id","0");
    }
$(document).ready(function () {
    
  useridchk();
  mechk();

  
  $("#usrlist").on("click", ".usrcrd", function(){
    if (indi == 0){
      usrclr();
      $(".actusrcard").attr("data-id",$(this).attr("data-id"));
      $("#upd_name").val($(this).children(".usrnam").html());
      $("#upd_email").val('');
      $("#upd_scrn").val('');
      $("#usract").html('ACTIVE');
      $("#pwdchange").html('ADD USER');
    }
    indi = 0;   
  })
  $("#usrlist").on("click", ".usract", function(){
    indi = 1;
    alert("USERACT CLICKED - " + $(this).parent(".usrcrd").attr("data-id"));
  })
});