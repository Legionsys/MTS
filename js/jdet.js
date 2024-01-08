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



function number_format(number, decimals, dec_point, thousands_sep) {
  number = Number(number).toFixed(decimals);

  var nstr = number.toString();
  nstr += '';
  var x = nstr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? dec_point + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1))
    x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');

  return x1 + x2;
}

function namt_tot() {
  var tots = parseFloat(0);

  var elements = document.querySelectorAll('#notebody > .tr > .namt');
  elements.forEach(function (element) {
    var content = element.innerHTML.trim();
    if (!isNaN(content)) {
      tots += parseFloat(content.replace(/\,/g, ''));
    } else {
      var numericContent = content.replace(/\,/g, '');
      if (!isNaN(numericContent)) {
        tots += parseFloat(numericContent);
      }
    }
  });

  var aheadElement = document.getElementById('ahead');
  if (tots !== parseFloat(0)) {
    aheadElement.innerHTML = number_format(tots, 2, '.', ',');
  } else {
    aheadElement.innerHTML = 'Amount';
  }
}
function getSearchParams(k) {
  var p = {};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, key, value) {
    p[key] = value;
  });
  return k ? p[k] : p;
}
function firstpop() {
  if (jbn !== null && jbn !== "0") {
    var jobn = "00000" + jbn;
    document.getElementById("jbnum").innerHTML = jbn;
    document.getElementById("jobnum").innerHTML = "Job - " + jobn.substring(jobn.length - 5);
  } else {
    document.getElementById("jbnum").innerHTML = "New Job";
  }
  upd = "y";
  fr = 'Y';
  jbdu();
  jbsu();
  jbnot();
  jbcon();
  confrt('');
  fr = '';
}
function jsupd() {
  jdets.forEach(function (val) {
    Object.entries(val).forEach(function ([k, v]) {
      if (k === "ac_cb" || k === "inv_c") {
        if (v !== null) {
          document.getElementById(k).checked = true;
        }
      } else {
        document.getElementById(k).value = v;
        document.getElementById(k).setAttribute('value', chknull(v));
      }
    });
  });
}
function chknull(value) {
  // return value;
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  if (value !== null) {
    return value;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return '';
  } else {
    return value;
  }
}
function jsupupd() {
  sups.forEach(function (val) {
    var txt = '';
    txt += '<div class="supln" data-id="' + chknull(val.jsID) + '">';
    txt += '<div contenteditable="true" data-col="jsName" class="supSu lsup">' + chknull(val.jsName) + '</div>';
    txt += '<div contenteditable="true" data-col="jsType" class="supTy lsup">' + chknull(val.jsType) + '</div>';
    txt += '<div contenteditable="true" data-col="jsDesc" class="supDe lsup">' + chknull(val.jsDesc) + '</div>';
    txt += '<div contenteditable="true" data-col="jsEst" class="supEc lsup">$' + number_format(chknull(val.jsEst), 2, '.', ',') + '</div>';
    txt += '<div contenteditable="true" data-col="jsInvRec" class="supIr lsup">' + chknull(val.jsInvRec) + '</div>';
    txt += '<div contenteditable="true" data-col="jsNotes" class="supNo lsup">' + chknull(val.jsNotes) + '</div>';
    txt += '<div class="suprm td" data-id="' + chknull(val.jsID) + '">Remove Supplier</div>';
    txt += '</div>';
    document.getElementById('supbody').insertAdjacentHTML('beforeend', txt);
  });
}
function jnotupd() {
  var notebody = document.getElementById('notebody');
  notebody.innerHTML = '';

  notes.forEach(function (val) {
    var txt = '';
    txt += '<div class="tr" data-id="' + chknull(val.jnID) + '">';
    txt += '<div contenteditable="true" data-col="jnNote" class="ncol td">' + chknull(val.jnNote) + '</div>';
    txt += '<div contenteditable="true" data-col="jnAmt" class="namt td">' + number_format(chknull(val.jnAmt), 2, '.', ',') + '</div>';
    txt += '<div class="ntra td">';
    txt += '<div class="cmd_img" data-id="' + chknull(val.jnID) + '">';
    txt += '<img class="ntrash nbut" alt="Delete Note" src="/img/trash.svg">';
    txt += '</div></div></div>';

    notebody.insertAdjacentHTML('beforeend', txt);
  });

  namt_tot();
}
function jconupd() {
  var contlst = document.getElementById('contlst');
  cnot.forEach(function (val) {
    var txt = '';
    txt += '<div data-id="' + chknull(val.cnID) + '" class="ccnt_card">';
    txt += '<div class="cnnum">' + chknull(val.cnNum) + '</div>';
    txt += '<input type="checkbox" class="mcnprnt" name="mprint" value="' + chknull(val.cnID) + '">';
    txt += '<div class="cnscomp">' + chknull(val.snam) + '</div>';
    txt += '<div class="cnrcomp">' + chknull(val.rnam) + '</div>';
    txt += '<div class="cnitm">' + chknull(val.titm) + ' itms</div>';
    txt += '<div class="cnwgt">' + chknull(val.twgt) + ' kg</div>';
    txt += '<div class="cnm3">' + Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(chknull(val.tcub)) + ' m3</div>';
    txt += '</div>';
    
    contlst.insertAdjacentHTML('beforeend', txt);
  });
}
function jbdu() {
  var frdu = fr;
  var ind = "job";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/inc/job-init.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        jdets = JSON.parse(data);
        if (frdu == 'Y') {
          ojdets = JSON.parse(JSON.stringify(jdets));
        }
        if (data.substring(0, 1) == '<') {
          document.getElementById('coll').insertAdjacentHTML('beforeend', data);
        } else {
          if (upd === "y") {
            jsupd();
          }
        }
      } else {
        console.log("Failure Job Details - " + jbn);
        console.log("Error: " + xhr.responseText);
        console.log(xhr);
      }
    }
  };

  xhr.onerror = function () {
    console.log("Error in making the request.");
  };

  xhr.send("jbn=" + jbn + "&indi=" + ind);
}
function jbsu() {
  var frsu = fr;
  var ind = "sup";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/inc/job-init.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        if (data.substring(0, 1) == '<') {
          document.getElementById('coll').insertAdjacentHTML('beforeend', data);
        } else {
          sups = JSON.parse(data);
          if (frsu == 'Y') {
            osups = JSON.parse(JSON.stringify(sups));
          }
          if (upd === "y") {
            jsupupd();
          }
        }
      } else {
        console.log("Failure Supplier - " + jbn);
        console.log("Error: " + xhr.responseText);
        console.log(xhr);
      }
    }
  };

  xhr.onerror = function () {
    console.log("Error in making the request.");
  };

  xhr.send("jbn=" + jbn + "&indi=" + ind);
}
function jbnot() {
  var ind = "not";
  var frnot = fr;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/inc/job-init.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        if (data.substring(0, 1) == '<') {
          document.getElementById('coll').insertAdjacentHTML('beforeend', data);
        } else {
          notes = JSON.parse(data);
          if (frnot == 'Y') {
            onotes = JSON.parse(JSON.stringify(notes));
          }
          if (upd === "y") {
            jnotupd();
          }
        }
      } else {
        console.log("Failure Notes - " + jbn);
        console.log("Error: " + xhr.responseText);
        console.log(xhr);
      }
    }
  };

  xhr.onerror = function () {
    console.log("Error in making the request.");
  };

  xhr.send("jbn=" + jbn + "&indi=" + ind);
}
function jbcon() {
  var ind = "con";
  var frcon = fr;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/inc/job-init.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        if (data.substring(0, 1) == '<') {
          document.getElementById('coll').insertAdjacentHTML('beforeend', data);
        } else {
          cnot = JSON.parse(data);
          if (frcon == 'Y') {
            ocnot = JSON.parse(JSON.stringify(cnot));
          }
          if (upd === "y") {
            jconupd();
          }
        }
      } else {
        console.log("Failure Con-note - " + jbn);
        console.log("Error: " + xhr.responseText);
        console.log(xhr);
      }
    }
  };

  xhr.onerror = function () {
    console.log("Error in making the request.");
  };

  xhr.send("jbn=" + jbn + "&indi=" + ind);
}
function confrt(cnn) {
  var frfr = fr;
  var ind = "frt";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/inc/job-init.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        if (data.substring(0, 1) == '<') {
          document.getElementById('coll').insertAdjacentHTML('beforeend', data);
        } else {
          frt = JSON.parse(data);
          if (frfr == 'Y') {
            ofrt = JSON.parse(JSON.stringify(frt));
          }
          if (cnn != '') {
            frtload(cnn);
          }
        }
      } else {
        console.log("Failure Freight - " + jbn);
        console.log("Error: " + xhr.responseText);
        console.log(xhr);
      }
    }
  };

  xhr.onerror = function () {
    console.log("Error in making the request.");
  };

  xhr.send("jbn=" + jbn + "&indi=" + ind);
}
function conDetUpd() {
  var tQty = 0;
  var tWgt = 0;
  var tM3 = 0;
  var len = 0;
  var wid = 0;
  var hei = 0;
  var qty = 0;

  document.querySelectorAll('#cnt_body tr').forEach(function (row) {
    if (row.getAttribute("data-id") !== "no") {
      row.querySelectorAll('td').forEach(function (cell) {
        if (cell.getAttribute('data-col') === 'noItem') {
          if (!isNaN(cell.innerHTML.replace(",", ""))) {
            tQty += parseFloat(cell.innerHTML.replace(",", ""));
          }
        } else if (cell.getAttribute('data-col') === 'itWgt') {
          if (!isNaN(cell.innerHTML.replace(",", ""))) {
            tWgt += parseFloat(cell.innerHTML.replace(",", ""));
          }
        } else if (cell.getAttribute('data-col') === 'itLen') {
          if (!isNaN(cell.innerHTML.replace(",", ""))) {
            len = parseFloat(cell.innerHTML.replace(",", ""));
          }
        } else if (cell.getAttribute('data-col') === 'itWid') {
          if (!isNaN(cell.innerHTML.replace(",", ""))) {
            wid = parseFloat(cell.innerHTML.replace(",", ""));
          }
        } else if (cell.getAttribute('data-col') === 'itHei') {
          if (!isNaN(cell.innerHTML.replace(",", ""))) {
            hei = parseFloat(cell.innerHTML.replace(",", ""));
          }
        } else if (cell.getAttribute('data-col') === 'itQty') {
          if (!isNaN(cell.innerHTML.replace(",", ""))) {
            qty = parseFloat(cell.innerHTML.replace(",", ""));
          }
        }
      });

      tM3 += len * wid * hei * qty / 1000000;
    }
  });

  document.getElementById('cn_titm').innerHTML = number_format(tQty, 0, '.', ',');
  document.getElementById('cn_twgt').innerHTML = number_format(tWgt, 1, '.', ',') + " kg";
  document.getElementById('cn_m3').innerHTML = number_format(tM3, 3, '.', ',') + " m3";
}
function cnotUpd() {
  if (jbn === "" || jbn === 0) {
    // Handle the case when jbn is empty or 0
  } else {
    var cnlist = mcnl.toString();
    document.getElementById("contlst").innerHTML = '';
    jconupd();
  }
}
function cnotCHK() {
  var checkboxes = document.querySelectorAll('input:checkbox.mcnprnt');
  
  checkboxes.forEach(function(checkbox) {
    if (mcnl.includes(checkbox.value)) {
      checkbox.checked = true;
    }
  });
}
function fldupd(init, obj) {
  var live = [];
  var olive = [];
  var indi = '';
  var nid = -1;
  var oind = -1;
  var ind = -1;
  var col = '';

  if (init === "sups") {
    live = sups;
    olive = osups;
    indi = "jsID";
    nid = obj.closest(".supln").getAttribute("data-id");
    col = obj.getAttribute("data-col");
  }

  olive.some(function (val, i) {
    if (val[indi] == nid) {
      oind = i;
      return true;
    }
  });

  live.some(function (val, i) {
    if (val[indi] == nid) {
      ind = i;
      return true;
    }
  });

  if (oind === -1 || olive[oind][col] != obj.innerHTML) {
    if (live[ind][col] != obj.innerHTML) {
      obj.classList.remove("updated");
      obj.classList.add("pending");
    } else {
      obj.classList.add("updated");
      obj.classList.remove("pending");
    }
  } else {
    obj.classList.remove("updated");
    obj.classList.remove("pending");
  }
}
function clrDd() {
  document.getElementById("slist").innerHTML = "";
}
function ddPop() {
  clrDd();
  var stxt;

  if ($("#dd").data('marker').includes('_')) {
    stxt = $("#" + $("#dd").data('marker') + "name").val();
  } else {
    stxt = $("#" + $("#dd").data('marker') + "nam").val();
  }

  if (stxt.length < 3) {
    $(".ddbrtxt").html("Please enter more letters");
    $(".load-3").removeClass("hideme");
  } else {
    $(".ddbrtxt").html("Getting Addresses");
    $(".load-3").removeClass("hideme");

    // Get data from Server
    fetch("/inc/addbklst.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'stxt=' + encodeURIComponent(stxt),
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("slist").innerHTML = data;
    })
    .catch(error => {
      console.log("Error:", error);
      console.log("Error: ddpop");
    });

    $(".ddbrtxt").html("Addresses Book Suggestions");
    $(".load-3").addClass("hideme");
  }
}
function ddConPop(val) {
  clrDd();
  var stxt = val;

  if (stxt.length < 2) {
    $(".ddbrtxt").html("Please enter more letters");
    $(".load-3").removeClass("hideme");
  } else {
    var endpoint = '';
    var marker = $("#dd").data('marker');

    if (marker == 'Jcont') {
      endpoint = "/inc/contbklst.php";
      $(".ddbrtxt").html("Getting Contacts");
    } else if (marker == 'client') {
      endpoint = "/inc/clientbklst.php";
      $(".ddbrtxt").html("Getting Clients");
    } else {
      $(".ddbrtxt").html("Contacting Server");
    }

    $(".load-3").removeClass("hideme");

    // Get data from Server
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'stxt=' + encodeURIComponent(stxt),
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("slist").innerHTML = data;
    })
    .catch(error => {
      console.log("Error:", error);
    });

    $(".ddbrtxt").html("Addresses Book Suggestions");
    $(".load-3").addClass("hideme");
  }
}
function cnDetUpd(updstr, cno, upd) {
  fetch("/inc/job-conn-upd.php", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'updstr=' + encodeURIComponent(updstr) + '&cno=' + encodeURIComponent(cno),
  })
  .then(response => response.text())
  .then((data, status) => {
    if (status === 'success') {
      var oin = -1;

      ocnot.forEach((val, i) => {
        if (val.cnID === cno) {
          oin = i;
          return false;
        }
      });

      for (const [key, value] of Object.entries(upd)) {
        const element = document.getElementById(key);

        element.classList.remove('pending');

        if (oin === -1 || chknull(ocnot[oin][key]) !== value) {
          element.value = value;
          element.classList.add('updated');
        } else {
          element.classList.remove('updated');
        }

        updchkr();
        cnot[actcn][key] = value;
      }
    } else {
      alert('Error in updating');
      console.log('Variables - ' + updstr + ' : ' + cno);
      console.log('Error: ' + response.responseText);
    }
  })
  .catch(error => {
    alert('Error in updating');
    console.log('Error: ' + error);
    console.log('Variables - ' + updstr + ' : ' + cno);
  });
}
function ddFrtPop(val) {
  clrDd();
  var stxt = val;

  if (stxt.length < 3) {
    $(".ddbrtxt").html("Please enter more letters");
    $(".load-3").removeClass("hideme");
  } else {
    $(".ddbrtxt").html("Getting Suggestions");
    $(".load-3").removeClass("hideme");

    // Get data from Server using fetch API
    fetch("/inc/frtbklst.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'stxt=' + encodeURIComponent(stxt),
    })
    .then(response => response.text())
    .then(data => {
      $("#slist").html(data);
    })
    .catch(error => {
      console.log("Error: " + error);
    })
    .finally(() => {
      $(".ddbrtxt").html("Freight Suggestions");
      $(".load-3").addClass("hideme");
    });
  }
}
function updchkr() {
  var pend = document.getElementsByClassName('pending');

  if (pend.length > 0) {
    document.getElementById('updcheck').classList.remove('chkgood');
    document.getElementById('updcheck').classList.add('chkpend');
    document.getElementById('updcheck').innerHTML = 'Click me to update';
  } else {
    document.getElementById('updcheck').classList.remove('chkpend');
    document.getElementById('updcheck').classList.add('chkgood');
    document.getElementById('updcheck').innerHTML = 'All fields up to date';
  }
}
function frtload(cno) {
  var all = false;
  var oind = -1;
  var cntBody = document.getElementById('cnt_body');
  cntBody.innerHTML = '';

  frt.forEach(function (val) {
    if (val.cnID == cno) {
      oind = -1;
      ofrt.forEach(function (oval, i) {
        if (oval.itID == val.itID) {
          oind = i;
          return false;
        }
      });

      var row = document.createElement('tr');
      row.setAttribute('data-id', val.itID);
      row.innerHTML = '<td contenteditable="true" id="senRef" data-col="senRef" class="senRef">' + val.senRef + '</td>' +
                      '<td contenteditable="true" id="noItem" data-col="noItem" class="noItem">' + val.noItem + '</td>' +
                      '<td contenteditable="true" id="psn" data-col="psn" class="psn">' + val.psn + '</td>' +
                      '<td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt">' + val.itWgt + '</td>' +
                      '<td contenteditable="true" id="itLen" data-col="itLen" class="itLen">' + val.itLen + '</td>' +
                      '<td contenteditable="true" id="itWid" data-col="itWid" class="itWid">' + val.itWid + '</td>' +
                      '<td contenteditable="true" id="itHei" data-col="itHei" class="itHei">' + val.itHei + '</td>' +
                      '<td contenteditable="true" id="itQty" data-col="itQty" class="itQty">' + val.itQty + '</td>' +
                      '<td contenteditable="true" id="unNum" data-col="unNum" class="unNum">' + val.unNum + '</td>' +
                      '<td contenteditable="true" id="class" data-col="class" class="class">' + val.class + '</td>' +
                      '<td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk">' + val.sRisk + '</td>' +
                      '<td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr">' + val.pkGr + '</td>' +
                      '<td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes">' + val.pkDes + '</td>' +
                      '<td class="cn_ctrls" data-col="cmd"><div class="cmd_img"><img class="cntrash" class="cnbut" alt="Delete Freight Note Line" src="/img/trash.svg"></div></td></tr>' +
                      '<div class="ntra td"><div class="cmd_img" data-id="' + val.jnID + '"><img class="ntrash" class="nbut" alt="Delete Note" src="/img/trash.svg"></div></div></div>';
      cntBody.appendChild(row);

      var rows = cntBody.querySelectorAll('tr[data-id="' + val.itID + '"]');
      rows.forEach(function (row) {
        var cells = row.querySelectorAll('td[id]');
        cells.forEach(function (cell) {
          if (oind == -1) {
            cell.classList.add('updated');
          } else {
            if (cell.innerHTML != ofrt[oind][cell.getAttribute('data-col')]) {
              cell.classList.add('updated');
            }
          }
        });
      });
    }
  });

  if (pauseReq) {
    pauseReq = false;
  }
}
function ccntLoad(cno) {
  var oin = -1;
  var cntBody = document.getElementById('cnt_body');
  cntBody.innerHTML = '';

  ocnot.forEach(function (val, i) {
    if (val.cnID == cno) {
      oin = i;
      return false;
    }
  });

  cnot.forEach(function (val, i) {
    if (val.cnID == cno) {
      actcn = i;
      for (var k in val) {
        if (k == "Pb") {
          document.getElementById(val[k]).checked = true;
        } else {
          var element = document.getElementById(k);
          element.value = val[k];
          element.setAttribute('value', chknull(val[k]));

          if (oin == -1) {
            element.classList.add("updated");
            element.classList.remove("pending");
          } else {
            if (ocnot[oin][k] != val[k]) {
              element.classList.add("updated");
              element.classList.remove("pending");
            } else {
              element.classList.remove("pending");
              element.classList.remove("updated");
            }
          }
        }
      }
    }
  });

  frtload(cno);
  document.getElementById('boscr').classList.remove('hideme');
}
document.addEventListener('DOMContentLoaded', function () {
  //console.log(window.location.href);
  window.addEventListener('popstate', function(event) {
    alert('pop');
  });
  
  actcn = null;
  climkr = 0;
  jbn = getSearchParams("job_no");
  firstpop();
  namt_tot();
  cnotUpd();
  updchkr();
  document.getElementById("slist").addEventListener('mouseenter', function (event) {
    if (event.target.classList.contains('contcard')) {
      climkr = 1;
    }
  });
  document.getElementById("slist").addEventListener('mouseleave', function (event) {
    if (event.target.classList.contains('contcard')) {
      climkr = 0;
    }
  });
  document.getElementById("slist").addEventListener('click', function (event) {
    if (event.target.classList.contains('contcard')) {
      climkr = 0;
      var updstr = "";
      var cno = document.getElementById("cnID").value;
      var mrkr = document.getElementById("dd").getAttribute('data-marker');
      var card = new Map();
  
      if (mrkr == 'Jcont') {
        document.getElementById("cliContact").value = event.target.querySelector(".lstNam").innerHTML;
        document.getElementById("cliContPh").value = event.target.querySelector(".lstPh").innerHTML;
        document.getElementById("cliContEm").value = event.target.querySelector(".lstEm").innerHTML;
  
        updstr += 'contd="' + event.target.querySelector(".lstNam").innerHTML.replace(/'/g, "''") + '",';
        updstr += 'contPh="' + event.target.querySelector(".lstPh").innerHTML.replace(/'/g, "''") + '",';
        updstr += 'contEm="' + event.target.querySelector(".lstEm").innerHTML.replace(/'/g, "''") + '"';
        updstr = updstr.replace('=""', '=NULL');
  
        fetch("/inc/job-dets-upd.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: "updstr=" + updstr + "&cno=" + jbn,
        }).then(response => response.text()).then(data => {
          // Handle the response
        }).catch(error => {
          console.error('Error:', error);
        });
      } else if (mrkr == 'client') {
        document.getElementById("client").value = event.target.querySelector(".lstcli").innerHTML;
        document.getElementById("cliContact").value = event.target.querySelector(".lstcont").innerHTML;
        document.getElementById("cliContPh").value = event.target.querySelector(".lstcph").innerHTML;
        document.getElementById("cliContEm").value = event.target.querySelector(".lstctc").innerHTML;
        document.getElementById("cliContEm2").value = event.target.querySelector(".lstctc2").innerHTML;
  
        document.getElementById("client").classList.add("pending");
        document.getElementById("cliContact").classList.add("pending");
        document.getElementById("cliContPh").classList.add("pending");
        document.getElementById("cliContEm").classList.add("pending");
        document.getElementById("cliContEm2").classList.add("pending");
  
        updchkr();
  
        card.set("client", event.target.querySelector(".lstcli").innerHTML);
        card.set("cliContact", event.target.querySelector(".lstcont").innerHTML);
        card.set("cliContPh", event.target.querySelector(".lstcph").innerHTML);
        card.set("cliContEm", event.target.querySelector(".lstctc").innerHTML);
        card.set("cliContEm2", event.target.querySelector(".lstctc2").innerHTML);
  
        var client = event.target.querySelector(".lstcli").innerHTML.replace(/'/g, "''");
        fetch("/inc/job-cli-ch.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: "client=" + client + "&jobno=" + jbn,
        }).then(response => response.text()).then(data => {
          document.getElementById("jbnum").innerHTML = data;
          jbn = data;
          insertJob = ("000000" + data).slice(-5);
          document.getElementById("jobnum").innerHTML = "Job Specific Information - " + insertJob;
  
          fetch("/inc/job-dets-upd.php", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "updstr=" + updstr + "&cno=" + jbn,
          }).then(response => response.text()).then(data => {
            if (status == "success") {
              for (let [key, value] of card) {
                document.getElementById(key + ".pending").classList.remove("pending");
                document.getElementById(key).value = value;
                document.getElementById(key).classList.add("updated");
              }
              updchkr();
            }
          }).catch(error => {
            console.error('Error:', error);
          });
        }).catch(error => {
          console.error('Error:', error);
        });
  
        updstr += 'contd="' + event.target.querySelector(".lstcont").innerHTML.replace(/'/g, "''") + '",';
        updstr += 'contPh="' + event.target.querySelector(".lstcph").innerHTML.replace(/'/g, "''") + '",';
        updstr += 'contEm="' + event.target.querySelector(".lstctc").innerHTML.replace(/'/g, "''") + '",';
        updstr += 'contEm2="' + event.target.querySelector(".lstctc2").innerHTML.replace(/'/g, "''") + '"';
        updstr = updstr.replace('=""', '=NULL');
      } else {
        document.getElementById(mrkr + "Ctc").value = event.target.querySelector(".lstNam").innerHTML;
        document.getElementById(mrkr + "Ph").value = event.target.querySelector(".lstPh").innerHTML;
  
        updstr += "#" + mrkr + "Ctc='" + event.target.querySelector(".lstNam").innerHTML.replace(/'/g, "''") + "',";
        updstr += "#" + mrkr + "Ph='" + event.target.querySelector(".lstPh").innerHTML.replace(/'/g, "''") + "'";
        updstr = updstr.replace('=""', '=NULL');
  
        card.set(mrkr + "Ctc", event.target.querySelector(".lstNam").innerHTML);
        card.set(mrkr + "Ph", event.target.querySelector(".lstPh").innerHTML);
  
        if (mrkr == 'r' || mrkr == 'c') {
          fetch("/inc/job-dets-upd.php", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "updstr=" + updstr + "&cno=" + jbn,
          }).then(response => response.text()).then(data => {
            // Handle the response
          }).catch(error => {
            console.error('Error:', error);
          });
        } else {
          cnDetUpd(updstr, cno, card);
        }
      }
  
      document.getElementById("dd").removeAttribute('marker');
      document.getElementById("dd").classList.add("hideme");
      clrDd();
    }
  });
  document.querySelector("input[name=clientName]").addEventListener('change', function () {
    if (climkr !== 1) {
      var client = document.querySelector("input[name=clientName]").value;
      fetch("/inc/job-cli-ch.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "client=" + client + "&jobno=" + jbn,
      }).then(response => response.text()).then(data => {
        document.getElementById("jbnum").innerHTML = data;
        jbn = data;
        insertJob = ("000000" + data).slice(-5);
        document.getElementById("jobnum").innerHTML = "Job Specific Information - " + insertJob;
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  });
  
  document.querySelector("input[name=clientName]").addEventListener('keydown', function (e) {
    if (e.which === 9) {
      climkr = 0;
    }
  });
  document.querySelectorAll(".j_det_info").forEach(function (element) {
    element.addEventListener('change', function () {
      var ent = element.value;
      var fldId = element.id;
      var field = element.name;
  
      fetch("/inc/job-inf-ch.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "det=" + field + "&upd=" + ent + "&jobno=" + jbn,
      }).then(response => response.text()).then(function (data) {
        if (data === 'success') {
          document.getElementById(fldId).value = ent;
          document.getElementById(fldId).classList.remove("pending");
          document.getElementById(fldId).classList.add("updated");
          updchkr();
        }
      }).catch(function (error) {
        console.error('Error:', error);
      });
    });
  });
  //job status toggles
  document.querySelectorAll(".chkbx").forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      var val = checkbox.checked ? new Date().toISOString().split('T')[0] : "";
      var col = checkbox.getAttribute("data-par");
  
      fetch("/inc/job_add_upd.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "col=" + col + "&val=" + val + "&jno=" + jbn,
      }).then(response => response.text()).then(function (data) {
        // Handle success if needed
      }).catch(function (error) {
        console.error('Error:', error);
      });
    });
  });
  //address fields
  document.querySelectorAll(".jadd").forEach(function (input) {
    input.addEventListener('change', function () {
      var val = input.value;
      var did = input.id;
      var col = input.name;
      var cur = '';
      var og = '';
  
      fetch("/inc/job_add_upd.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "col=" + col + "&val=" + val + "&jno=" + jbn,
      }).then(response => response.text()).then(function (data) {
        document.getElementById(did).setAttribute("value", val);
        document.getElementById(did + ".pending").classList.remove("pending");
  
        jdets.forEach(function (val) {
          Object.entries(val).forEach(function ([k, v]) {
            if (k === did) {
              cur = v;
            }
          });
        });
  
        ojdets.forEach(function (val) {
          Object.entries(val).forEach(function ([k, v]) {
            if (k === did) {
              og = v;
            }
          });
        });
  
        if (val === og) {
          document.getElementById(did).classList.remove("updated");
        } else {
          document.getElementById(did).classList.add("updated");
        }
  
        updchkr();
      }).catch(function (error) {
        console.error('Error:', error);
      });
    });
  
    input.addEventListener('focus', function () {
      if (input.id === "cnam" || input.id === "dnam") {
  
      } else {
        document.getElementById("dd").removeAttribute('marker');
        document.getElementById("dd").classList.add("hideme");
        clrDd();
      }
    });
  
    input.addEventListener('keyup', function () {
      if (input.value === input.getAttribute("value")) {
        document.getElementById(input.id + ".pending").classList.remove("pending");
      } else {
        document.getElementById(input.id + ".updated").classList.remove("updated");
        input.classList.add("pending");
      }
  
      updchkr();
    });
  });
  //adding a note
  document.getElementById('newn').addEventListener('click', function () {
    var nnote = document.getElementById('nnt').innerHTML;
    var namt = document.getElementById('nna').textContent.replace(",", "").replace("$", "");
  
    if (jbn === "" || jbn == 0) {
      alert("A job needs to be created for notes to be added - newn.click");
    } else {
      if (!isNaN(namt) || namt === "") {
        if (nnote === "" && namt === "") {
          alert("Cannot add a note with no text or amount");
        } else {
          fetch("/inc/job-note-add.php", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "txt=" + nnote + "&amt=" + namt + "&jobno=" + jbn,
          }).then(response => response.text()).then(function (data) {
            document.getElementById('notebody').insertAdjacentHTML('beforeend', data);
            document.getElementById('nnt').textContent = "";
            document.getElementById('nna').textContent = "";
            namt_tot();
          }).catch(function (error) {
            console.error('Error:', error);
          });
        }
      } else {
        alert("The amount column needs to be a number or blank");
      }
    }
  });
  //deleting a note
  document.getElementById('notebody').addEventListener('click', function (event) {
    if (event.target.classList.contains('ntrash')) {
      var nid = event.target.closest('.tr').getAttribute('data-id');
      
      fetch("/inc/job-note-rem.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "jnid=" + nid,
      }).then(response => response.text()).then(function (data) {
        if (data === "success") {
          notes.forEach(function (val, i) {
            if (val.jnID == nid) {
              notes.splice(i, 1);
            }
          });
          console.log(notes);
          document.querySelector('.tr[data-id="' + nid + '"]').remove();
        } else {
          alert("Error in removing supplier");
          console.log("Variables - " + nid);
        }
        namt_tot();
      }).catch(function (error) {
        console.log("Error: ", error);
      });
    }
  });
  //updating a note
  var nodta = "";
  document.getElementById('notebody').addEventListener('focusout', function (event) {
    var target = event.target;
    if (target.closest('.tr') && target.closest('.tr .td')) {
      var nid = target.closest('.tr').getAttribute('data-id');
      var col = target.getAttribute('data-col');
      var chkkr = 1;
      var mrkr = target;
      var ind = -1;
      
      if (col == "jnAmt") {
        target.innerHTML = number_format(target.innerHTML.replace(/\,/g, "").replace("$", ""), 2, ".", ",");
        var nval = target.innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\,/g, "").replace("$", "");
      } else {
        var nval1 = target.innerHTML.replace(/<div>/g, "&zzz;").replace(/<br>/g, "&zzz;");
        var nval = nval1.replace(/(<([^>]+)>)/ig, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&zzz;/g, "<br>");
      }
  
      // Collect vars
      notes.forEach(function (val, i) {
        if (nid == val.jnID) {
          ind = i;
          if (val[col] == nval) {
            chkkr = 0;
          }
          return false;
        }
      });
  
      if (chkkr == 1) {
        // Send data and update
        fetch("/inc/job-note-upd.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: "updstr=" + nval + "&ref=" + col + "&cno=" + nid,
        }).then(response => response.text()).then(function (data) {
          if (data === "success") {
            notes[ind][col] = nval;
            mrkr.classList.add("updated");
            mrkr.classList.remove("pending");
  
            onotes.forEach(function (val) {
              if (val["jnID"] == nid) {
                if (val[col] == nval) {
                  mrkr.classList.remove("updated");
                }
              }
            });
  
            updchkr();
  
            if (col == "jnNote") {
              mrkr.innerHTML = nval;
            }
          } else {
            alert("Error in updating");
            console.log(col + " : " + nval + " : " + nid);
          }
        }).catch(function (error) {
          alert("Error in updating");
          console.log("Error: ", error);
          console.log(col + " : " + nval + " : " + nid);
        });
  
        // Check for sums
        if (col == "jnAmt") {
          namt_tot();
        }
      }
    }
  });
  document.getElementById('notebody').addEventListener('keyup', function (event) {
    var target = event.target;
    if (target.closest('.tr') && target.closest('.tr .td')) {
      var nid = target.closest('.tr').getAttribute('data-id');
      var col = target.getAttribute('data-col');
      var mrkr = target;
      var ind = -1;
      var oind = -1;
  
      if (col == "jnAmt") {
        var cval = number_format(target.innerHTML.replace(/\,/g, "").replace("$", ""), 2, ".", ",");
      } else {
        var cval = target.innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      }
  
      // Find data in array
      notes.forEach(function (val, i) {
        if (nid == val.jnID) {
          ind = i;
          return false;
        }
      });
  
      onotes.forEach(function (val, i) {
        if (nid == val.jnID) {
          oind = i;
          return false;
        }
      });
  
      if (notes[ind][col] == cval) {
        mrkr.classList.remove("pending");
        mrkr.classList.add("updated");
        if (onotes[oind][col] == cval) {
          mrkr.classList.remove("updated");
        }
      } else {
        mrkr.classList.add("pending");
        mrkr.classList.remove("updated");
      }
  
      updchkr();
    }
  });
  document.getElementById('cnt_body').addEventListener('focus', function (event) {
    var target = event.target;
    if (target.closest('tr td')) {
      nodta = target.innerHTML;
    }
  });
  //adding a Connote
  document.querySelector('img[id=acn]').addEventListener('click', function () {
    if (jbn !== "" && jbn !== 0) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/inc/job-conn-add.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var data = xhr.responseText;
          var txt = '';
          if (data.substring(0, 1) === '<') {
            document.getElementById('coll').insertAdjacentHTML('beforeend', data);
          } else {
            var obj = JSON.parse(data);
            cnot.push(obj[0]);
            ocnot.push(obj[0]);
            ccntLoad(obj[0].cnID);
          }
        } else if (xhr.status !== 200) {
          console.log("Error: " + xhr.responseText);
        }
      };
      xhr.send('jobno=' + encodeURIComponent(jbn));
    } else {
      alert("A job needs to be created for notes to be added - acn.click");
    }
  });
  //multi CN compile
  document.querySelector('img[id=mcn]').addEventListener('click', function () {
    var cnlst = mcnl.toString();
    if (mcnl.length > 0) {
      window.open("/cndl.php?CNID=" + cnlst, '_blank');
    } else {
      alert("Please select some con-notes to add to the package");
    }
  });
