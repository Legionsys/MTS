var jdets = [];
var sups = [];
var notes = [];
var cnot = [];
var frt = [];
var jbn;
var upd;

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
function jbdu(){
    var ind = "job";
    $.post("/inc/job-init.php", 
    { jbn: jbn , indi: ind }, 
    function (data, status) {
        jdets = $.parseJSON(data);
        console.log("Success");
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
        console.log("Success");
        if (upd === "y") {
            jsupupd();
        }
        }).fail(function (response) {
            console.log("Failure Supplier - " + jbn);
            console.log("Error: " + response.responseText);
            console.log(response);
        });    
}
$(document).ready(function () {
    jbn = getSearchParams("job_no");
    firstpop();
    


});