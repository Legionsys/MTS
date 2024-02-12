indi = 0;
nam = '';
ema = '';
scr = '';
var myDetails = new Object();
function useridchk(){
    $.get("/inc/usrlst.php", function (data, status) {
        $('#usrlist').html(data);
      });

  };
  function mechk(){
    myDetails.name = $("#my_name").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    myDetails.email = $("#my_email").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    myDetails.scr = $("#my_scrn").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    /*$.get("/inc/usrlst_me.php", function (data, status) {
        $('#usrdet').html(data);

      });*/
  };  
  function usrclr(){
    $("#upd_name").val('');
    $("#upd_email").val('');
    $("#upd_scrn").val('');
    $("#usract").html('ACTIVE');
    $("#usract").addClass("no-change");
    $("#pwdchange").addClass("no-change");
    $("#usrupd").html("ADD USER");
    $(".editusrcard").attr("data-id","0");
    $("#upd_scrn").removeClass("rejected").removeClass("approved").addClass("inp_std");
    $("label[for=upd_scrn]").removeClass("lab_rejected").removeClass("lab_approved");
    $("label[for=upd_scrn]").html("Login Name");
    nam = '';
    ema = '';
    scr = '';
    }
  function passclr(){
    $("#Cur_pass").val('');
    $("#npo_pass").val('');
    $("#npt_pass").val('');
    $("#Cur_pass").removeClass("approved").removeClass("rejected");
    $("label[for=Cur_pass]").removeClass("lab_approved").removeClass("lab_rejected");
    $("label[for=Cur_pass]").html("Current Password");
    $('#passUpdBut').addClass('no-change');
    $('.valid').addClass('invalid').removeClass('valid');
  }