//printing a connote
document.getElementById('scnprt').addEventListener('click', function () {
  var cno = document.getElementById('cnID').value;
  window.open("/cndl.php?CNID=" + cno, '_blank');
});
//copying a con-cnote
document.getElementById('cncopy').addEventListener('click', function () {
  var cno = document.getElementById('cnID').value;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/inc/job-con-copy.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        if (data === 'success') {
          var njn = parseInt(data);
          var conum = '00000' + njn;
          var ncnum = 'E' + conum.substring(conum.length - 5);
          alert("New connote created on this job\nConnote number is - " + ncnum + "\nLoading new connote now! please wait for confirmation con note is ready");
          cnot.push(JSON.parse(JSON.stringify(cnot[actcn])));
          // Set new actcn
          actcn = cnot.length - 1;
          cnot[actcn]["cnID"] = njn;
          cnot[actcn]["cnNum"] = ncnum;
          // Update the connote id and number
          document.getElementById('cnID').value = njn;
          document.getElementById('cnNum').value = ncnum;
          // Update the frt array to include new rows
          pauseReq = true;
          confrt(njn);

          function waiting() {
            console.log(pauseReq);
            if (pauseReq == true) {
              setTimeout(function () {
                waiting()
              }, 100);
            } else {
              alert("Connote " + ncnum + " is ready for use");
            }
          }

          waiting();
        } else {
          alert("There was an error copying this connote,\n" + data);
        }
      } else {
        console.error("Request failed with status: " + xhr.status);
      }
    }
  };
  xhr.send("cn=" + cno);
});
//moving a con-note
document.getElementById('cnmove').addEventListener('click', function () {
  var cno = document.getElementById('cnID').value;
  var ej = prompt("Please enter the destination job number?", jbn);
  var dj = parseInt(ej);

  if (dj !== parseInt(document.getElementById('jbnum').innerText) && dj !== 0 && !isNaN(dj)) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/inc/job-con-move.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var data = xhr.responseText;
          if (data === 'success') {
            cnot.forEach(function (val, i) {
              if (val.cnID == cno) {
                cnot.splice(i, 1);
              }
            });

            if (confirm("Move was successful, would you like to go to job " + ej + "?")) {
              window.location.href = "/jdet.php?job_no=" + dj;
            } else {
              document.getElementById('boscr').classList.add('hideme');
              actcn = null;
              clrcnt();
              cnotUpd();
            }
          } else {
            alert("There was an error moving this connote,\n" + data);
          }
        } else {
          console.error("Request failed with status: " + xhr.status);
        }
      }
    };
    xhr.send("cno=" + cno + "&dj=" + dj);
  }
});
//deleting a con-note
document.getElementById('cndel').addEventListener('click', function () {
  if (confirm("This will delete this connote!\nAre you sure you wish to continue?")) {
    var cno = document.getElementById('cnID').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/inc/job-con-move.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var data = xhr.responseText;
          if (data === 'success') {
            cnot.splice(actcn, 1);
            document.getElementById('boscr').classList.add('hideme');
            clrcnt();
            cnotUpd();
          } else {
            alert("There was an error deleting this connote,\n" + data);
          }
        } else {
          console.error("Request failed with status: " + xhr.status);
        }
      }
    };
    xhr.send("cno=" + cno + "&dj=0");
  }
});
//multi con-note select
document.getElementById('contlst').addEventListener('click', function (event) {
  if (event.target.classList.contains('mcnprnt')) {
    mcnf = "Y";
    if (event.target.checked) {
      mcnl.push(event.target.value);
    } else {
      var remItem = event.target.value;
      mcnl = mcnl.filter(function(value) {
        return value !== remItem;
      });
    }
  }
});
//Opening a Connote
document.getElementById('contlst').addEventListener('click', function (event) {
  if (event.target.classList.contains('ccnt_card')) {
    var nid = event.target.getAttribute('data-id');
    
    if (mcnf === "Y") {
      mcnf = "";
      return;
    }
    ccntLoad(nid);
  }
});
//connote functions
document.getElementById('boscr').addEventListener('click', function () {
  document.getElementById('boscr').classList.add('hideme');
  actcn = null;
  clrcnt();
  cnotUpd();
});
document.querySelector('.wrapper').addEventListener('click', function (event) {
  event.stopPropagation();
  const cliContactFocused = document.querySelector("#cliContact").matches(":focus");
  const cnamFocused = document.querySelector("#cnam").matches(":focus");
  const dnamFocused = document.querySelector("#dnam").matches(":focus");
  const clientFocused = document.querySelector("#client").matches(":focus");

  if (!cliContactFocused && !cnamFocused && !dnamFocused && !clientFocused) {
    const dd = document.getElementById('dd');
    dd.removeAttribute('marker');
    dd.classList.add('hideme');
    clrDd();
  }
});
document.getElementById('cn-frame').addEventListener('click', function (event) {
  event.stopPropagation();
  const activeElementClass = document.activeElement.getAttribute('class');
  const activeElementParentId = document.activeElement.parentElement.getAttribute('id');

  const cnameInputFocused = document.querySelector('.cn_cname input').matches(":focus");
  const isExcludedClass = activeElementClass && !["psn", "senRef"].includes(activeElementClass);
  const isExcludedParent = activeElementParentId !== 'ncn';

  if (!cnameInputFocused && isExcludedClass && isExcludedParent) {
    const dd = document.getElementById('dd');
    dd.removeAttribute('marker');
    dd.classList.add('hideme');
    clrDd();
  }
});
document.querySelectorAll('.cndd').forEach(function (element) {
  element.addEventListener('change', function () {
    var upd = new Map();
    var updstr;
    var fld;
    var chg = this.value.replace(/\'/g, "''");
    var cno = document.getElementById('cnID').value;

    if (this.type === 'radio') {
      fld = 'Pb';
    } else {
      fld = this.id;
    }

    upd.set(fld, chg);

    if (chg === '') {
      updstr = fld + '=Null,';
    } else {
      updstr = fld + "='" + chg + "',";
    }

    updstr = updstr.substring(0, (updstr.length - 1));
    cnDetUpd(updstr, cno, upd);
  });
});
function clrcnt() {
  document.querySelectorAll('.radios').forEach(function (radio) {
    radio.checked = false;
  });

  document.querySelectorAll('#cn-frame :input').forEach(function (input) {
    if (input.type === 'radio') {
      // Handling radio buttons if needed
    } else {
      input.value = '';
      input.classList.remove('updated');
      input.classList.remove('pending');
    }
  });
}
  //add con note line
  document.querySelector("img[id=ncl]").addEventListener("click", function () {
    var cnum = document.querySelector("#cnID").value;
    var sref, nitm, psn, itWgt, itLen, itWid, itHei, itQty, unNum, dcls, sRisk, pkGr, pkDes;

    document.querySelectorAll("#ncn td").forEach(function (cell) {
        var dta = cell.innerHTML.trim() || null;

        switch (cell.getAttribute("data-col")) {
            case "senRef":
                sref = dta;
                cell.textContent = '';
                break;
            case "noItem":
                nitm = dta;
                cell.textContent = '';
                break;
            case "psn":
                psn = dta;
                cell.textContent = '';
                break;
            case "itWgt":
                itWgt = dta;
                cell.textContent = '';
                break;
            case "itLen":
                itLen = dta;
                cell.textContent = '';
                break;
            case "itWid":
                itWid = dta;
                cell.textContent = '';
                break;
            case "itHei":
                itHei = dta;
                cell.textContent = '';
                break;
            case "itQty":
                itQty = dta;
                cell.textContent = '';
                break;
            case "unNum":
                unNum = dta;
                cell.textContent = '';
                break;
            case "class":
                dcls = dta;
                cell.textContent = '';
                break;
            case "sRisk":
                sRisk = dta;
                cell.textContent = '';
                break;
            case "pkGr":
                pkGr = dta;
                cell.textContent = '';
                break;
            case "pkDes":
                pkDes = dta;
                cell.textContent = '';
                break;
        }
    });

    // Post data
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/inc/job-confrt-add.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rtrn = JSON.parse(xhr.responseText)[0];
            frt.push(rtrn);
            var txt = '<tr data-id="' + frt[frt.length - 1].itID + '"><td contenteditable="true" id="senRef" data-col="senRef" class="senRef updated">' + frt[frt.length - 1].senRef + '</td><td contenteditable="true" id="noItem" data-col="noItem" class="noItem updated">' + frt[frt.length - 1].noItem + '</td><td contenteditable="true" id="psn" data-col="psn" class="psn updated">' + frt[frt.length - 1].psn + '</td><td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt updated">' + frt[frt.length - 1].itWgt + '</td><td contenteditable="true" id="itLen" data-col="itLen" class="itLen updated">' + frt[frt.length - 1].itLen + '</td>';
            txt += '<td contenteditable="true" id="itWid" data-col="itWid" class="itWid updated">' + frt[frt.length - 1].itWid + '</td><td contenteditable="true" id="itHei" data-col="itHei" class="itHei updated">' + frt[frt.length - 1].itHei + '</td><td contenteditable="true" id="itQty" data-col="itQty" class="itQty updated">' + frt[frt.length - 1].itQty + '</td><td contenteditable="true" id="unNum" data-col="unNum" class="unNum updated">' + frt[frt.length - 1].unNum + '</td><td contenteditable="true" id="class" data-col="class" class="class updated">' + frt[frt.length - 1].class + '</td><td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk updated">' + frt[frt.length - 1].sRisk + '</td>';
            txt += '<td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr updated">' + frt[frt.length - 1].pkGr + '</td><td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes updated">' + frt[frt.length - 1].pkDes + '</td><td class="cn_ctrls" data-col="cmd"><div class="cmd_img"><img class="cntrash" class="cnbut" alt="Delete Freight Note Line" src="/img/trash.svg"></div></td></tr><div class="ntra td"><div class="cmd_img" data-id="' + frt[frt.length - 1].jnID + '"><img class="ntrash" class="nbut" alt="Delete Note" src="/img/trash.svg"></div></div></div>';
            document.getElementById("cnt_body").insertAdjacentHTML("beforeend", txt);
            console.log(txt);
            conDetUpd();
        } else if (xhr.readyState == 4) {
            alert("Error in updating");
        }
    };
    var data = "cnum=" + encodeURIComponent(cnum) + "&sref=" + encodeURIComponent(sref) + "&nitm=" + encodeURIComponent(nitm) + "&psn=" + encodeURIComponent(psn) + "&itWgt=" + encodeURIComponent(itWgt) + "&itLen=" + encodeURIComponent(itLen) + "&itWid=" + encodeURIComponent(itWid) + "&itHei=" + encodeURIComponent(itHei) + "&itQty=" + encodeURIComponent(itQty) + "&unNum=" + encodeURIComponent(unNum) + "&dcls=" + encodeURIComponent(dcls) + "&sRisk=" + encodeURIComponent(sRisk) + "&pkGr=" + encodeURIComponent(pkGr) + "&pkDes=" + encodeURIComponent(pkDes);
    xhr.send(data);
});
function findParentRow(element) {
  while (element && element.tagName !== "TR") {
      element = element.parentElement;
  }
  return element;
}
//delete con note line
document.getElementById("cnt_body").addEventListener("click", function (event) {
  var target = event.target;

  if (target.classList.contains("cntrash")) {
      var row = findParentRow(target);
      if (row) {
          var nid = row.getAttribute("data-id");
          var ind = 0;

          var xhr = new XMLHttpRequest();
          xhr.open("POST", "/inc/job-confrt-rem.php", true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                  document.querySelector("#cnt_body tr[data-id='" + nid + "']").remove();
                  frt = frt.filter(function (val) {
                      return val.itID != nid;
                  });
                  conDetUpd();
              } else if (xhr.readyState == 4) {
                  console.log("Error: " + xhr.responseText);
              }
          };
          var data = "frid=" + encodeURIComponent(nid);
          xhr.send(data);
      }
  }
});



