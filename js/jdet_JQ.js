var mcnf;
var mcnl = [];
var climkr;
var timeout = null;
var jdets = [];
var sups = [];
var notes = [];
var cnot = [];
var frt = [];
var ojdets = [];
var osups = [];
var onotes = [];
var ocnot = [];
var ofrt = [];
var jbn;
var upd;
var actcn;
var pauseReq = false;



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
function getSearchParams(k){
  var p={};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
  return k?p[k]:p;
 };
 function firstpop(){
  if (jbn != null && jbn !="0") {
      var jobn = "00000" + jbn;
      $("#jbnum").html(jbn);
      $("#jobnum").html("Job - " + jobn.substring(jobn.length - 5));
  } else {
      $("#jbnum").html("New Job");
  };
  upd = "y";
  fr = 'Y';
  jbdu();
  jbsu();
  jbnot();  
  jbcon();  
  confrt('');
  fr = '';

};
function jsupd(){
  $(jdets).each(function (i, val) {
      $.each(val, function (k, v) {
      if (k == "ac_cb" || k == "inv_c" ) {
          if (v !== null){
              $('#' + k).prop('checked', true);
          }
      } else {
          $("#" + k).val(v).attr('value',chknull(v));
      }
      });
  });
};
function chknull(value) {
  //return value;
  if ($.isNumeric(value)) {
    return value;
  }
  if (value != null){
    return value;
  } 
  if ($.isEmptyObject(value)) {
    return '';
  } else {
    return value;
  }
  
}
function jsupupd() {
  $(sups).each(function (i, val) {
      var txt = "";
      txt = '<div class="supln" data-id="' + chknull(val.jsID) + '"><div contenteditable="true" data-col="jsName" class="supSu lsup">' + chknull(val.jsName) + '</div><div contenteditable="true" data-col="jsType" class="supTy lsup">' + chknull(val.jsType) + '</div><div contenteditable="true" data-col="jsDesc" class="supDe lsup">' + chknull(val.jsDesc) + '</div><div contenteditable="true" data-col="jsEst" class="supEc lsup">$' + number_format(chknull(val.jsEst),2,'.',',') + '</div><div contenteditable="true" data-col="jsInvRec" class="supIr lsup">' + chknull(val.jsInvRec) + '</div><div contenteditable="true" data-col="jsNotes" class="supNo lsup">' + chknull(val.jsNotes) + '</div><div class="suprm td" data-id="' + chknull(val.jsID) + '">Remove Supplier</div></div>';
      $("#supbody").append(txt);
  });
};
function jnotupd() {
  $("#notebody").html('');
  $(notes).each(function (i, val) {
      var txt = "";
      txt = '<div class="tr" data-id="' + chknull(val.jnID) + '"><div contenteditable="true" data-col="jnNote" class="ncol td">' + chknull(val.jnNote) + '</div><div contenteditable="true" data-col="jnAmt" class="namt td">' + number_format(chknull(val.jnAmt),2,'.',',') + '</div><div class="ntra td"><div class="cmd_img" data-id="' + chknull(val.jnID) + '"><img class="ntrash" class="nbut" alt="Delete Note" src="/img/trash.svg"></div></div></div>';
      $("#notebody").append(txt);
      
  });
  namt_tot();
};
function jconupd() {
  $(cnot).each(function (i, val) {
      var txt = "";
      txt = '<div data-id="' + chknull(val.cnID) + '" class="ccnt_card"><div class="cnnum">' + chknull(val.cnNum) + '</div><input type="checkbox" class="mcnprnt" name="mprint" value="' + chknull(val.cnID) + '"><div class="cnscomp">' + chknull(val.snam) + '</div><div class="cnrcomp">' + chknull(val.rnam) + '</div><div class="cnitm">' + chknull(val.titm) + ' itms</div><div class="cnwgt">' + chknull(val.twgt) + ' kg</div><div class="cnm3">' + Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(chknull(val.tcub)) + ' m3</div></div>';
      $("#contlst").append(txt);
  });
};



