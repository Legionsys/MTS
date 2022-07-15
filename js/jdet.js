var mcnf;
var mcnl = [];
var climkr;
var jbno;
number_format = function (number, decimals, dec_point, thousands_sep) {
  number = Number(number).toFixed(decimals);

  var nstr = number.toString();
  nstr += '';
  x = nstr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? dec_point + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1))
      x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');

  return x1 + x2;
};
function namt_tot(){
  var tots = parseFloat(0);
 // console.log('starting the cycle');
$('#notebody > .tr > .namt').each(function() {
  if ($.isNumeric($(this).html())) {
    tots = tots + parseFloat($(this).html().replace(/\,/g,""));
    } else {
      if ($.isNumeric($(this).html().replace(/\,/g,""))) {
          tots = tots + parseFloat($(this).html().replace(/\,/g,""));
      }
    }
})

if (tots != parseFloat(0)) {
  $('#ahead').html(number_format(tots,2,'.',','));
} else {
  $('#ahead').html("Amount");
}
};
function conDetUpd(){
  var tQty = 0;
  var tWgt = 0;
  var tM3 = 0;
  var len = 0;
  var wid = 0;
  var hei = 0;
  var qty = 0;
  $('#cnt_body tr').each(function() {
    if ($(this).attr("data-id") != "no"){
    //console.log($(this).attr("data-id") + " - " + tQty);

    $(this).children('td').each(function() {
      //console.log($(this).attr('data-col') > $(this).html());
      if ($(this).attr('data-col') == 'noItem'){
        if ($.isNumeric($(this).html().replace(",",""))) {
          tQty = tQty + Number($(this).html().replace(",",""));
          //console.log(tQty);
        }
      } else if ($(this).attr('data-col') == 'itWgt'){
        if ($.isNumeric($(this).html().replace(",",""))) {
          tWgt = tWgt + Number($(this).html().replace(",",""));
        }
      } else if ($(this).attr('data-col') == 'itLen'){
        if ($.isNumeric($(this).html().replace(",",""))) {
          len = Number($(this).html().replace(",",""));
        }
      } else if ($(this).attr('data-col') == 'itWid'){
        if ($.isNumeric($(this).html().replace(",",""))) {
          wid = Number($(this).html().replace(",",""));
        }
      } else if ($(this).attr('data-col') == 'itHei'){
        if ($.isNumeric($(this).html().replace(",",""))) {
          hei = Number($(this).html().replace(",",""));
        }
      } else if ($(this).attr('data-col') == 'itQty'){
        if ($.isNumeric($(this).html().replace(",",""))) {
          qty = Number($(this).html().replace(",",""));
        }
      }
    })
    tM3 = tM3 + (len * wid * hei * qty / 1000000);
  }
  })
  //console.log(tQty);
  $('#cn_titm').html(number_format(tQty,0,'.',','));
  $('#cn_twgt').html(number_format(tWgt,1,'.',',') + " kg");
  $('#cn_m3').html(number_format(tM3,3,'.',',') + " m3");
};
function cnotUpd(){
  //var jbno = $("#jbnum").text();
  console.log("cnotUpd - " + jbno);
  if (jbno == "" || jbno == 0) {
    //console.log("A job needs to be created for notes to be added");
  } else {
    var cnlist = mcnl.toString();
    $.post("/inc/job-con-lst.php", { jbno: jbno, chkcn: cnlist }, function (data, status) {
    
      $("#contlst").html(data);
    }).fail(function (response) {
      console.log("Error: " + response.responseText);

    });

  }  

};
function cnotCHK(){
  $('input:checkbox.mcnprnt').each(function (){
    
    if (jQuery.inArray(this.value,mcnl) !== -1) {
      this.checked = true;
      console.log("Check CN - " + this.value);
    }
    
})

};
function clrDd(){
  $("#slist").html("");
};
function ddPop(){
  clrDd()
  if ($("#dd").data('marker').includes('_')){
    var stxt = $("#" + $("#dd").data('marker') + "name").val();
  } else {
    var stxt = $("#" + $("#dd").data('marker') + "nam").val();
  }
  //console.log(stxt);
  if (stxt.length < 3) {
    $(".ddbrtxt").html("Please enter more letters");
    $(".load-3").removeClass("hideme");
  } else {
  $(".ddbrtxt").html("Getting Addresses");
  $(".load-3").removeClass("hideme");

  //Get data from Server
  $.post("/inc/addbklst.php", { stxt: stxt }, function (data, status) {
    $("#slist").html(data);
    
  }).fail(function (response) {
    console.log("Error: " + response.responseText);
    console.log("Error: ddpop");
  });
  $(".ddbrtxt").html("Addresses Book Suggestions");
  $(".load-3").addClass("hideme");
  
  }
};
function ddConPop(val){
  clrDd()
  var stxt = val;
  if (stxt.length < 3) {
    $(".ddbrtxt").html("Please enter more letters");
    $(".load-3").removeClass("hideme");
  } else {
    if ($("#dd").data('marker') == 'Jcont'){
      $(".ddbrtxt").html("Getting Contacts");
      $(".load-3").removeClass("hideme");
      //Get data from Server
      $.post("/inc/contbklst.php", { stxt: stxt }, function (data, status) {
        $("#slist").html(data);
        
      }).fail(function (response) {
        console.log("Error: " + response.responseText);
      });
      $(".ddbrtxt").html("Addresses Book Suggestions");
      $(".load-3").addClass("hideme");

    } else if ($("#dd").data('marker') == 'client') {
      $(".ddbrtxt").html("Getting Clients");
      $(".load-3").removeClass("hideme");
      //Get data from Server
      $.post("/inc/clientbklst.php", { stxt: stxt }, function (data, status) {
        $("#slist").html(data);
        
      }).fail(function (response) {
        console.log("Error: " + response.responseText);
      });
      $(".ddbrtxt").html("Addresses Book Suggestions");
      $(".load-3").addClass("hideme");
    } else {
      $(".ddbrtxt").html("Contacting Server");
      $(".load-3").removeClass("hideme");
    }

  

  }
};
function cnDetUpd(updstr,cno) {
  //console.log("Posting - " + updstr + " to - " + cno);
  console.log("ln 171 - " + updstr + " -- " + cno);
  $.post(
      "/inc/job-conn-upd.php",
      { updstr: updstr, cno: cno },
      function (data, status) {
        $("#contlst").html(data);
        if (status == "success") {
        } else {
          alert("Error in updating");
          console.log("ln 180 - " + updstr + " : " + cno);
          console.log("Error: " + response.responseText);
        }
      }
    ).fail(function (response) {
      alert("Error in updating");
      console.log("Error: " + response.responseText);
      console.log("ln 187 - " + updstr + " : " + cno);
      console.log(response);


    });
};
function ddFrtPop(val){
  clrDd()
  var stxt = val;
  if (stxt.length < 3) {
    $(".ddbrtxt").html("Please enter more letters");
    $(".load-3").removeClass("hideme");
  } else {
  $(".ddbrtxt").html("Getting Suggestions");
  $(".load-3").removeClass("hideme");
  
  //Get data from Server
  $.post("/inc/frtbklst.php", { stxt: stxt }, function (data, status) {
    $("#slist").html(data);
    
  }).fail(function (response) {
    console.log("Error: " + response.responseText);
  });
  $(".ddbrtxt").html("Freight Suggestions");
  $(".load-3").addClass("hideme");
  }
};
$(document).ready(function () {
  climkr = 0;
  jbno = $("#jbnum").text();
  namt_tot();
  cnotUpd();

  //console.log("climkr is 0");
  $("#slist").on('mouseenter',".contcard", function () {
    climkr = 1;
    //console.log("climkr is 1");
  });
  $("#slist").on('mouseleave',".contcard", function () {
    climkr = 0;
    //console.log("climkr is 0");
  });
  $("#slist").on('click',".contcard", function () {
    //event.stopPropagation();
    climkr = 0;
    //console.log("climkr is 0");
    console.log("contcard click triggered");
    var updstr = "";
    //var jbno = $("#jbnum").text();
    var cno = $("#cnID").val();
    var mrkr = $("#dd").data('marker');
    console.log(mrkr + " + " + cno + " + " + jbno);

    if (mrkr == 'Jcont') {
      $("#cliContact").val($(this).children(".lstNam").html());
      $("#cliContPh").val($(this).children(".lstPh").html());
      $("#cliContEm").val($(this).children(".lstEm").html());
      updstr = updstr + 'contd="' + $(this).children(".lstNam").html().replace(/\,/g,"''") + '",'
      updstr = updstr + 'contPh="' + $(this).children(".lstPh").html().replace(/\,/g,"''") + '",'
      updstr = updstr + 'contEm="' + $(this).children(".lstEm").html().replace(/\,/g,"''") + '"'
      updstr = updstr.replace('=""','=NULL')
      console.log("ln 910 - " + updstr + " -- " + jbno);
      $.post(
        "/inc/job-dets-upd.php",
        { updstr: updstr, cno: jbno },
        function (data, status) {}
      ).fail(function (response) {
        console.log("Error: " + response.responseText);
      });
    } else if (mrkr == 'client') {
      $("#client").val($(this).children(".lstcli").html());
      $("#cliContact").val($(this).children(".lstcont").html());
      $("#cliContPh").val($(this).children(".lstcph").html());
      $("#cliContEm").val($(this).children(".lstctc").html());
      $("#cliContEm2").val($(this).children(".lstctc2").html());
      console.log("Transpoint Marker");
      var client = $(this).children(".lstcli").html().replace(/\,/g,"''");
      //var jbno = $("#jbnum").text();
      console.log("ln929 - " + client + " - " + jbno);
      //debugger;
      $.post(
        "/inc/job-cli-ch.php",
        { client: client, jobno: jbno },
        function (data, status) {
          console.log("Post execute");
          console.log(data);
          
          $("#jbnum").html(data);
          jbno = data;
          insertJob = ("000000" + data).slice(-5);
          $("#jobnum").html("Job Specific Information - " + insertJob);


          console.log("ln 304 - " + updstr + " -- " + jbno);
          $.post(
            "/inc/job-dets-upd.php",
            { updstr: updstr, cno: jbno },
            function (data, status) {
              console.log("dets update success");
            }
          ).fail(function (response) {
            console.log("Error: " + response.responseText);
          });

        }
      ).fail(function (response) {
        console.log("Error: " + response.responseText);
      }); 
      //var jbno = $("#jbnum").text();
      updstr = updstr + 'contd="' + $(this).children(".lstcont").html().replace(/\,/g,"''") + '",'
      updstr = updstr + 'contPh="' + $(this).children(".lstcph").html().replace(/\,/g,"''") + '",'
      updstr = updstr + 'contEm="' + $(this).children(".lstctc").html().replace(/\,/g,"''") + '",'
      updstr = updstr + 'contEm2="' + $(this).children(".lstctc2").html().replace(/\,/g,"''") + '"'
      updstr = updstr.replace('=""','=NULL')


    } else {
      $("#"+ mrkr +"Ctc").val($(this).children(".lstNam").html());
      $("#"+ mrkr +"Ph").val($(this).children(".lstPh").html());
      updstr = updstr + "#"+ mrkr +"Ctc='" + $(this).children(".lstNam").html().replace(/\,/g,"''") + "',"
      updstr = updstr + "#"+ mrkr +"Ph='" + $(this).children(".lstPh").html().replace(/\,/g,"''") + "'"
      updstr = updstr.replace('=""','=NULL')
      //console.log ("markertest: " + mrkr);
      if (mrkr == 'r' || mrkr == 'c'){
        console.log("job-det-upd - 893 - " + updstr + " -- " + jbno);
        $.post(
          "/inc/job-dets-upd.php",
          { updstr: updstr, cno: jbno },
          function (data, status) {}
        ).fail(function (response) {
          console.log("Error: " + response.responseText);
        });        
      } else {
        cnDetUpd(updstr,cno);
      }
    }
    $("#dd").removeAttr('marker');
    $("#dd").addClass("hideme");
    clrDd();  
    
    
    //  cnDetUpd(updstr,cno);
      $("#dd").removeAttr('marker');
      $("#dd").addClass("hideme");
      clrDd();        
  });  



  $("input[name=clientName]").on({
    change: function(){
      if (climkr != 1) {
      //console.log("input change triggered");
      var client = $("input[name=clientName]").val();
      //var jbno = $("#jbnum").text();
      //console.log("Input change - " + client + " ----- " + jbno);
      //console.log(client + " ----- " + jbno);
      $.post(
        "/inc/job-cli-ch.php",
        { client: client, jobno: jbno },
        function (data, status) {
          $("#jbnum").html(data);
          jbno = data;
          console.log("Input change - " + data);
          insertJob = ("000000" + data).slice(-5);
          $("#jobnum").html("Job Specific Information - " + insertJob);
        }
      ).fail(function (response) {
        console.log("Error: " + response.responseText);
      });      
    } else {
      //console.log("climkr prevented trigger");
    }}, 
    keydown: function(e) {
      //debugger;
      if (e.which === 9) {
        climkr = 0;
        //console.log("climkr is 0");
      }
    }
  });
  $(".j_det_info").change(function () {
    var ent = $(this).val();
    //var jbno = $("#jbnum").text();
    var field = $(this).attr("name");
    //console.log(ent + " ---- " + jbno + " ---- " + field);
    $.post(
      "/inc/job-inf-ch.php",
      { det: field, upd: ent, jobno: jbno },
      function (data, status) {}
    ).fail(function (response) {
      console.log("Error: " + response.responseText);

    });
  });


  //job status toggles
  $(".chkbx").on({
    change: function(){
      if ($(this).is(":checked")){
        var val = new Date().toISOString().split('T')[0];
      }
      if (!$(this).is(":checked")){
        var val = "";
        }
      //var jbno = $("#jbnum").text();
      var col = $(this).attr("data-par")

      $.post(
        "/inc/job_add_upd.php",
        { col: col, val: val, jno: jbno },
        function (data, status) {
          /*console.log(data);
          console.log(status);          */
        }
      ).fail(function (response) {
        console.log("Error: " + response.responseText);
      });      
    }
  });


  //address fields
  $(".jadd").on({
    change: function(){
      var val = $(this).val();
      //var jbno = $("#jbnum").text();
      var col = $(this).attr("name")
      /*console.log (val + " " + jbno + " " + col);*/
      $.post(
        "/inc/job_add_upd.php",
        { col: col, val: val, jno: jbno },
        function (data, status) {
          /*console.log(data);
          console.log(status);*/
        }
      ).fail(function (response) {
        console.log("Error: " + response.responseText);0
      });      
    }
  });


  //adding a note
  $("img[id=newn]").click(function () {
    var nnote = $("#nnt").html();
    var namt = $("#nna").text().replace(",", "").replace("$", "");
    //var jbno = $("#jbnum").text();
    if (jbno == "" || jbno == 0) {
      alert("A job needs to be created for notes to be added - newn.click");
    } else {
      if ($.isNumeric(namt) || namt == "") {
        if (nnote == "" && namt == "") {
          alert("Cannot add a note with no text or amount");
        } else {
          $.post(
            "/inc/job-note-add.php",
            { txt: nnote, amt: namt, jobno: jbno },
            function (data, status) {
              $("#notebody").append(data);
              //console.log("Adding Note Status was: " + status);
              $("#nnt").text("");
              $("#nna").text("");
              //$("#notebody").load(document.URL + " #notebody");
              namt_tot();
            }
          ).fail(function (response) {
            console.log("Error: " + response.responseText);

          });
        }
      } else {
        alert("The amount column needs to be a number or blank");
      }
    }
  });
  //deleting a note
  $("#notebody").on("click", ".ntrash", function () {
    var nid = $(this).parents().attr("data-id");
    
    $.post("/inc/job-note-rem.php", { jnid: nid }, function (data, status) {
      //console.log(data);
      //console.log(status);
      $(".tr[data-id=" + nid + "]").remove();
      namt_tot();
    }).fail(function (response) {
      console.log("Error: " + response.responseText);

    });

  });
  //updating a note
  var nodta = "";
  $("#notebody").on("focusout",".tr .td", function () {
    if (col == "jnAmt") {
      $(this).html(number_format($(this).html().replace(/\,/g, "").replace("$",""),2,".",","));
    };
    var nid = $(this).parents(".tr").attr("data-id");
    var col = $(this).attr("data-col");
    var val = $(this).html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    var updstr = "";
          //Collect vars
    console.log(col + " : " + val + " : " + nid); 
      //send data and update
      $.post(
        "/inc/job-note-upd.php",
        { updstr: val, ref: col, cno: nid },
        function (data, status) {
          //$("#contlst").html(data);
          if (status == "success") {
          } else {
            alert("Error in updating");
            console.log(col + " : " + val + " : " + nid);
            console.log("Error: " + response.responseText);
          }
        }
      ).fail(function (response) {
        alert("Error in updating");
        console.log("Error: " + response.responseText);
        console.log(col + " : " + val + " : " + nid);
        console.log(response);

      });      
      //check for sums
      if (col == "jnAmt") {
        namt_tot();
      }
   
  });
  $("#cnt_body").on("focus", "tr td", function () {
    nodta = $(this).html();
    //console.log(cndta);
  });

  //adding a Connote
  $("img[id=acn]").click(function () {
    //var jbno = $("#jbnum").text();
    if (jbno != "" && jbno != 0) {
      $.post("/inc/job-conn-add.php", { jobno: jbno }, function (data, status) {
        $("#contlst").append(data);
      }).fail(function (response) {
        console.log("Error: " + response.responseText);

      });      
    } else {
      alert("A job needs to be created for notes to be added - acn.click");

    }
  });
  //multi CN compile
  $("img[id=mcn]").click(function () {
    var cnlst = mcnl.toString();
    if (mcnl.length > 0 ) {
    window.open("/cndl.php?CNID=" + cnlst,'_blank');
    } else {
      alert("Please select some con-notes to add to the package");
    }
  });

  //printing a connote
  $("#scnprt").click(function(){
    var cno = $("#cnID").val();
    window.open("/cndl.php?CNID=" + cno,'_blank');
  });
  //copying a con-cnote
  $("#cncopy").click(function () {
    var cno = $("#cnID").val();
   $.post("/inc/job-con-copy.php", { cn: cno }, function (data, status) {
      if(status == "success") {
        alert("New connote created on this job\nConnote number is - " + data);
      } else {
        alert("There was an error copying this connote,\n" + data);
      }
    }).fail(function (response) {
      console.log("Error: " + response.responseText);
      alert("There was an error copying this connote,\n" + response + "\n" + responseText);

    });
  });
  //moving a con-note
  $("#cnmove").click(function () {
    var cno = $("#cnID").val();
    //var jbno = $("#jobnum").text().replace("Job - ","");
    let ej = prompt("Please enter the destination job number?",jbno);
    dj = ej*1;
    if (dj != $("#jbnum").text() && dj != "" && dj != "0") {
      $.post("/inc/job-con-move.php", { cno: cno, dj: dj }, function (data, status) {
        if(status == "success") {
          if (confirm("Move was successful, would you like to go to job " + ej + "?")){
            window.location.href = "/jdet.php?job_no="+dj;
          }
        } else {
          alert("There was an error moving this connote,\n" + data);
        }
      }).fail(function (response) {
        console.log("Error: " + response.responseText);
        alert("There was an error moving this connote,\n" + response + "\n" + responseText);
      });

    } 
  });
  //deleting a con-note
  $("#cndel").click(function () {
    if (confirm("This will delete this connote!\nAre you sure you wish to continue?")){
      var cno = $("#cnID").val();
      $.post("/inc/job-con-move.php", { cno: cno, dj: "0" }, function (data, status) {
        if(status == "success") {
          $("#boscr").addClass("hideme");
          clrcnt();
          cnotUpd();    
 
        } else {
          alert("There was an error deleting this connote,\n" + data);
        }
      }).fail(function (response) {
        console.log("Error: " + response.responseText);
        alert("There was an error deleting this connote,\n" + response + "\n" + responseText);
      });
      
    } 
  });
//multi con-note select

  $("#contlst").on('click',".mcnprnt", function () {
    mcnf = "Y";
    console.log(this.value);
    if (this.checked) {
      mcnl.push(this.value);  
      //console.log(mcnl.toString());
    } else {
      var remItem = this.value;
      mcnl = jQuery.grep(mcnl, function(value) {
        return value != remItem;
      });


    }
    
  });
  //Opening a Connote

  $("#contlst").on('click',".ccnt_card", function () {
    var nid = $(this).attr("data-id");
    if (mcnf == "Y") {
      mcnf = "";
      return;
    }
    //Get data from Server
    $.post("/inc/job-conn-sel.php", { cnid: nid }, function (data, status) {
      var json = $.parseJSON(data);
      //Preliminary Data

      //cycle Data
      $(json).each(function (i, val) {
        $.each(val, function (k, v) {
          if (k == "Pb") {
            $('#' + v).prop('checked', true);
          } else {
            $("#" + k).val(v);
          }
        });
      });

      $("#boscr").removeClass("hideme");
    }).fail(function (response) {
      console.log("Error: " + response.responseText);
    });
    $.post("/inc/job-conn-rows.php", { cnid: nid }, function (data, status) {
      //$("#cn_rows").html(data);
      $("#cnt_body").html(data);
      conDetUpd();
    }).fail(function (response) {
      console.log("Error: " + response.responseText);

    });
  });
  //connote functions
  $("#boscr").click(function () {
    $("#boscr").addClass("hideme");
    clrcnt();
    cnotUpd();
    
  });
  $(".wrapper").click(function () {
    event.stopPropagation();
    if(!$("#cliContact").is(":focus") && !$("#cnam").is(":focus") && !$("#dnam").is(":focus") && !$("#client").is(":focus")){
      
      $("#dd").removeAttr('marker');
      $("#dd").addClass("hideme");
      console.log("hiding #1");
      clrDd();    
    }
    
  });
  $("#cn-frame").click(function () {
    event.stopPropagation();
    var act = $(document.activeElement).attr('class');
    var actpar = $(document.activeElement).parent().attr('id');
    if(!$(".cn_cname input").is(":focus") && "psn|senRef".indexOf(act) == -1 && actpar != "ncn"){
      $("#dd").removeAttr('marker');
      $("#dd").addClass("hideme");
      clrDd();    
    }
    
  });
  $(".cndd").change(function () {
    if ($(this).attr('type') == 'radio') {
      var fld = 'Pb';
    } else {
      var fld = $(this).attr("id");
    }
      var chg = $(this).val();
      var cno = $("#cnID").val();
      if (chg == "") {
        var updstr = fld + "=Null,"
      } else {
        var updstr = fld + "='" + chg.replace(/\'/g,"''") + "',";
      }
      updstr = updstr.substring(0,(updstr.length - 1));

    cnDetUpd(updstr,cno);

  });
  function clrcnt(){
    $('.radios').prop('checked', false);
    $('#cn-frame :input').each(function(e) {
      if ($(this).attr('type') == 'radio') {
        
      } else {
        $(this).val('');
      }
    })
  }
  //add con note line
  $("img[id=ncl]").click(function () {
    var cnum = $("#cnID").val();
    //console.log(cnum);
    $("#ncn td").each(function () {
      //console.log($(this).attr("data-col") + " : " + $(this).html());
      if ($(this).html() == "") {
        var dta = null;
      } else {
        var dta = $(this).html();
      }
      
      switch ($(this).attr("data-col")) {
        case "senRef":
          sref = dta;
          $(this).text('');
          break;
        case "noItem":
          nitm = dta;
          $(this).text('');
          break;
        case "psn":
          psn = dta;
          $(this).text('');
          break;
        case "itWgt":
          itWgt = dta;
          $(this).text('');
          break;
        case "itLen":
          itLen = dta;
          $(this).text('');
          break;
        case "itWid":
          itWid = dta;
          $(this).text('');
          break;
        case "itHei":
          itHei = dta;
          $(this).text('');
          break;
        case "itQty":
          itQty = dta;
          $(this).text('');
          break;
        case "unNum":
          unNum = dta;
          $(this).text('');
          break;
        case "class":
          dcls = dta;
          $(this).text('');
          break;
        case "sRisk":
          sRisk = dta;
          $(this).text('');
          break;
        case "pkGr":
          pkGr = dta;
          $(this).text('');
          break;
        case "pkDes":
          pkDes = dta;
          $(this).text('');
          break;
      }
    });


    //post
    $.post(
      "/inc/job-confrt-add.php",
      { cnum: cnum, sref: sref, nitm: nitm, psn: psn, itWgt: itWgt, itLen: itLen, itWid: itWid, itHei: itHei, itQty: itQty, unNum: unNum, dcls: dcls, sRisk: sRisk, pkGr: pkGr,pkDes: pkDes},
      function (data, status) {
        $("#cnt_body").html(data);
        conDetUpd();
        if (status == "success") {
        } else {
          alert("Error in updating");
        }
      }
    ).fail(function (response) {
      alert("Error in updating");
      console.log("Error: " + response.responseText);
      
    });
    //return row
  });
//delete con note line
  $("#cnt_body").on("click", ".cntrash", function () {
    var nid = $(this).parents("tr").attr("data-id");
    //console.log(nid);
    $.post("/inc/job-confrt-rem.php", { frid: nid }, function (data, status) {
      $("#cnt_body tr[data-id=" + nid + "]").remove();
      conDetUpd();
    }).fail(function (response) {
      console.log("Error: " + response.responseText);
    });

  });
//update con note line
  var cndta = "";
  var cndu = "";
  $("#cnt_body").on("focusout","tr td", function () {

    var nid = $(this).parents("tr").attr("data-id");
    var col = $(this).attr("data-col");
    //console.log(nid + " + " + col);
    if ($(this).html() != cndta) {
      //Collect vars
      var updstr = col + "='" + $(this).html().trim() + "'";
      //send data and update
      $.post(
        "/inc/con-rows-upd.php",
        { updstr: updstr, cno: nid },
        function (data, status) {
          //$("#contlst").html(data);
          if (status == "success") {
          } else {
            alert("Error in updating");
            console.log("ln 712 - " + updstr + " : " + cno);
            console.log("Error: " + response.responseText);
          }
        }
      ).fail(function (response) {
        alert("Error in updating");
        console.log("Error: " + response.responseText);
        console.log("ln 719 - " + updstr + " : " + nid);
        console.log(response);
      });      
      //check for sums
      if ("noItemitWgtitLenitWiditHeiitQty".indexOf(col) != -1) {
        conDetUpd();
      }
    }
     
  });
  $("#cnt_body").on("focusin", "tr td", function () {
    cndta = $(this).html();
    event.stopPropagation();

  });
  //dropdown add frt line
  $("#cn_add tr td").on({
    focusin: function(){
      this.parentNode.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"NCN");
      ddFrtPop($(this).html());
      event.stopPropagation();
    },
    keyup: function(){
      ddFrtPop($(this).html());
      //console.log($(this).html());
    }
  });
  $("#slist").on('click',".frtLne", function () {
    event.stopPropagation();
    var fld="";
    var chg="";
    $(this).children().each(function() {
        fld = $(this).data('marker');
        //console.log("fld= " + fld);
        chg = $(this).html();
        //console.log("chg= " + chg);
        $("#add" + fld).html(chg);
      });
      $("#dd").removeAttr('marker');
      $("#dd").addClass("hideme");
      clrDd();        
  });

  //dropdown address book
 
  $("#snam").on({
    focusin: function(){
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"s");
      ddPop();
      event.stopPropagation();
    },
    keyup: function(){
      ddPop();
    }
  });
  $("#rnam").on({
    focusin: function(){
      event.stopPropagation();
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"r");
      ddPop();
    },
    keyup: function(){
      ddPop();
    }
  });
  $("#onam").on({
    focusin: function(){
      event.stopPropagation();
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"o");
      ddPop();
    },
    keyup: function(){
      ddPop();
    }
  });
  $(".cndd").on("focus", function(){
    $("#dd").removeAttr('marker');
    $("#dd").addClass("hideme");
    clrDd();        
    //console.log($(this).attr('id'));
  });

  $("#slist").on('click',".addcard", function () {
    event.stopPropagation();
    var updstr = "";
    var cno = $("#cnID").val();
    var fld="";
    var chg="";
    //var jbno = $("#jbnum").text();
    var mrkr = $("#dd").data('marker');

    $(this).children().each(function() {
        fld = $("#dd").data('marker') + $(this).attr("class");
        chg = $(this).html();
        $("#" + fld).val(chg);
        if (chg == "") {
          updstr = updstr + fld + "=Null,"
        } else {
          updstr = updstr + fld + "='" + chg.replace(/\,/g,"''").replace("'","''") + "',";
        }        

      });
      updstr = updstr.substring(0,(updstr.length - 1));
      //console.log ("markertest: " + mrkr);
      if (mrkr == 'd' || mrkr == 'c'){
        console.log("ln 831 - " + updstr + " -- " + jbno + " -- " + mrkr);
        $.post(
          "/inc/job-dets-upd.php",
          { updstr: updstr, cno: jbno },
          function (data, status) {}
        ).fail(function (response) {
          console.log("Error: " + response.responseText);
        });        
      } else {

        cnDetUpd(updstr,cno);
      }
      $("#dd").removeAttr('marker');
      $("#dd").addClass("hideme");
      clrDd();        
  });

  //dropdown contacts
  $("#cliContact").on({
    focusin: function(){
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"Jcont");
      ddConPop($(this).val());
      event.stopPropagation();
    },
    keyup: function(){
      ddConPop($(this).val());
    }
  });  

  $("#client").on({
    focusin: function(){
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"client");
      console.log("dd pop value - " + $(this).val());
      ddConPop($(this).val());
      event.stopPropagation();
    },
    keyup: function(){
      ddConPop($(this).val());
    }
  });
  //adding a supplier
  $("#addsup").click(function () {
    var jty = $("#asup .supTy").html();
    var jna = $("#asup .supSu").html();
    var jde = $("#asup .supDe").html();
    var jir = $("#asup .supIr").html();
    var jno = $("#asup .supNo").html();
    var jec = $("#asup .supEc").html();
    //var jbno = $("#jbnum").text();
    if (jbno == "" || jbno == 0) {
      alert("A job needs to be created for notes to be added - addsup.click");
    } else {
      if (jty == "" && jna == "" && jde == "" && jir == "" && jno == "" && jec == "") {
        alert("Cannot add an all blank entry");
      } else {
        $.post(
          "/inc/job-sup-add.php",
          { typ: jty, nam: jna, des: jde, ire: jir, not: jno, jobno: jbno, est: jec },
          function (data, status) {
            $("#supbody").prepend(data);
            $("#asup .supTy").text("");
            $("#asup .supSu").text("");
            $("#asup .supDe").text("");
            $("#asup .supIr").text("");
            $("#asup .supNo").text("");
            $("#asup .supEc").text("");
          }
        ).fail(function (response) {
          console.log("Error: " + response.responseText);
        });
      }
    }
  });
  //deleting a supplier
  $("#supbody").on("click", ".suprm", function () {
    var nid = $(this).attr("data-id");

    $.post("/inc/job-sup-rem.php", { id: nid }, function (data, status) {
      //console.log(data);
      //console.log(status);
      $(".supln[data-id=" + nid + "]").remove();
      namt_tot();
    }).fail(function (response) {
      console.log("Error: " + response.responseText);
    });

  });
  //updating a supplier
  var nodta = "";
  $("#supbody").on("focusout",".supln .lsup", function () {

    var nid = $(this).parents(".supln").attr("data-id");
    var col = $(this).attr("data-col");
    var val = $(this).html();
    $.post(
      "/inc/job-sup-upd.php",
      { updstr: val, ref: col, cno: nid },
      function (data, status) {
        //$("#contlst").html(data);
        if (status == "success") {
        } else {
          alert("Error in updating");
          console.log("ln 978 - " + updstr + " : " + cno);
          console.log("Error: " + response.responseText);
        }
      }
    ).fail(function (response) {
      alert("Error in updating");
      console.log("Error: " + response.responseText);
      console.log("ln 985 - " + updstr + " : " + nid);
      console.log(response);
    });      

     
  });
  $("#supbody").on("focus", ".supln .lsup", function () {
    nodta = $(this).html();
    //console.log(cndta);
  });



  $(".jadd").on("focus", function(){
    if ($(this).attr('id') == "cnam" || $(this).attr('id') == "dnam" ) {

    } else {
    $("#dd").removeAttr('marker');
    $("#dd").addClass("hideme");
    clrDd();        
    //console.log($(this).attr('id'));
    }
  });

  $(".j_det_info").on("focus", function(){
    if ($(this).attr('id') == "client" || $(this).attr('id') == "cliContact" ) {

    } else {
    $("#dd").removeAttr('marker');
    $("#dd").addClass("hideme");
    clrDd();        
    //console.log($(this).attr('id'));
    }
  });

  $("#cnam").on({
    focusin: function(){
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"c");
      ddPop();
      //event.stopPropagation();
    },
    keyup: function(){
      ddPop();
    }
  });
  $("#dnam").on({
    focusin: function(){
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"d");
      ddPop();
      //event.stopPropagation();
    },
    keyup: function(){
      ddPop();
    }
  });  


  //dropdown con note description
  /*$("#ncn #psn").on({
    focusin: function(){
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"ncn");
      ddFrtPop($(this).val());
      event.stopPropagation();
    },
    keyup: function(){
      ddFrtPop($(this).val());
    }
  });
  $("#slist").on('click',".frtLne", function () {
    event.stopPropagation();
    var updstr = "";
    var cno = $("#cnID").val();
    var mkr = $("#dd").data('marker');
    var fld="";
    var chg="";
    $(this).children().each(function() {
      fld = $(this).attr("class").replace("frtl bk","");
      chg = $(this).html();
      $("#" + mkr + ' .' + fld).val(chg);
      if (mkr != "ncn") {
        if (chg == "") {
          updstr = updstr + fld + "=Null,"
        } else {
          updstr = updstr + fld + "='" + chg.replace(/\,/g,"''") + "',";
        }
      }        
    });
    if (mkr != "ncn") {
      updstr = updstr.substring(0,(updstr.length - 1));
      cnDetUpd(updstr,cno);
    }
    $("#dd").removeAttr('marker');
    $("#dd").addClass("hideme");
    clrDd();        
  });*/
  
});