//update con note line
  var cndta = "";
  var cndu = "";
  document.getElementById("cnt_body").addEventListener("focusout", function (event) {
    var target = event.target;

    if (target.tagName === "TD") {
        var row = findParentRow(target);
        if (row) {
            var nid = row.getAttribute("data-id");
            var col = target.getAttribute("data-col");
            var nval = target.textContent.trim();
            var mrkr = target;

            if (target.innerHTML !== cndta) {
                // Collect vars
                var updstr = col + "='" + nval + "'";
                // Send data and update
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/inc/con-rows-upd.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        if (xhr.responseText === "success") {
                            frt.forEach(function (val, i) {
                                if (val.itID == nid) {
                                    frt[i][col] = nval;
                                }
                            });
                            var oind = ofrt.findIndex(function (oval) {
                                return oval.itID == nid;
                            });
                            if (oind != -1) {
                                // Handle case when oind is not -1
                            }
                            if (oind == -1 || chknull(ofrt[oind][col]) != nval) {
                                mrkr.classList.add("updated");
                                mrkr.classList.remove("pending");
                            } else {
                                mrkr.classList.remove("pending");
                                mrkr.classList.remove("updated");
                            }
                        } else {
                            alert("Error in updating");
                            console.log("Variables - " + updstr + " : " + cno);
                            console.log("Error: " + xhr.responseText);
                        }
                    } else if (xhr.readyState == 4) {
                        alert("Error in updating");
                        console.log("Error: " + xhr.responseText);
                        console.log("Variables - " + updstr + " : " + nid);
                        console.log(xhr);
                    }
                };
                var data = "updstr=" + encodeURIComponent(updstr) + "&cno=" + encodeURIComponent(nid);
                xhr.send(data);

                // Check for sums
                if ("noItemitWgtitLenitWiditHeiitQty".indexOf(col) !== -1) {
                    conDetUpd();
                }
            }
        }
    }
});



