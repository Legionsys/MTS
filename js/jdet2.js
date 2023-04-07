var jdets = [];
var sups = [];
var notes = [];
var cnot = [];
var frt = [];
var jbn;
var upd;

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
function getSearchParams(k){
    var p={};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
    return k?p[k]:p;
   };
function firstpop(){
    console.log(jbn);
    if (jbn != null && jbn !="0") {
        var jobn = "00000" + jbn;
        $("#jbnum").html(jbn);
        $("#jobnum").html("Job - " + jobn.substring(jobn.length - 5));
    } else {
        $("#jbnum").html("New Job");
    };
    upd = "y";
    jbdu();
    jbsu();
    jbnot();
    jbcon();
    confrt();

};
function jsupd(){
    $(jdets).each(function (i, val) {
        $.each(val, function (k, v) {
        if (k == "ac_cb" || k == "inv_c" ) {
            if (v !== null){
                $('#' + k).prop('checked', true);
            }
        } else {
            $("#" + k).val(v).attr('value',v);
        }
        });
    });
};
function jsupupd() {
    $(sups).each(function (i, val) {
        var txt = "";
        txt = '<div class="supln" data-id="' + val.jsID + '">'
        if (val.jsName === null || val.jsName === undefined) {
            txt = txt + '<div contenteditable="true" data-col="jsName" class="supSu lsup"></div>';
        } else {
            txt = txt + '<div contenteditable="true" data-col="jsName" class="supSu lsup">' + val.jsName + '</div>';
        }
        if (val.jsType === null || val.jsType === undefined) {
            txt = txt + '<div contenteditable="true" data-col="jsType" class="supTy lsup"></div>';
        } else {
            txt = txt + '<div contenteditable="true" data-col="jsType" class="supTy lsup">' + val.jsType + '</div>';
        }

        if (val.jsDesc === null || val.jsDesc === undefined) {
            txt = txt + '<div contenteditable="true" data-col="jsDesc" class="supDe lsup"></div>';
        } else {
            txt = txt + '<div contenteditable="true" data-col="jsDesc" class="supDe lsup">' + val.jsDesc + '</div>';
        }

        if (val.jsEst === null || val.jsEst === undefined) {
            txt = txt + '<div contenteditable="true" data-col="jsEst" class="supEc lsup"></div>';
        } else {
            txt = txt + '<div contenteditable="true" data-col="jsEst" class="supEc lsup">' + val.jsEst + '</div>';
        }
        if (val.jsInvRec === null || val.jsInvRec === undefined) {
            txt = txt + '<div contenteditable="true" data-col="jsInvRec" class="supIr lsup"></div>';
        } else {
            txt = txt + '<div contenteditable="true" data-col="jsInvRec" class="supIr lsup">' + val.jsInvRec + '</div>';
        }
        if (val.jsNotes === null || val.jsNotes === undefined) {
            txt = txt + '<div contenteditable="true" data-col="jsNotes" class="supNo lsup"></div>';
        } else {
            txt = txt + '<div contenteditable="true" data-col="jsNotes" class="supNo lsup">' + val.jsNotes + '</div>';
        }
        txt = txt + '<div class="suprm td" data-id="' + val.jsID + '">Remove Supplier</div></div>';
        $("#supbody").append(txt);
        
    });
};
function jnotupd() {
    $(notes).each(function (i, val) {
        var txt = "";
        txt = '<div class="tr" data-id="' + val.jnID + '"><div contenteditable="true" data-col="jnNote" class="ncol td">'
        if (val.jnNote === null || val.jnNote === undefined) {
            txt = txt + '</div>';
        } else {
            txt = txt + val.jnNote + '</div>';
        }
        txt = txt + '<div contenteditable="true" data-col="jnAmt" class="namt td">';
        if (val.jnAmt === null || val.jnAmt === undefined) {
            txt = txt + '</div>';
        } else {
            txt = txt + number_format(val.jnAmt,2,'.',',') + '</div>';
        }

        txt = txt + '<div class="ntra td"><div class="cmd_img" data-id="' + val.jnID + '"><img class="ntrash" class="nbut" alt="Delete Note" src="/img/trash.svg"></div></div></div>';
        $("#notebody").append(txt);
        
    });
    namt_tot();
};
function jconupd() {
    $(cnot).each(function (i, val) {
        var txt = "";
        txt = '<div data-id="' + val.cnID + '" class="ccnt_card"><div class="cnnum">' + val.cnNum + '</div><input type="checkbox" class="mcnprnt" name="mprint" value="' + val.cnID + '"><div class="cnscomp">' + val.snam + '</div><div class="cnrcomp">' + val.rnam + '</div><div class="cnitm">' + val.titm + ' itms</div><div class="cnwgt">' + val.twgt + ' kg</div><div class="cnm3">' + Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(val.tcub) + ' m3</div></div>';
        $("#contlst").append(txt);
    });
};
function jbdu(){
    var ind = "job";
    $.post("/inc/job-init.php", 
    { jbn: jbn , indi: ind }, 
    function (data, status) {
        jdets = $.parseJSON(data);
        if (upd === "y") {
            jsupd();
        }
        }).fail(function (response) {
            console.log("Failure Job Details - " + jbn);
            console.log("Error: " + response.responseText);
            console.log(response);
        });
};
function jbsu(){
    var ind = "sup";
    $.post("/inc/job-init.php", 
    { jbn: jbn , indi: ind }, 
    function (data, status) {
        sups = $.parseJSON(data);
        if (upd === "y") {
            jsupupd();
        }
        }).fail(function (response) {
            console.log("Failure Supplier - " + jbn);
            console.log("Error: " + response.responseText);
            console.log(response);
        });    
};
function jbnot(){
    var ind = "not";
    $.post("/inc/job-init.php", 
    { jbn: jbn , indi: ind }, 
    function (data, status) {
        notes = $.parseJSON(data);
        if (upd === "y") {
            jnotupd();
        }
    }).fail(function (response) {
        console.log("Failure Notes - " + jbn);
        console.log("Error: " + response.responseText);
        console.log(response);
    });   
};
function jbcon(){
    var ind = "con";
    $.post("/inc/job-init.php", 
    { jbn: jbn , indi: ind }, 
    function (data, status) {
        cnot = $.parseJSON(data);
        if (upd === "y") {
            jconupd();
        }
    }).fail(function (response) {
        console.log("Failure Con-note - " + jbn);
        console.log("Error: " + response.responseText);
        console.log(response);
    });   
};
function confrt(){
    var ind = "frt";
    $.post("/inc/job-init.php", 
    { jbn: jbn , indi: ind }, 
    function (data, status) {
        frt = $.parseJSON(data);
        if (upd === "y") {
            //jnotupd();
        }
    }).fail(function (response) {
        console.log("Failure Freight - " + jbn);
        console.log("Error: " + response.responseText);
        console.log(response);
    }); 
};
$(document).ready(function () {
    jbn = getSearchParams("job_no");
    firstpop();

    $("#contlst").on('click',".ccnt_card", function () {
        var nid = $(this).attr("data-id");
        /*if (mcnf == "Y") {
          mcnf = "";
          return;
        }*/
        //get filtered information
        $(cnot).each(function (i, val) {
            if (val.cnID == nid) {
                $.each(val, function (k, v) {
                    console.log(k);
                    console.log(v);
                    if (k == "Pb") {
                        $('#' + v).prop('checked', true);
                      } else {
                        $("#" + k).val(v).attr('value',v);
                      }
                })
            }
        });
        $(frt).each(function(i, val) {
            if (val.cnID == nid) {
                var txt = "";
                txt = '<tr data-id="' + val.itID + '"><td contenteditable="true" id="senRef" data-col="senRef" class="senRef">' + val.senRef + '</td><td contenteditable="true" id="noItem" data-col="noItem" class="noItem">' + val.noItem + '</td><td contenteditable="true" id="psn" data-col="psn" class="psn">' + val.psn + '</td><td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt">' + val.itWgt + '</td><td contenteditable="true" id="itLen" data-col="itLen" class="itLen">' + val.itLen + '</td>';
                txt = txt + '<td contenteditable="true" id="itWid" data-col="itWid" class="itWid">' + val.itWid + '</td><td contenteditable="true" id="itHei" data-col="itHei" class="itHei">' + val.itHei + '</td><td contenteditable="true" id="itQty" data-col="itQty" class="itQty">' + val.itQty + '</td><td contenteditable="true" id="unNum" data-col="unNum" class="unNum">' + val.unNum + '</td><td contenteditable="true" id="class" data-col="class" class="class">' + val.class + '</td><td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk">' + val.sRisk + '</td>';
                txt = txt + '<td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr">' + val.pkGr + '</td><td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes">' + val.pkDes + '</td><td class="cn_ctrls" data-col="cmd"><div class="cmd_img"><img class="cntrash" class="cnbut" alt="Delete Freight Note Line" src="/img/trash.svg"></div></td></tr><div class="ntra td"><div class="cmd_img" data-id="' + val.jnID + '"><img class="ntrash" class="nbut" alt="Delete Note" src="/img/trash.svg"></div></div></div>';
                $("#cnt_body").append(txt);                
            }
        });
        $("#boscr").removeClass("hideme");
        //Get data from Server
        /*$.post("/inc/job-conn-sel.php", { cnid: nid }, function (data, status) {
          var json = $.parseJSON(data);
          //Preliminary Data
    
          //cycle Data
          $(json).each(function (i, val) {
            $.each(val, function (k, v) {
              if (k == "Pb") {
                $('#' + v).prop('checked', true);
              } else {
                $("#" + k).val(v).attr('value',v);
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
    
        });*/
      });
    


});