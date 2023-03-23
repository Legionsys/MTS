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
        console.log("Failure Supplier - " + jbn);
        console.log("Error: " + response.responseText);
        console.log(response);
    });   
};
function jbcon(){
    var ind = "con";
    $.post("/inc/job-init.php", 
    { jbn: jbn , indi: ind }, 
    function (data, status) {
        console.log(data);
        cnot = $.parseJSON(data);
        console.log(cnot);
        if (upd === "y") {
            //jnotupd();
        }
    }).fail(function (response) {
        console.log("Failure Supplier - " + jbn);
        console.log("Error: " + response.responseText);
        console.log(response);
    });   
};
$(document).ready(function () {
    jbn = getSearchParams("job_no");
    firstpop();
    


});