document.getElementById("cnt_body").addEventListener("focusin", function (event) {
  var target = event.target;

  if (target.tagName === "TD") {
      cndta = target.innerHTML;
      event.stopPropagation();
  }
});

document.getElementById("cnt_body").addEventListener("keyup", function (event) {
  var target = event.target;

  if (target.tagName === "TD") {
      var itid = target.closest("tr").getAttribute("data-id");
      var col = target.getAttribute("data-col");
      var cval = target.innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      var mrkr = target;
      var oid = -1;
      var aid = -1;

      for (var i = 0; i < ofrt.length; i++) {
          if (itid === ofrt[i].itID) {
              oid = i;
              break;
          }
      }

      for (var j = 0; j < frt.length; j++) {
          if (itid === frt[j].itID) {
              aid = j;
              break;
          }
      }

      if (oid === -1) {
          if (frt[aid][col] !== cval) {
              mrkr.classList.add("pending");
              mrkr.classList.remove("updated");
          } else {
              mrkr.classList.add("updated");
              mrkr.classList.remove("pending");
          }
      } else {
          if (ofrt[oid][col] === cval) {
              mrkr.classList.remove("updated");
              mrkr.classList.remove("pending");
          } else {
              if (frt[aid][col] !== cval) {
                  mrkr.classList.add("pending");
                  mrkr.classList.remove("updated");
              } else {
                  mrkr.classList.add("updated");
                  mrkr.classList.remove("pending");
              }
          }
      }
  }
});

  //dropdown add frt line
  var cnAddTds = document.querySelectorAll("#cn_add tr td");

  cnAddTds.forEach(function (td) {
      td.addEventListener("focusin", function () {
          this.parentNode.parentNode.appendChild(document.querySelector('#dd'));
          document.getElementById("dd").classList.remove("hideme");
          document.getElementById("dd").dataset.marker = "NCN";
          ddFrtPop(td.innerHTML);
          event.stopPropagation();
      });
  
      td.addEventListener("keyup", function () {
          ddFrtPop(td.innerHTML);
      });
  });
  
  document.getElementById("slist").addEventListener("click", function (event) {
    event.stopPropagation();
    var fld = "";
    var chg = "";

    Array.from(this.querySelectorAll(".frtLne")).forEach(function (frtLne) {
        frtLne.childNodes.forEach(function (child) {
            fld = child.dataset.marker;
            chg = child.innerHTML;
            document.getElementById("add" + fld).innerHTML = chg;
        });
    });

    document.getElementById("dd").removeAttribute('marker');
    document.getElementById("dd").classList.add("hideme");
    clrDd();
});


  //dropdown address book
 
  document.getElementById("snam").addEventListener("focusin", function (event) {
    this.parentNode.appendChild(document.querySelector('#dd'));
    document.getElementById("dd").classList.remove("hideme");
    document.getElementById("dd").dataset.marker = "s";
    ddPop();
    event.stopPropagation();
});

