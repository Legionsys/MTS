indi = 0;
nam = '';
ema = '';
scr = '';
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
    $(".editusrcard").attr("data-id","0");
    nam = '';
    ema = '';
    scr = '';
    }
$(document).ready(function () {
    
  useridchk();
  mechk();

  
  $("#usrlist").on("click", ".usrcrd", function(){
    if (indi == 0){
      usrclr();
      $(".editusrcard").attr("data-id",$(this).attr("data-id"));
      nam = $(this).children(".usrnam").html();
      ema = $(this).children(".usreml").html();
      scr = $(this).children(".usrscrn").html();
      $("#upd_name").val(nam);
      $("#upd_email").val(ema);
      $("#upd_scrn").val(scr);
      if ($(this).children(".usract").html() == "ACTIVE") {
        $("#usract").html('ACTIVE');
      } else {
        $("#usract").html('INACTIVE');
      }
      $("#pwdchange").html('RESET PASSWORD');
    }
    indi = 0;   
  })
  $("#usrlist").on("click", ".usract", function(){
    indi = 1;
    //update Server to change status
    idn = $(this).parent(".usrcrd").attr("data-id");
    fun = 'status';
    if ($(this).html() == "ACTIVE") {
      upd = 1;
    } else {
      upd = 0;
    }  
    marker = $(this);
    $.post(
      "/inc/userman.php",
      { idn: idn, funct: fun, val: upd},
      function (data, status) {
        //alert(status);
        if (status == 'success') {
          if (upd == 1) {
            marker.html("INACTIVE");
          } else {
            marker.html("ACTIVE");
          }
        } else {
          alert('Error trying to update users status');
          console.log("Error: " + response.responseText);          
        }
      }
    ).fail(function (response) {
      alert('Error trying to update users status');
      console.log("Error: " + response.responseText);
    });

  })
  $("#usrlist").on("click", ".pwdreset", function(){
    indi = 1;
    idn = $(this).parent(".usrcrd").attr("data-id");
    fun = 'pwdres';
    //pop up shield
    $("#pop").addClass("obscr");
    $("#pop").html('<div class="passwrd_reset_splash"></div>');
    $(".passwrd_reset_splash").fadeOut(0, function() {
      $(this).html('').fadeIn(1500)
        .queue(function(n){
          $(this).html('<div class="pwdresalrt"></div>');
            $(".pwdresalrt").fadeOut(0, function() {
              $(this).html('Generating Temporary Password').fadeIn(500);              
            });
          n();
        });
      
    });
    $.post(
      "/inc/userman.php",
      { idn: idn, funct: fun},
      function (data, status) {
        //alert(status);
        if (status == 'success') {
          $(".passwrd_reset_splash").delay(500).fadeOut(0, function() {
            $(this).html('').fadeIn(500)
              .queue(function(n){
                $(this).html('<div class="pwdresalrt">New Password is <br><br>' + data + '</div>');
                n();
              });
            
          });          
        } else {
          alert('Error trying to reset password');
          console.log("Error: " + response.responseText);          
        }
      }
    ).fail(function (response) {
      alert('Error trying to reset password');
      console.log("Error: " + response.responseText);
    });
  });
  $("#pop").on("click",".pwdresalrt", function(event) {
    event.stopPropagation();
    
  })
  $("#pop").click(function () {
    $("#pop").removeClass("obscr");
    $("#pop").html('');
  });  

  $(".me_input").on("keyup", function(){
    if (nam != $("#upd_name").val() || ema != $("#upd_email").val() || scr != $("#upd_scrn").val()) {
      console.log("keyup change");
      console.log(ema);
      console.log($("#upd_email").val());
      $("#usrupd").removeClass("no-change");

    } else {
      console.log("keyup no change");
      console.log(ema);
      console.log($("#upd_email").val());
      $("#usrupd").addClass("no-change");
    }
  });
  $("#usrupd").click(function(){
    if($("#usrupd").hasClass("no-change")) {
      alert('"No-Change" Detected');
    } else {
      alert('"Change" Detected');
    }
  });


});
