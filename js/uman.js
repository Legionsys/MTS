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
    console.log(myDetails.name);
    console.log(myDetails.email);
    console.log(myDetails.scr);    
    /*$.get("/inc/usrlst_me.php", function (data, status) {
        $('#usrdet').html(data);

      });*/
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

  //universal items

  //Me items
  $(".me_input").on("keyup", function(){
    console.log(myDetails.name + " => " + $("#my_name").val());
    console.log(myDetails.email + " => " + $("#my_email").val());
    console.log(myDetails.scr + " => " + $("#my_scrn").val());
    if (myDetails.name != $("#my_name").val() || myDetails.email != $("#my_email").val() || myDetails.scr != $("#my_scrn").val()) {
      $(".usrupdme").removeClass("no-change");
    } else {
      $(".usrupdme").addClass("no-change");
    }
  });

  $(".usrupdme").click(function(){
    if(!$(".usrupdme").hasClass("no-change")) {
      //confirm changing and list updates
      console.log("Changing stuff");
      console.log(myDetails.name + " => " + $("#my_name").val());
      console.log(myDetails.email + " => " + $("#my_email").val());
      console.log(myDetails.scr + " => " + $("#my_scrn").val());
      //build JSON
      var myNew = new Object();
      myNew.id = $(".actusrcard").attr("data-id");
      myNew.name = $("#my_name").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      myNew.email = $("#my_email").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      myNew.scr = $("#my_scrn").val().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      var senBuild = JSON.stringify(myNew);
      console.log(senBuild);
      //Send request and process
      var xhr = new XMLHttpRequest();
      
      //fix from here

      /*xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
          console.log(xhr.responseText);
          if (xhr.responseText.search('Error') > 0) {
            //alert('Address Card Removal Error');
          } else {
            //addCard.remove();
          }
        }
  
      };
  
      xhr.open("POST", "/inc/adrem.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(senBuild);*/      


    }
  });
  

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
  //User edit items


  //pop up functions
  $("#pop").on("click",".pwdresalrt", function(event) {
    event.stopPropagation();
    
  })
  $("#pop").click(function () {
    $("#pop").removeClass("obscr");
    $("#pop").html('');
  });  





});