document.getElementById("snam").addEventListener("keyup", function () {
    this.classList.add("pending");
    document.getElementById("snam").classList.remove("updated");
    updchkr();
    ddPop();
});

document.getElementById("rnam").addEventListener("focusin", function (event) {
  event.stopPropagation();
  this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");
  document.getElementById("dd").dataset.marker = "r";
  ddPop();
});

document.getElementById("rnam").addEventListener("keyup", function () {
  ddPop();
});

document.getElementById("onam").addEventListener("focusin", function (event) {
  event.stopPropagation();
  this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");
  document.getElementById("dd").dataset.marker = "o";
  ddPop();
});

document.getElementById("onam").addEventListener("keyup", function () {
  ddPop();
});

document.querySelectorAll(".cndd").forEach(function (element) {
  element.addEventListener("focus", function () {
      document.getElementById("dd").removeAttribute('marker');
      document.getElementById("dd").classList.add("hideme");
      clrDd();
  });
});

document.getElementById("slist").addEventListener('click', function (event) {
  var target = event.target;

  if (target.classList.contains("addcard")) {
      event.stopPropagation();

      var updstr = "";
      var cno = document.getElementById("cnID").value;
      var fld = "";
      var chg = "";
      var mrkr = document.getElementById("dd").dataset.marker;
      var crd = new Map();

      Array.from(target.children).forEach(function (child) {
          if (!child.classList.contains('add_trash')) {
              fld = mrkr + child.classList[0];
              chg = child.innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
              document.getElementById(fld).value = chg;
              document.getElementById(fld).classList.add("pending");
              document.getElementById(fld + ".updated").classList.remove("updated");
              updchkr();
              crd.set(fld, chg);

              if (chg === "") {
                  updstr += fld + "=Null,";
              } else {
                  updstr += fld + "='" + chg.replace(/\'/g, "''") + "',";
              }
          }
      });

      updstr = updstr.substring(0, (updstr.length - 1));

      if (mrkr === 'd' || mrkr === 'c') {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "/inc/job-dets-upd.php", true);
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  if (xhr.responseText === "success") {
                      crd.forEach(function (value, key) {
                          document.getElementById(key).value = value;
                          document.getElementById(key).classList.add("updated");
                          document.getElementById(key + ".pending").classList.remove("pending");
                      });
                      updchkr();
                  }
              }
          };

          xhr.send("updstr=" + encodeURIComponent(updstr) + "&cno=" + encodeURIComponent(jbn));
      } else {
          cnDetUpd(updstr, cno, crd);
      }

      document.getElementById("dd").removeAttribute('marker');
      document.getElementById("dd").classList.add("hideme");
      clrDd();
  }
});
document.getElementById("slist").addEventListener('click', function (event) {
  var target = event.target;

  if (target.classList.contains("img_trash")) {
      event.stopPropagation();

      var addCard = target.parentElement.parentElement;
      var adBuild = {
          nam: addCard.querySelector(".nam").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
          add1: addCard.querySelector(".add1").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
          add2: addCard.querySelector(".add2").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
          add3: addCard.querySelector(".add3").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
          st: addCard.querySelector(".st").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
          pc: addCard.querySelector(".pc").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
          Ctc: addCard.querySelector(".Ctc").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
          Ph: addCard.querySelector(".Ph").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
      };

      var senBuild = JSON.stringify(adBuild);
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText.indexOf('Error') > -1) {
                  alert('Address Card Removal Error');
              } else {
                  addCard.remove();
              }
          }
      };

      xhr.open("POST", "/inc/adrem.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(senBuild);
  }
});
document.querySelectorAll("input").forEach(function(input) {
  input.addEventListener('keyup', function() {
      if (this.value !== this.getAttribute("value")) {
          document.getElementById(this.id).classList.remove("updated");
          this.classList.add("pending");
      } else {
          document.getElementById(this.id).classList.remove("pending");
      }
      updchkr();
  });
});
//dropdown contacts
document.getElementById("cliContact").addEventListener('focusin', function() {
  this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");
  document.getElementById("dd").dataset.marker = "Jcont";
  ddConPop(this.value);
  event.stopPropagation();
});