$(document).ready(function () {
  var chk = [0,0,0,0,0,0];
  useridchk();
  mechk();

  //universal items

  //Me items
  $(".me_input").on("keyup", function(){
    if (myDetails.name != $("#my_name").val() || myDetails.email != $("#my_email").val() || myDetails.scr != $("#my_scrn").val()) {
      $("#usrupdme").removeClass("no-change");
    } else {
      $("#usrupdme").addClass("no-change");
    }
  });

  $("#me_pwd_ch").click(function(){
    //console.log("pwd Change CLK");
    indi = 1;
    $("#pop").addClass("obscr");
    $("#passwrd_chg").removeClass('hide');

  })
  $('#passUpdBut').click(function(){
    if ($(this).hasClass("no-change")) {
      console.log("no-change no post");
    } else {
      var myPass = new Object();
      myPass.id = $(".actusrcard").attr("data-id");
      myPass.npass = $("#npo_pass").val();
      var senBuild = JSON.stringify(myPass);
      var xhr = new XMLHttpRequest();
        
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
          console.log(xhr.responseText);
          
          if (xhr.responseText.search('Error') > -1) {
            alert("Password update failed, please report to page Admin ln 280");
            
          } else {
            alert("Password update successful");
            passclr();
            $("#pop").removeClass("obscr");
            $("#passwrd_chg").addClass('hide');
          }
        }

      };
      xhr.open("POST", "/inc/usrpassupd.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(senBuild);
    }
  })
  $("#Cur_pass").blur(function() {
    if ($("#Cur_pass").val() == ''){
      $("#Cur_pass").removeClass("approved").removeClass("rejected");
      $("label[for=Cur_pass]").removeClass("lab_approved").removeClass("lab_rejected");
      $("label[for=Cur_pass]").html("Current Password");
    } else {
      var myPass = new Object();
      myPass.id = $(".actusrcard").attr("data-id");
      myPass.pass = $("#Cur_pass").val();
      var senBuild = JSON.stringify(myPass);
      var xhr = new XMLHttpRequest();
        
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
          console.log(xhr.responseText);
          console.log(xhr.responseText.search('Error'));
          if (xhr.responseText.search('Error') > -1) {
            console.log("rejected upd");
            //password did not match make box red
            $("#Cur_pass").removeClass("approved").addClass("rejected");
            $("label[for=Cur_pass]").removeClass("lab_approved").addClass("lab_rejected");
            $("label[for=Cur_pass]").html("Current Password - DOESN'T MATCH");
            chk[5] = 0;
          } else {
            console.log("Approved upd");
            //password matched make box green
            $("#Cur_pass").removeClass("rejected").addClass("approved");
            $("label[for=Cur_pass]").removeClass("lab_rejected").addClass("lab_approved");
            $("label[for=Cur_pass]").html("Current Password - MATCH");
            chk[5] = 1;
          }
        }

      };
      xhr.open("POST", "/inc/usrpasschk.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(senBuild);
  }
  })
  $('.newp').keyup(function() {
    var pswd = $("#npo_pass").val();
    
    //check length
    if (pswd.length < 8 ) {
      $("#length").removeClass("valid").addClass("invalid");
      chk[0] = 0;
    } else {
      $("#length").removeClass("invalid").addClass("valid");
      chk[0] = 1;
    }
    //validate letter
    if ( pswd.match(/[A-z]/) ) {
      $('#letter').removeClass('invalid').addClass('valid');
      chk[1] = 1;
    } else {
      $('#letter').removeClass('valid').addClass('invalid');
      chk[1] = 0;
    }
    //validate capital letter
    if ( pswd.match(/[A-Z]/) ) {
      $('#capital').removeClass('invalid').addClass('valid');
      chk[2] = 1;
    } else {
      $('#capital').removeClass('valid').addClass('invalid');
      chk[2] = 0;
    }
    //validate number
    if ( pswd.match(/\d/) ) {
      $('#number').removeClass('invalid').addClass('valid');
      chk[3] = 1;
    } else {
      $('#number').removeClass('valid').addClass('invalid');
      chk[3] = 0;
    }
    if (pswd == $("#npt_pass").val() && pswd != '') {
      $('#matchpwd').removeClass('invalid').addClass('valid');
      chk[4] = 1;
    } else {
      $('#matchpwd').removeClass('valid').addClass('invalid');
      chk[4] = 0;
    }
    //add all of the array together
    if (chk.includes(0)){
      $('#passUpdBut').addClass('no-change');
    } else {
      $('#passUpdBut').removeClass('no-change');
    };
    console.log(chk.toString());
    }).focus(function(){
      indi = 1;
    }).blur(function(){
      indi = 0;
    });
  $(".vpas").mousedown(function(){
    //alert($(this).attr("lnk"));
    var x = document.getElementById($(this).attr("lnk"));
    x.type = "text";
  }).mouseup(function(){
    var x = document.getElementById($(this).attr("lnk"));
    x.type = "password";
  });
  $("#me_usract").click(function(){
    if (confirm("Note that this action will deactivate your account and log you out.\nDo you still want to continue?")) {
      //process to update account active status
      indi = 1;
      //update Server to change status
      idn = $(".actusrcard").attr("data-id");
      fun = 'status';
      upd = 1;
      $.post(
        "/inc/userman.php",
        { idn: idn, funct: fun, val: upd},
        function (data, status) {
          //alert(status);
          if (status == 'success') {
          //confirm and log out
            alert('Your account has been deactivated and you will now be logged out');
            window.location = '/inc/logout.inc.php';
          } else {
            alert('Error trying to update users status');
            console.log("Error: " + response.responseText);          
          }
        }
      ).fail(function (response) {
        alert('Error trying to update users status');
        console.log("Error: " + response.responseText);
      });

    }
  })
  $("#usrupdme").click(function(){
    if(!$("#usrupdme").hasClass("no-change")) {
      //build JSON
      var myNew = new Object();
      myNew.id = $(".actusrcard").attr("data-id");
      myNew.name = $("#my_name").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      myNew.email = $("#my_email").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      myNew.scr = $("#my_scrn").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      var senBuild = JSON.stringify(myNew);
      //console.log(senBuild);
      //Send request and process
      var xhr = new XMLHttpRequest();
      
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
          //console.log(xhr.responseText);
          if (xhr.responseText.search('Error') > -1) {
            alert('Updating User Details Failed');
          } else {
            mechk();
            $("#usrupdme").addClass("no-change");
          }
        }
  
      };
      xhr.open("POST", "/inc/userupd.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(senBuild);
    }
  });

  $(".clr").click(function(){
    usrclr()
  })

  //user table items
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
        $("#usract").removeClass("no-change");
      } else {
        $("#usract").html('INACTIVE');
        $("#usract").removeClass("no-change");
      }
      $("#pwdchange").html('RESET PASSWORD');
      $("#pwdchange").removeClass("no-change");
      $("#usrupd").html("UPDATE");
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
    $(".pwdresalrt").html('Generating Temporary Password');
    $(".pwdresalrt").removeClass("hide");
    $.post(
      "/inc/userman.php",
      { idn: idn, funct: fun},
      function (data, status) {
        //alert(status);
        if (status == 'success') {
          $(".pwdresalrt").html('New Password is <br><br>' + data);
        } else {
          $(".pwdresalrt").html('ERROR WITH PASSWORD RESET');
          alert('Error trying to reset password');
          console.log("Error: " + response.responseText);          
        }
      }
    ).fail(function (response) {
      $(".pwdresalrt").html('ERROR WITH PASSWORD RESET');
      alert('Error trying to reset password');
      console.log("Error: " + response.responseText);
    });
  });
  //User edit items
  $(".usr_input").on("keyup", function(){
    if ($("#upd_name").val() != '' && $("#upd_email").val() != '' && $("#upd_scrn").val() != '' && !$("#upd_scrn").hasClass("invalid")) {
      if (nam != $("#upd_name").val() || ema != $("#upd_email").val() || scr != $("#upd_scrn").val()) {
        $("#usrupd").removeClass("no-change");
      } else {
        $("#usrupd").addClass("no-change");
      }
    } else {
      $("#usrupd").addClass("no-change");
    }
  });
  $("#usrupd").click(function(){
    if ($(this).hasClass("no-change")) {
      
    } else {
      var usrD = new Object();
      usrD.id = $(".editusrcard").attr("data-id");
      usrD.name = $("#upd_name").val();
      usrD.email = $("#upd_email").val();
      usrD.scr = $("#upd_scrn").val();
      var senBuild = JSON.stringify(usrD);
      console.log(senBuild);
      if ($(".editusrcard").attr("data-id") == '0') {
        $("#pop").addClass("obscr");
        $(".pwdresalrt").html('Creating New User');
        $(".pwdresalrt").removeClass("hide");      
        $(".passwrd_reset_splash").removeClass("hide");      
      } else {
        
      }
      
      //Send request and process
      var xhr = new XMLHttpRequest();
      
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
          console.log(xhr.response);
          console.log(xhr.responseText);
          if (xhr.responseText.search('Error') > -1) {
            if ($(".editusrcard").attr("data-id") == "0") {
              $(".pwdresalrt").html('Error creating user');
            } else {
              alert('Updating User Details Failed');
            }
          } else {
            if ($(".editusrcard").attr("data-id") == "0") {
              $(".editusrcard").attr("data-id",xhr.responseText.split("-")[1]);
              $(".pwdresalrt").html('New User Created <br> Password is <br>' + xhr.responseText.split("-")[2]);
              $("#usract").html('ACTIVE');
              $("#usract").removeClass("no-change");
              $("#pwdchange").html('RESET PASSWORD');
              $("#pwdchange").removeClass("no-change");
              $("#usrupd").html("UPDATE");
              console.log(xhr.responseText);
            } else {
              alert('Updating User Details Success');
            }            
            useridchk();
            nam = $("#upd_name").val();
            ema = $("#upd_email").val();
            scr = $("#upd_scrn").val();
            $("#usrupd").addClass("no-change");
            
          }
        }
        
      };
      xhr.open("POST", "/inc/userupd.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(senBuild);
      
    }
  })
  $("#upd_scrn").blur(function(){
    if ($("#upd_scrn").val() == '') {
      $("#upd_scrn").removeClass("rejected").removeClass("approved").addClass("inp_std");
      $("label[for=upd_scrn]").removeClass("lab_rejected").removeClass("lab_approved");
      $("label[for=upd_scrn]").html("Login Name");
    } else {
    var uScr = new Object();
    uScr.id = $(".editusrcard").attr("data-id")
    uScr.scr = $("#upd_scrn").val();
    var senBuild = JSON.stringify(uScr);
    var xhr = new XMLHttpRequest();
      
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
        console.log(xhr.responseText.search('Error'));
        if (xhr.responseText.search('Error') > -1) {
          console.log("rejected upd");
          //password did not match make box red
          $("#upd_scrn").removeClass("approved").removeClass("inp_std").addClass("rejected");
          $("label[for=upd_scrn]").removeClass("lab_approved").addClass("lab_rejected");
          $("label[for=upd_scrn]").html("DUPLICATE LOGIN NAME FOUND");
          $("#usrupd").addClass("no-change");
          
        } else {
          console.log("Approved upd");
          //password matched make box green
          $("#upd_scrn").removeClass("rejected").removeClass("inp_std").addClass("approved");
          $("label[for=upd_scrn]").removeClass("lab_rejected").addClass("lab_approved");
          $("label[for=upd_scrn]").html("LOGIN NAME UNIQUE");
          if (nam != $("#upd_name").val() || ema != $("#upd_email").val() || scr != $("#upd_scrn").val()) {
            $("#usrupd").removeClass("no-change");
          } else {
            $("#usrupd").addClass("no-change");
          }

        }
      }

    };
    xhr.open("POST", "/inc/usrscrchk.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(senBuild);

}})
  //pop up functions
  $("#pop").on("click",".pwdresalrt", function(event) {
    event.stopPropagation();
    
  })
  $("#pop").on("click",".passwrd_chg_splash", function(event) {
    event.stopPropagation();
    
  })
  $("#pop").click(function () {
    if (indi == 0) {
    $("#pop").removeClass("obscr");
    $("#passwrd_chg").addClass('hide');
    $(".pwdresalrt").addClass("hide");      
    $(".passwrd_reset_splash").addClass("hide");      
    }
  });  





});