function jbdu(){
  var frdu = fr;
  var ind = "job";
  $.post("/inc/job-init.php", { jbn: jbn , indi: ind }, function (data, status) {
    jdets = $.parseJSON(data);
    if (frdu == 'Y') {
      ojdets = JSON.parse(JSON.stringify(jdets));
    }
    if (data.substring(0,1) == '<') {
      $('#coll').append(data);
    } else {
      if (upd === "y") {
        jsupd();
    }}
  }).fail(function (response) {
    console.log("Failure Job Details - " + jbn);
    console.log("Error: " + response.responseText);
    console.log(response);
  });
};
function jbsu(){
  var frsu = fr;
  var ind = "sup";
  $.post("/inc/job-init.php", 
  { jbn: jbn , indi: ind }, 
  function (data, status) {
    if (data.substring(0,1) == '<') {
      $('#coll').append(data);
    } else {
      sups = $.parseJSON(data);
      if (frsu == 'Y'){
      osups = JSON.parse(JSON.stringify(sups));
      }
      if (upd === "y") {
        jsupupd();
      }
    }
  }).fail(function (response) {
      console.log("Failure Supplier - " + jbn);
      console.log("Error: " + response.responseText);
      console.log(response);
  });    
};
function jbnot(){
  var ind = "not";
  var frnot = fr;
  $.post("/inc/job-init.php", 
  { jbn: jbn , indi: ind }, 
  function (data, status) {
    if (data.substring(0,1) == '<') {
      $('#coll').append(data);
    } else {
      notes = $.parseJSON(data);
      if (frnot = 'Y') {
        onotes = JSON.parse(JSON.stringify(notes));
      }
      if (upd === "y") {
          jnotupd();
    }}
  }).fail(function (response) {
      console.log("Failure Notes - " + jbn);
      console.log("Error: " + response.responseText);
      console.log(response);
  });   
};
function jbcon(){
  var ind = "con";
  var frcon = fr;
  $.post("/inc/job-init.php", 
  { jbn: jbn , indi: ind }, 
  function (data, status) {
    if (data.substring(0,1) == '<') {
      $('#coll').append(data);
    } else {
      cnot = $.parseJSON(data);
      if (frcon == 'Y') {
        ocnot = JSON.parse(JSON.stringify(cnot));
      }
      if (upd === "y") {
          jconupd();
      }}
  }).fail(function (response) {
      console.log("Failure Con-note - " + jbn);
      console.log("Error: " + response.responseText);
      console.log(response);
  });   
};
function confrt(cnn){
  var frfr = fr;
  var ind = "frt";
  $.post("/inc/job-init.php", 
  { jbn: jbn , indi: ind }, 
  function (data, status) {
    if (data.substring(0,1) == '<') {
      $('#coll').append(data);
    } else {
      frt = $.parseJSON(data);
      if (frfr == 'Y') {
        ofrt = JSON.parse(JSON.stringify(frt));
      }
      if (cnn != '') {
        frtload(cnn);
      }
    }
  }).fail(function (response) {
      console.log("Failure Freight - " + jbn);
      console.log("Error: " + response.responseText);
      console.log(response);
  }); 
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
    $(this).children('td').each(function() {
      if ($(this).attr('data-col') == 'noItem'){
        if ($.isNumeric($(this).html().replace(",",""))) {
          tQty = tQty + Number($(this).html().replace(",",""));
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
  $('#cn_titm').html(number_format(tQty,0,'.',','));
  $('#cn_twgt').html(number_format(tWgt,1,'.',',') + " kg");
  $('#cn_m3').html(number_format(tM3,3,'.',',') + " m3");
};
function cnotUpd(){
  if (jbn == "" || jbn == 0) {

  } else {
    var cnlist = mcnl.toString();
    $("#contlst").html('');
    jconupd();
  }
};
function cnotCHK(){
  $('input:checkbox.mcnprnt').each(function (){    
    if (jQuery.inArray(this.value,mcnl) !== -1) {
      this.checked = true;
    }    
})
};
function fldupd(init,obj){
  var live = [];
  var olive = [];
  var indi = '';
  var nid = -1;
  var oind = -1;
  var ind = -1;
  var col = '';
  if (init == "sups") {
    live = sups;
    olive = osups;
    indi = "jsID"
    nid = obj.parents(".supln").attr("data-id");
    col = obj.attr("data-col");
  }
  $(olive).each(function (i, val) {
    if (val[indi] == nid) {
      oind = i;
      return false;
    }
  });
  $(live).each(function (i, val) {
    if (val[indi] == nid) {
      ind = i;
      return false;
    }
  });
  if (oind == -1 || olive[oind][col] != obj.html()) {
    if (live[ind][col] != obj.html()) {
      obj.removeClass("updated"); 
      obj.addClass("pending"); 
    } else {
      obj.addClass("updated"); 
      obj.removeClass("pending"); 
    }
  } else {
    obj.removeClass("updated"); 
    obj.removeClass("pending"); 
  }
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
  if (stxt.length < 2) {
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
function cnDetUpd(updstr,cno,upd) {
  $.post("/inc/job-conn-upd.php",{ updstr: updstr, cno: cno },function (data, status) {
    if (status == "success") {
      var oin = -1;
      $(ocnot).each(function (i,val){
        if (val.cnID == cno) {
          oin = i;
          return false;
      }});

      for (let [key, value] of upd) {
        $("#" + key + ".pending").removeClass("pending");
        if (oin == -1 || chknull(ocnot[oin][key]) != value) {
          $("#" + key).attr("value",value).addClass("updated");
        } else {
          $("#" + key + ".pending").removeClass("updated");
        }
        updchkr();
        cnot[actcn][key] = value;
      }
    } else {
      alert("Error in updating");
      console.log("Variables - " + updstr + " : " + cno);
      console.log("Error: " + response.responseText);
    }
  }).fail(function (response) {
    alert("Error in updating");
    console.log("Error: " + response.responseText);
    console.log("Variables - " + updstr + " : " + cno);
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
function updchkr(){
  var pend = document.getElementsByClassName('pending');
  //var updd = document.getElementsByClassName('updated');
 
  if (pend.length > 0){
    $("#updcheck").removeClass("chkgood");
    $("#updcheck").addClass("chkpend");
    $("#updcheck").html("Click me to update");
  } else {
    $("#updcheck").removeClass("chkpend");
    $("#updcheck").addClass("chkgood");
    $("#updcheck").html("All fields up to date");
  }
}
function frtload(cno){
  var all = false;
  var oind = -1;
  $("#cnt_body").html('');
  $(frt).each(function(i, val) {
    if (val.cnID == cno) {
      oind = -1;
      $(ofrt).each(function(i,oval) {
        if (oval.itID == val.itID) {
          oind = i;
          return false;
        }
      })
      var txt = "";
      txt = '<tr data-id="' + val.itID + '"><td contenteditable="true" id="senRef" data-col="senRef" class="senRef">' + val.senRef + '</td><td contenteditable="true" id="noItem" data-col="noItem" class="noItem">' + val.noItem + '</td><td contenteditable="true" id="psn" data-col="psn" class="psn">' + val.psn + '</td><td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt">' + val.itWgt + '</td><td contenteditable="true" id="itLen" data-col="itLen" class="itLen">' + val.itLen + '</td>';
      txt = txt + '<td contenteditable="true" id="itWid" data-col="itWid" class="itWid">' + val.itWid + '</td><td contenteditable="true" id="itHei" data-col="itHei" class="itHei">' + val.itHei + '</td><td contenteditable="true" id="itQty" data-col="itQty" class="itQty">' + val.itQty + '</td><td contenteditable="true" id="unNum" data-col="unNum" class="unNum">' + val.unNum + '</td><td contenteditable="true" id="class" data-col="class" class="class">' + val.class + '</td><td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk">' + val.sRisk + '</td>';
      txt = txt + '<td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr">' + val.pkGr + '</td><td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes">' + val.pkDes + '</td><td class="cn_ctrls" data-col="cmd"><div class="cmd_img"><img class="cntrash" class="cnbut" alt="Delete Freight Note Line" src="/img/trash.svg"></div></td></tr><div class="ntra td"><div class="cmd_img" data-id="' + val.jnID + '"><img class="ntrash" class="nbut" alt="Delete Note" src="/img/trash.svg"></div></div></div>';
      $("#cnt_body").append(txt);                
      $("#cnt_body tr").each(function(){
        if ($(this).attr("data-id") == val.itID){
          $(this).find('td[id]').each (function() {
              if (oind == -1) {
                $(this).addClass("updated");
              } else {
                if ($(this).html() != ofrt[oind][$(this).attr("data-col")]) {
                  $(this).addClass("updated");
                }
              }

          });                          
        }
      })

    }

  });

  if (pauseReq == true) {
    pauseReq = false;
  }
}
function ccntLoad(cno){
  var oin = -1;
  $("#cnt_body").html('');
  $(ocnot).each(function (i,val){
    if (val.cnID == cno) {
      oin = i;
      return false;
  }});
  
  $(cnot).each(function (i, val) {
    if (val.cnID == cno) {
      actcn = i;
      $.each(val, function (k, v) {
        if (k == "Pb") {
          $('#' + v).prop('checked', true);
        } else {
          $("#" + k).val(v).attr('value',chknull(v));
          if (oin == -1) {
            $("#" + k).addClass("updated");
            $("#" + k).removeClass("pending");
          } else {
            if (ocnot[oin][k] != v) {
              $("#" + k).addClass("updated");
              $("#" + k).removeClass("pending");
            } else {
              $("#" + k).removeClass("pending");
              $("#" + k).removeClass("updated");
            }
          }
        }
      });
  }});
  frtload(cno);
  $("#boscr").removeClass("hideme");
}



$(document).ready(function () {
  //console.log(window.location.href);
  $(window).on('popstate', function(event) {
    alert("pop");
  });
  actcn = null;
  climkr = 0;
  jbn = getSearchParams("job_no");
  firstpop();
  namt_tot();
  cnotUpd();
  updchkr();

  $("#slist").on('mouseenter',".contcard", function () {
    climkr = 1;
  });
  $("#slist").on('mouseleave',".contcard", function () {
    climkr = 0;
  });
  $("#slist").on('click',".contcard", function () {
    climkr = 0;
    var updstr = "";
    var cno = $("#cnID").val();
    var mrkr = $("#dd").data('marker');
    var card = new Map();
    if (mrkr == 'Jcont') {
      $("#cliContact").val($(this).children(".lstNam").html());
      $("#cliContPh").val($(this).children(".lstPh").html());
      $("#cliContEm").val($(this).children(".lstEm").html());
      updstr = updstr + 'contd="' + $(this).children(".lstNam").html().replace(/\'/g,"''") + '",'
      updstr = updstr + 'contPh="' + $(this).children(".lstPh").html().replace(/\'/g,"''") + '",'
      updstr = updstr + 'contEm="' + $(this).children(".lstEm").html().replace(/\'/g,"''") + '"'
      updstr = updstr.replace('=""','=NULL')
      $.post("/inc/job-dets-upd.php",{ updstr: updstr, cno: jbn },function (data, status) {}
      ).fail(function (response) {
        console.log("Error: " + response.responseText);
      });
    } else if (mrkr == 'client') {
      $("#client").val($(this).children(".lstcli").html()).addClass("pending");
      $("#cliContact").val($(this).children(".lstcont").html()).addClass("pending");
      $("#cliContPh").val($(this).children(".lstcph").html()).addClass("pending");
      $("#cliContEm").val($(this).children(".lstctc").html()).addClass("pending");
      $("#cliContEm2").val($(this).children(".lstctc2").html()).addClass("pending");
      updchkr();
      
      card.set("client",$(this).children(".lstcli").html());
      card.set("cliContact",$(this).children(".lstcont").html());
      card.set("cliContPh",$(this).children(".lstcph").html());
      card.set("cliContEm",$(this).children(".lstctc").html());
      card.set("cliContEm2",$(this).children(".lstctc2").html());
      var client = $(this).children(".lstcli").html().replace(/\'/g,"''");
      $.post("/inc/job-cli-ch.php",{ client: client, jobno: jbn },function (data, status) {
          $("#jbnum").html(data);
          jbn = data;
          insertJob = ("000000" + data).slice(-5);
          $("#jobnum").html("Job Specific Information - " + insertJob);
          $.post("/inc/job-dets-upd.php",{ updstr: updstr, cno: jbn },function (data, status) {
              if (status == "success") {
                for (let [key, value] of card) {
                  $("#" + key + ".pending").removeClass("pending");
                  $("#" + key).attr("value",value).addClass("updated");
                }  
                updchkr();
              }
            }
          ).fail(function (response) {
            console.log("Error: " + response.responseText);
          });
        }
      ).fail(function (response) {
        console.log("Error: " + response.responseText);
      }); 
      updstr = updstr + 'contd="' + $(this).children(".lstcont").html().replace(/\'/g,"''") + '",'
      updstr = updstr + 'contPh="' + $(this).children(".lstcph").html().replace(/\'/g,"''") + '",'
      updstr = updstr + 'contEm="' + $(this).children(".lstctc").html().replace(/\'/g,"''") + '",'
      updstr = updstr + 'contEm2="' + $(this).children(".lstctc2").html().replace(/\'/g,"''") + '"'
      updstr = updstr.replace('=""','=NULL')
    } else {
      $("#"+ mrkr +"Ctc").val($(this).children(".lstNam").html());
      $("#"+ mrkr +"Ph").val($(this).children(".lstPh").html());
      updstr = updstr + "#"+ mrkr +"Ctc='" + $(this).children(".lstNam").html().replace(/\'/g,"''") + "',"
      updstr = updstr + "#"+ mrkr +"Ph='" + $(this).children(".lstPh").html().replace(/\'/g,"''") + "'"
      updstr = updstr.replace('=""','=NULL')
      card.set(mrkr +"Ctc",$(this).children(".lstNam").html());
      card.set(mrkr +"Ph",$(this).children(".lstPh").html());
      if (mrkr == 'r' || mrkr == 'c'){
        $.post("/inc/job-dets-upd.php",{ updstr: updstr, cno: jbn },function (data, status) {}
        ).fail(function (response) {
          console.log("Error: " + response.responseText);
        });        
      } else {
        cnDetUpd(updstr,cno,card);
      }
    }
    $("#dd").removeAttr('marker');
    $("#dd").addClass("hideme");
    clrDd();
    });
  $("input[name=clientName]").on({
    change: function(){
      if (climkr != 1) {
      var client = $("input[name=clientName]").val();
      $.post("/inc/job-cli-ch.php",{ client: client, jobno: jbn },function (data, status) {
          $("#jbnum").html(data);
          jbn = data;
          insertJob = ("000000" + data).slice(-5);
          $("#jobnum").html("Job Specific Information - " + insertJob);
        }
      ).fail(function (response) {
        console.log("Error: " + response.responseText);
      });   
    }}, 
    keydown: function(e) {
      if (e.which === 9) {
        climkr = 0;
      }
    }
  });
  $(".j_det_info").change(function () {
    var ent = $(this).val();
    var fldId = $(this).attr("id");
    var field = $(this).attr("name");

    $.post("/inc/job-inf-ch.php",{ det: field, upd: ent, jobno: jbn },function (data,status) {
      if (status == 'success'){
        $("#" + fldId).attr("value",ent);
        $("#" + fldId + ".pending").removeClass("pending");
        $("#" + fldId).addClass("updated");
        updchkr();
      };
    }).fail(function (response) {
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
      var col = $(this).attr("data-par");

      $.post("/inc/job_add_upd.php",
        { col: col, val: val, jno: jbn },
        function (data, status) {
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
      var did = $(this).attr("id");
      var col = $(this).attr("name");
      var cur = '';
      var og = '';
      $.post("/inc/job_add_upd.php",{ col: col, val: val, jno: jbn },function (data, status) {
          $('#' + did).attr("value",val);
          $('#' + did + ".pending").removeClass("pending");
          $(jdets).each(function (i, val) {
            $.each(val, function (k, v) {
              if (k == did) {
                cur = v;
              }
            });
          });
          $(ojdets).each(function (i, val) {
            $.each(val, function (k, v) {
              if (k == did) {
                og = v;
              }
            });
          });
          if (val == og) {
            $('#' + did).removeClass("updated");
          } else {
            $('#' + did).addClass("updated");
          }
          updchkr();
        }
      ).fail(function (response) {
        console.log("Error: " + response.responseText);0
      });      
    }
  ,focus: function(){
    if ($(this).attr('id') == "cnam" || $(this).attr('id') == "dnam" ) {

    } else {
      $("#dd").removeAttr('marker');
      $("#dd").addClass("hideme");
      clrDd();        
  }}
  ,keyup : function(){
      if ($(this).val() == $(this).attr("value")) {
        $('#' + $(this).attr("id") + ".pending").removeClass("pending");
      } else {
        $('#' + $(this).attr("id") + ".updated").removeClass("updated");
        $(this).addClass("pending");
      }
      updchkr();
    }
  
  }
  );


  //adding a note
  $("img[id=newn]").click(function () {
    var nnote = $("#nnt").html();
    var namt = $("#nna").text().replace(",", "").replace("$", "");
    if (jbn == "" || jbn == 0) {
      alert("A job needs to be created for notes to be added - newn.click");
    } else {
      if ($.isNumeric(namt) || namt == "") {
        if (nnote == "" && namt == "") {
          alert("Cannot add a note with no text or amount");
        } else {
          $.post("/inc/job-note-add.php",{ txt: nnote, amt: namt, jobno: jbn },function (data, status) {
              $("#notebody").append(data);
              $("#nnt").text("");
              $("#nna").text("");
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
      if (status == "success") {
        $(notes).each(function (i, val) {
          if (val.jnID == nid) {
            notes.splice(i,1);
          }
        })
        console.log(notes);
        $(".tr[data-id=" + nid + "]").remove();
      } else {
      alert("Error in removing supplier");
      console.log("Variables - " + nid);
      console.log("Error: " + response.responseText);
    }
    namt_tot();
    }).fail(function (response) {
      console.log("Error: " + response.responseText);
    });
  });
  //updating a note
  var nodta = "";
  $("#notebody").on("focusout",".tr .td", function () {

    var nid = $(this).parents(".tr").attr("data-id");
    var col = $(this).attr("data-col");
    var chkkr = 1;
    var mrkr = $(this);
    var ind = -1;
    console.log("Note data -- " + col);
    if (col == "jnAmt") {
      $(this).html(number_format($(this).html().replace(/\,/g, "").replace("$",""),2,".",","));
      var nval = $(this).html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\,/g, "").replace("$","");
      console.log(nval);
    } else {
      var nval1 = $(this).html().replace(/<div>/g,"&zzz;").replace(/<br>/g,"&zzz;");
      var nval = nval1.replace(/(<([^>]+)>)/ig,"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&zzz;/g,"<br>");
    };
          //Collect vars
    $(notes).each(function (i, val) {
      if (nid == val.jnID) {
        ind = i;
        if (val[col] == nval){
          chkkr = 0;
        }
        return false;
      }})

    if (chkkr == 1) {
      //send data and update
      console.log(col + " : " + nval + " : " + nid);
      $.post("/inc/job-note-upd.php",
        { updstr: nval, ref: col, cno: nid },
        function (data, status) {
          //$("#contlst").html(data);
          if (status == "success") {
            notes[ind][col] = nval;
            mrkr.addClass("updated");
            mrkr.removeClass("pending");
            $(onotes).each(function (i, val) {
              if (val["jnID"] == nid) {
                if (val[col] == nval) {
                  mrkr.removeClass("updated");
                }              
              }
            });
            updchkr();
            if (col == "jnNote") {
              mrkr.html(nval);
            }
          } else {
            alert("Error in updating");
            console.log(col + " : " + nval + " : " + nid);
            console.log("Error: " + response.responseText);
          }
        }
      ).fail(function (response) {
        alert("Error in updating");
        console.log("Error: " + response.responseText);
        console.log(col + " : " + nval + " : " + nid);
        console.log(response);

      });      
      //check for sums
      if (col == "jnAmt") {
        namt_tot();
      }
    }
  });
  $("#notebody").on("keyup",".tr .td", function () {
    var nid = $(this).parents(".tr").attr("data-id");
    var col = $(this).attr("data-col");
    if (col == "jnAmt") {
      var cval = number_format($(this).html().replace(/\,/g, "").replace("$",""),2,".",",");
    } else {
      var cval = $(this).html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }
    var mrkr = $(this);
    var ind = -1;
    var oind = -1;
    //find data in array
    $(notes).each(function (i, val) {
      if (nid == val.jnID) {
        ind = i;
        return false;
    }})
    $(onotes).each(function (i, val) {
      if (nid == val.jnID) {
        oind = i;
        return false;
    }})
    if (notes[ind][col] == cval) {
      mrkr.removeClass("pending")
      mrkr.addClass("updated")
      if (onotes[oind][col] == cval) {
        mrkr.removeClass("updated")
      } 
    } else {
      mrkr.addClass("pending")
      mrkr.removeClass("updated")
    }
    updchkr();
  });
  
  $("#cnt_body").on("focus", "tr td", function () {
    nodta = $(this).html();
  });

  //adding a Connote
  $("img[id=acn]").click(function () {
    if (jbn != "" && jbn != 0) {
      $.post("/inc/job-conn-add.php", { jobno: jbn }, function (data, status) {
        var txt = '';
        if (data.substring(0,1) == '<') {
          $('#coll').append(data);
          //txt = data;
        } else {
          var obj = $.parseJSON(data);
          cnot.push(obj[0]);
          ocnot.push(obj[0]);
          ccntLoad(obj[0].cnID);
        }
        //$("#contlst").append(txt);
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
        var njn = parseInt(data);
        var conum = '00000' + njn;
        var ncnum = 'E' + conum.substring(conum.length - 5);
        alert("New connote created on this job\nConnote number is - " + ncnum + "\nLoading new connote now! please wait for confirmation con note is ready");
        cnot.push(JSON.parse(JSON.stringify(cnot[actcn])));
        //set new actcn
        actcn = cnot.length -1;
        cnot[actcn]["cnID"] = njn;
        cnot[actcn]["cnNum"] = ncnum;
        //update the connote id and number
        $("#cnID").val(njn).attr('value',chknull(njn));
        $("#cnNum").val(ncnum).attr('value',chknull(ncnum));
        //update the frt array to include new rows
        pauseReq = true;
        confrt(njn);

        function waiting() {
          console.log(pauseReq);
          if (pauseReq == true) {
            setTimeout(function(){waiting()},100);
          } else {
            alert("Connote " + ncnum + " is ready for use");
          }
        }
        waiting();
        
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
    let ej = prompt("Please enter the destination job number?",jbn);
    dj = ej*1;
    if (dj != $("#jbnum").text() && dj != "" && dj != "0") {
      $.post("/inc/job-con-move.php", { cno: cno, dj: dj }, function (data, status) {
        if(status == "success") {
          $(cnot).each(function (i, val) {
            if (val.cnID == cno) {
              cnot.splice(i,1);
            }
          })
          if (confirm("Move was successful, would you like to go to job " + ej + "?")){
            window.location.href = "/jdet.php?job_no="+dj;
          } else {
            //jconupd();
            $("#boscr").addClass("hideme");
            actcn = null;
            clrcnt();
            cnotUpd();
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
          cnot.splice(actcn,1);
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
    if (this.checked) {
      mcnl.push(this.value);  
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
    ccntLoad(nid);
    
  });
  //connote functions
  $("#boscr").click(function () {
    $("#boscr").addClass("hideme");
    actcn = null;
    clrcnt();
    cnotUpd();
    
  });
  $(".wrapper").click(function () {
    event.stopPropagation();
    if(!$("#cliContact").is(":focus") && !$("#cnam").is(":focus") && !$("#dnam").is(":focus") && !$("#client").is(":focus")){
      
      $("#dd").removeAttr('marker');
      $("#dd").addClass("hideme");
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
    var upd = new Map();
    var updstr;
    var fld;
    var chg = $(this).val().replace(/\'/g,"''");
    var cno = $("#cnID").val();

    if ($(this).attr('type') == 'radio') {
      fld = 'Pb';
    } else {
      fld = $(this).attr("id");
    }

    upd.set(fld,chg);

    if (chg == "") {
      updstr = fld + "=Null,"
    } else {
      updstr = fld + "='" + chg + "',";
    }
    
    updstr = updstr.substring(0,(updstr.length - 1));
    cnDetUpd(updstr,cno,upd);
    
  });
  function clrcnt(){
    $('.radios').prop('checked', false);
    $('#cn-frame :input').each(function(e) {
      if ($(this).attr('type') == 'radio') {
        
      } else {
        $(this).val('');
        $(this).removeClass("updated");
        $(this).removeClass("pending");
      }
    })
  }
  //add con note line
  $("img[id=ncl]").click(function () {
    var cnum = $("#cnID").val();
    $("#ncn td").each(function () {

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
    $.post("/inc/job-confrt-add.php",
      { cnum: cnum, sref: sref, nitm: nitm, psn: psn, itWgt: itWgt, itLen: itLen, itWid: itWid, itHei: itHei, itQty: itQty, unNum: unNum, dcls: dcls, sRisk: sRisk, pkGr: pkGr,pkDes: pkDes},
      function (data, status) {
        if (status == "success") {
          var rtrn = $.parseJSON(data)
          frt.push(rtrn[0]);
          var txt = "";
          txt = '<tr data-id="' + frt[frt.length - 1].itID + '"><td contenteditable="true" id="senRef" data-col="senRef" class="senRef updated">' + frt[frt.length - 1].senRef + '</td><td contenteditable="true" id="noItem" data-col="noItem" class="noItem updated">' + frt[frt.length - 1].noItem + '</td><td contenteditable="true" id="psn" data-col="psn" class="psn updated">' + frt[frt.length - 1].psn + '</td><td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt updated">' + frt[frt.length - 1].itWgt + '</td><td contenteditable="true" id="itLen" data-col="itLen" class="itLen updated">' + frt[frt.length - 1].itLen + '</td>';
          txt = txt + '<td contenteditable="true" id="itWid" data-col="itWid" class="itWid updated">' + frt[frt.length - 1].itWid + '</td><td contenteditable="true" id="itHei" data-col="itHei" class="itHei updated">' + frt[frt.length - 1].itHei + '</td><td contenteditable="true" id="itQty" data-col="itQty" class="itQty updated">' + frt[frt.length - 1].itQty + '</td><td contenteditable="true" id="unNum" data-col="unNum" class="unNum updated">' + frt[frt.length - 1].unNum + '</td><td contenteditable="true" id="class" data-col="class" class="class updated">' + frt[frt.length - 1].class + '</td><td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk updated">' + frt[frt.length - 1].sRisk + '</td>';
          txt = txt + '<td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr updated">' + frt[frt.length - 1].pkGr + '</td><td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes updated">' + frt[frt.length - 1].pkDes + '</td><td class="cn_ctrls" data-col="cmd"><div class="cmd_img"><img class="cntrash" class="cnbut" alt="Delete Freight Note Line" src="/img/trash.svg"></div></td></tr><div class="ntra td"><div class="cmd_img" data-id="' + frt[frt.length - 1].jnID + '"><img class="ntrash" class="nbut" alt="Delete Note" src="/img/trash.svg"></div></div></div>';
          $("#cnt_body").append(txt);   
          console.log(txt);
          conDetUpd();
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
    var ind = 0;
    $.post("/inc/job-confrt-rem.php", { frid: nid }, function (data, status) {
      $("#cnt_body tr[data-id=" + nid + "]").remove();
      $(frt).each(function(i,val){
        if(val.itID == nid) {
          frt.splice(i,1);
        }
      })
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
    var nval = $(this).html().trim();
    var mrkr = $(this);
    if ($(this).html() != cndta) {
      //Collect vars
      var updstr = col + "='" + $(this).html().trim() + "'";
      //send data and update
      $.post("/inc/con-rows-upd.php",{ updstr: updstr, cno: nid },function (data, status) {
          //$("#contlst").html(data);
          if (status == "success") {
            $(frt).each(function (i,val){
              if (val.itID == nid) {
                frt[i][col] = nval;
              }
            })
            var oind = -1;
            $(ofrt).each(function(i,oval) {
              if (oval.itID == nid) {
                oind = i;
                return false;
              }
            })
            if (oind != -1) {

            }
            if (oind == -1 || chknull(ofrt[oind][col]) != nval) {
              mrkr.addClass("updated");
              mrkr.removeClass("pending");
            } else {
              mrkr.removeClass("pending");
              mrkr.removeClass("updated");
            }
          } else {
            alert("Error in updating");
            console.log("Variables - " + updstr + " : " + cno);
            console.log("Error: " + response.responseText);
          }
        }
      ).fail(function (response) {
        alert("Error in updating");
        console.log("Error: " + response.responseText);
        console.log("Variables - " + updstr + " : " + nid);
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
  $("#cnt_body").on("keyup", "tr td", function () {
    //set frt & ofrt values
    var itid = $(this).parents("tr").attr("data-id");
    var col = $(this).attr("data-col");
    var cval = $(this).html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    var mrkr = $(this);
    var oid = -1;
    var aid = -1;
    $(ofrt).each(function (i, val) {
      if (itid == val.itID) {
        oid = i;
        return false;
      }
    });
    $(frt).each(function (i, val) {
      if (itid == val.itID) {
        aid = i;
        return false;
      }
    });
    if (oid == -1) {
      if (frt[aid][col] != cval) {
        mrkr.addClass("pending")
        mrkr.removeClass("updated")
      } else {
        mrkr.addClass("updated")
        mrkr.removeClass("pending")
      }
    } else {
      if (ofrt[oid][col] == cval) {
        mrkr.removeClass("updated")
        mrkr.removeClass("pending")
      } else {
      if (frt[aid][col] != cval) {
        mrkr.addClass("pending")
        mrkr.removeClass("updated")
      } else {
        mrkr.addClass("updated")
        mrkr.removeClass("pending")
      }}
    }


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
    }
  });
  $("#slist").on('click',".frtLne", function () {
    event.stopPropagation();
    var fld="";
    var chg="";
    $(this).children().each(function() {
        fld = $(this).data('marker');
        chg = $(this).html();
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
      $(this).addClass("pending");
      $("#snam" + ".updated").removeClass("updated");
      updchkr();
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
  });

  $("#slist").on('click',".addcard", function () {
    event.stopPropagation();
    var updstr = "";
    var cno = $("#cnID").val();
    var fld="";
    var chg="";
    var mrkr = $("#dd").data('marker');
    var crd = new Map();

    $(this).children().each(function() {
        if ($(this).attr("class") != 'add_trash'){
          fld = $("#dd").data('marker') + $(this).attr("class");
          chg = $(this).html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          $("#" + fld).val(chg).addClass("pending");
          $("#" + fld + ".updated").removeClass("updated");
          updchkr();
          crd.set(fld,chg);
          if (chg == "") {
            updstr = updstr + fld + "=Null,"
          } else {
            updstr = updstr + fld + "='" + chg.replace(/\'/g,"''") + "',";
          }        
      }
      });
      updstr = updstr.substring(0,(updstr.length - 1));
      if (mrkr == 'd' || mrkr == 'c'){
        $.post("/inc/job-dets-upd.php",{ updstr: updstr, cno: jbn },function (data, status) {
            if(status == "success"){
            for (let [key, value] of crd) {
              $("#" + key).attr("value",value).addClass("updated");
              $("#" + key + ".pending").removeClass("pending")
            }}
            updchkr();
          }
        ).fail(function (response) {
          console.log("Error: " + response.responseText);
        });        
      } else {
        cnDetUpd(updstr,cno,crd);
      }
      $("#dd").removeAttr('marker');
      $("#dd").addClass("hideme");
      clrDd();        
  });
  $("#slist").on('click',".img_trash", function (event) {
    event.stopPropagation();
    var addCard = $(this).parent().parent();
    var adBuild = new Object();
    adBuild.nam = addCard.children(".nam").html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    adBuild.add1 = addCard.children(".add1").html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    adBuild.add2 = addCard.children(".add2").html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    adBuild.add3 = addCard.children(".add3").html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    adBuild.st = addCard.children(".st").html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    adBuild.pc = addCard.children(".pc").html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    adBuild.Ctc = addCard.children(".Ctc").html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    adBuild.Ph = addCard.children(".Ph").html().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    
    var senBuild = JSON.stringify(adBuild);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
        if (xhr.responseText.search('Error') > 0) {
          alert('Address Card Removal Error');
        } else {
          addCard.remove();
        }
      }

    };

    xhr.open("POST", "/inc/adrem.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(senBuild);


  });

$("input").on({
  keyup: function(){
    if ($(this).val() != $(this).attr("value")) {
      $("#" + $(this).attr("id") + ".updated").removeClass("updated");
      $(this).addClass("pending");
    } else {
      $("#" + $(this).attr("id") + ".pending").removeClass("pending");
    }
    updchkr();
  }

})



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
    var nsup;
    if (jbn == "" || jbn == 0) {
      alert("A job needs to be created for notes to be added - addsup.click");
    } else {
      if (jty == "" && jna == "" && jde == "" && jir == "" && jno == "" && jec == "") {
        alert("Cannot add an all blank entry");
      } else {
        $.post("/inc/job-sup-add.php",{ typ: jty, nam: jna, des: jde, ire: jir, not: jno, jobno: jbn, est: jec },
          function (data, status) {
            if (data.substring(0,1) == '<') {
              $('#coll').append(data);
              alert("Error when trying to add supplier supplier!")
            } else {
              nsup = $.parseJSON(data);
              sups.push(nsup[0]);
              console.log(sups);
              var txt = "";
              txt = '<div class="supln" data-id="' + chknull(nsup[0].jsID) + '"><div contenteditable="true" data-col="jsName" class="supSu lsup updated">' + chknull(nsup[0].jsName) + '</div><div contenteditable="true" data-col="jsType" class="supTy lsup updated">' + chknull(nsup[0].jsType) + '</div><div contenteditable="true" data-col="jsDesc" class="supDe lsup updated">' + chknull(nsup[0].jsDesc) + '</div><div contenteditable="true" data-col="jsEst" class="supEc lsup updated">$' + number_format(chknull(nsup[0].jsEst),2,'.',',') + '</div><div contenteditable="true" data-col="jsInvRec" class="supIr lsup updated">' + chknull(nsup[0].jsInvRec) + '</div><div contenteditable="true" data-col="jsNotes" class="supNo lsup updated">' + chknull(nsup[0].jsNotes) + '</div><div class="suprm td" data-id="' + chknull(nsup[0].jsID) + '">Remove Supplier</div></div>';
              $("#supbody").prepend(txt);
            }
            //$("#supbody").prepend(data);
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
      if (status == "success") {
        $(sups).each(function (i, val) {
          if (val.jsID == nid) {
            sups.splice(i,1);
          }
        })

        $(".supln[data-id=" + nid + "]").remove();
      } else {
      alert("Error in removing supplier");
      console.log("Variables - " + nid);
      console.log("Error: " + response.responseText);
    }
    }).fail(function (response) {
      console.log("Error: " + response.responseText);
    });

  });
  //updating a supplier
  var nodta = "";
  $("#supbody").on("focusout",".supln .lsup", function () {

    var nid = $(this).parents(".supln").attr("data-id");
    var col = $(this).attr("data-col");
    var nval = $(this).html();
    if (col == "jsEst") {
      nval = nval.replace("$","").replace(",","")
    }
    var obj = $(this);
    var chkkr = 1;
    $(sups).each(function (i, val) {
      if (nid == val.jsID) {
        if (val[col] == nval){
        chkkr = 0;
        }
      }})
    if (chkkr == 1) {
      $.post("/inc/job-sup-upd.php",{ updstr: nval, ref: col, cno: nid },function (data, status) {
          //$("#contlst").html(data);
          if (status == "success") {
            console.log(data);
            $(sups).each(function (i, val) {
              if (val["jsID"] == nid) {
                sups[i][col] = nval;
                obj.addClass("updated");
                obj.removeClass("pending");
                if (col == "jsEst") {
                  obj.html("$" + number_format(chknull(nval),2,'.',','))
                }
              }
            });
            $(osups).each(function (i, val) {
              if (val["jsID"] == nid) {
                if (val[col] == nval) {
                  obj.removeClass("updated");
                }              
              }
            });
            updchkr();
          } else {
            alert("Error in updating");
            console.log("Variables - " + val + " : " + col + " : " + nid);
            console.log("Error: " + response.responseText);
            console.log(response);
          }
        }
      ).fail(function (response) {
        alert("Error in updating");
        console.log("Error: " + response.responseText);
        console.log("Variables - " + val + " : " + col + " : " + nid);
        console.log(response);
      }); 
    }     
  });
  $("#supbody").on("focus", ".supln .lsup", function () {
    nodta = $(this).html();
  });
  $("#supbody").on("keyup", ".supln .lsup", function () {
    fldupd("sups",$(this));
  });

  $(".j_det_info").on("focus", function(){
    if ($(this).attr('id') == "client" || $(this).attr('id') == "cliContact" ) {

    } else {
    $("#dd").removeAttr('marker');
    $("#dd").addClass("hideme");
    clrDd();        
    }
  });

  $("#cnam").on({
    focusin: function(){
      this.parentNode.appendChild(document.querySelector('#dd'));
      $("#dd").removeClass("hideme");
      $("#dd").data('marker',"c");
      ddPop();
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
    },
    keyup: function(){
      ddPop();
    }
  });  
 
});