document.getElementById("cliContact").addEventListener('keyup', function() {
  ddConPop(this.value);
});

document.getElementById("client").addEventListener('focusin', function() {
  this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");
  document.getElementById("dd").dataset.marker = "client";
  ddConPop(this.value);
  event.stopPropagation();
});

document.getElementById("client").addEventListener('keyup', function() {
  ddConPop(this.value);
});
  //adding a supplier
  document.getElementById("addsup").addEventListener('click', function () {
    var jty = document.querySelector("#asup .supTy").innerText;
    var jna = document.querySelector("#asup .supSu").innerText;
    var jde = document.querySelector("#asup .supDe").innerText;
    var jir = document.querySelector("#asup .supIr").innerText;
    var jno = document.querySelector("#asup .supNo").innerText;
    var jec = document.querySelector("#asup .supEc").innerText;
    var nsup;

    if (jbn === "" || jbn === 0) {
        alert("A job needs to be created for notes to be added - addsup.click");
    } else {
        if (jty === "" && jna === "" && jde === "" && jir === "" && jno === "" && jec === "") {
            alert("Cannot add an all blank entry");
        } else {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.responseText.substring(0, 1) === '<') {
                        alert("Error when trying to add supplier supplier!");
                    } else {
                        nsup = JSON.parse(xhr.responseText);
                        sups.push(nsup[0]);
                        console.log(sups);
                        var txt = '<div class="supln" data-id="' + chknull(nsup[0].jsID) + '"><div contenteditable="true" data-col="jsName" class="supSu lsup updated">' + chknull(nsup[0].jsName) + '</div><div contenteditable="true" data-col="jsType" class="supTy lsup updated">' + chknull(nsup[0].jsType) + '</div><div contenteditable="true" data-col="jsDesc" class="supDe lsup updated">' + chknull(nsup[0].jsDesc) + '</div><div contenteditable="true" data-col="jsEst" class="supEc lsup updated">$' + number_format(chknull(nsup[0].jsEst), 2, '.', ',') + '</div><div contenteditable="true" data-col="jsInvRec" class="supIr lsup updated">' + chknull(nsup[0].jsInvRec) + '</div><div contenteditable="true" data-col="jsNotes" class="supNo lsup updated">' + chknull(nsup[0].jsNotes) + '</div><div class="suprm td" data-id="' + chknull(nsup[0].jsID) + '">Remove Supplier</div></div>';
                        document.getElementById("supbody").insertAdjacentHTML('afterbegin', txt);
                    }
                    document.querySelector("#asup .supTy").innerText = "";
                    document.querySelector("#asup .supSu").innerText = "";
                    document.querySelector("#asup .supDe").innerText = "";
                    document.querySelector("#asup .supIr").innerText = "";
                    document.querySelector("#asup .supNo").innerText = "";
                    document.querySelector("#asup .supEc").innerText = "";
                }
            };

            xhr.open("POST", "/inc/job-sup-add.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("typ=" + jty + "&nam=" + jna + "&des=" + jde + "&ire=" + jir + "&not=" + jno + "&jobno=" + jbn + "&est=" + jec);
        }
    }
});

  //deleting a supplier
  document.getElementById("supbody").addEventListener("click", function (event) {
    if (event.target.classList.contains("suprm")) {
        var nid = event.target.getAttribute("data-id");

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = xhr.responseText;
                    if (data === "success") {
                        sups.forEach(function (val, i) {
                            if (val.jsID == nid) {
                                sups.splice(i, 1);
                            }
                        });

                        var elementToRemove = document.querySelector(".supln[data-id='" + nid + "']");
                        if (elementToRemove) {
                            elementToRemove.remove();
                        }
                    } else {
                        alert("Error in removing supplier");
                        console.log("Variables - " + nid);
                        console.log("Error: " + data);
                    }
                } else {
                    alert("Error in removing supplier");
                    console.log("Variables - " + nid);
                    console.log("Error status: " + xhr.status);
                }
            }
        };

        xhr.open("POST", "/inc/job-sup-rem.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("id=" + nid);
    }
});

  //updating a supplier
  var nodta = "";
  document.getElementById("supbody").addEventListener("focusout", function (event) {
    var target = event.target;
    var isLsup = target.classList.contains("lsup");
    var isSupln = target.parentNode.classList.contains("supln");

    if (isLsup && isSupln) {
        var nid = target.parentNode.getAttribute("data-id");
        var col = target.getAttribute("data-col");
        var nval = target.innerHTML.trim();

        if (col == "jsEst") {
            nval = nval.replace("$", "").replace(",", "");
        }

        var obj = target;
        var chkkr = 1;

        sups.forEach(function (val, i) {
            if (nid == val.jsID) {
                if (val[col] == nval) {
                    chkkr = 0;
                }
            }
        });

        if (chkkr == 1) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var data = xhr.responseText;
                        if (data === "success") {
                            sups.forEach(function (val, i) {
                                if (val.jsID == nid) {
                                    sups[i][col] = nval;
                                    obj.classList.add("updated");
                                    obj.classList.remove("pending");
                                    if (col == "jsEst") {
                                        obj.innerHTML = "$" + number_format(chknull(nval), 2, '.', ',');
                                    }
                                }
                            });

                            osups.forEach(function (val) {
                                if (val.jsID == nid && val[col] == nval) {
                                    obj.classList.remove("updated");
                                }
                            });

                            updchkr();
                        } else {
                            alert("Error in updating");
                            console.log("Variables - " + val + " : " + col + " : " + nid);
                            console.log("Error: " + data);
                        }
                    } else {
                        alert("Error in updating");
                        console.log("Variables - " + val + " : " + col + " : " + nid);
                        console.log("Error status: " + xhr.status);
                    }
                }
            };

            xhr.open("POST", "/inc/job-sup-upd.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("updstr=" + nval + "&ref=" + col + "&cno=" + nid);
        }
    }
});

