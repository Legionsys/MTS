
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
$(document).ready(function () {
    useridchk();
    mechk();
  
  });