document.getElementById("supbody").addEventListener("focus", function (event) {
  var target = event.target;
  var isLsup = target.classList.contains("lsup");
  var isSupln = target.parentNode.classList.contains("supln");

  if (isLsup && isSupln) {
      nodta = target.innerHTML.trim();
  }
});

document.getElementById("supbody").addEventListener("keyup", function (event) {
  var target = event.target;
  var isLsup = target.classList.contains("lsup");
  var isSupln = target.parentNode.classList.contains("supln");

  if (isLsup && isSupln) {
      fldupd("sups", target);
  }
});

var jDetInfo = document.querySelectorAll(".j_det_info");

jDetInfo.forEach(function (element) {
    element.addEventListener("focus", function () {
        if (element.id === "client" || element.id === "cliContact") {

        } else {
            document.getElementById("dd").removeAttribute('marker');
            document.getElementById("dd").classList.add("hideme");
            clrDd();
        }
    });
});

document.getElementById("cnam").addEventListener("focusin", function() {
  this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");
  document.getElementById("dd").setAttribute('data-marker', 'c');
  ddPop();
});

document.getElementById("cnam").addEventListener("keyup", function() {
  ddPop();
});

document.getElementById("dnam").addEventListener("focusin", function() {
  this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");
  document.getElementById("dd").setAttribute('data-marker', 'd');
  ddPop();
});

document.getElementById("dnam").addEventListener("keyup", function() {
  ddPop();
});

 
});
