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
let draggedItem = null;
var tag = null;
var card = new Map();
var sncrd = new Map()
var fr = '';
var isRotating = false;
var clrhld;

function urldecoder(str){
  return str.replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'");
}

function numberFormat(number, decimals, decPoint, thousandsSep) {
  number = Number(number).toFixed(decimals);

  var nstr = number.toString();
  nstr += '';
  var x = nstr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? decPoint + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1))
    x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');

  return x1 + x2;
}
function namtTot() {
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
    aheadElement.innerHTML = numberFormat(tots, 2, '.', ',');
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
  if (typeof jbn === 'number' && jbn !== 0) {   
    var jobn = "000000" + jbn;
    document.getElementById("jbnum").innerHTML = jbn;
    document.getElementById("jobnum").innerHTML = "Job - " + jobn.substring(jobn.length - 5);
    upd = "y";
    fr = 'Y';
    jbdu();
    jbsu();
    jbnot();
    jbcon();
    confrt();
    fr = '';
    populateTags();
  } else {
    document.getElementById("jbnum").innerHTML = "New Job";
  }

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
  if (value === null || value === undefined || (typeof value === 'object' && Object.keys(value).length === 0)) {
    return '';
  }
  return value;
}
function jsupupd() {
  const fragment = document.createDocumentFragment(); // Create a document fragment
  //console.log("Sups.length = " + sups.length);
  if (sups.length > 0) {
    sups.forEach(function (val) {
      const jsID = chknull(val.jsID);
      const jsName = chknull(val.jsName);
      const jsType = chknull(val.jsType);
      const jsDesc = chknull(val.jsDesc);
      const jsEst = chknull(val.jsEst);
      const jsInvRec = chknull(val.jsInvRec);
      const jsNotes = chknull(val.jsNotes);

      const txt = `
      <div class="supln" data-id="${jsID}">
        <div contenteditable="true" data-col="jsName" class="supSu lsup">${jsName}</div>
        <div contenteditable="true" data-col="jsType" class="supTy lsup">${jsType}</div>
        <div contenteditable="true" data-col="jsDesc" class="supDe lsup">${jsDesc}</div>
        <div contenteditable="true" data-col="jsEst" class="supEc lsup">$${numberFormat(jsEst, 2, '.', ',')}</div>
        <div contenteditable="true" data-col="jsInvRec" class="supIr lsup">${jsInvRec}</div>
        <div contenteditable="true" data-col="jsNotes" class="supNo lsup">${jsNotes}</div>
        <div class="suprm td" data-id="${jsID}">Remove Supplier</div>
      </div>
    `;

      fragment.appendChild(document.createRange().createContextualFragment(txt)); // Append the HTML to the fragment
    });
  }
  document.getElementById('supbody').appendChild(fragment); // Append the fragment to the DOM
}
function jnotupd() {
  notebody.innerHTML = '';
  if (notes.length > 0) {
    notes.forEach(function (val) {
      /*
      const item = document.createElement('div');
      item.classList.add('draggable-item');
      item.classList.add('tr');
      item.draggable = true;
      item.setAttribute('ondragstart', 'dragStart(event)');
      item.setAttribute('data-id', chknull(val.jnID));
      item.setAttribute('data-ord', chknull(val.jnOrd));
      item.innerHTML = '<div class="drag-handle"><img class="scroll_img" alt="Move Note" src="/img/scroll.png"></div><div contenteditable="true" data-col="jnNote" class="ncol td">' + chknull(val.jnNote) + '</div><div contenteditable="true" data-col="jnAmt" class="namt td">' + numberFormat(chknull(val.jnAmt), 2, '.', ',') + '</div><div class="ntra td"><div class="cmd_img" data-id="' + chknull(val.jnID) + '"><img class="ntrash nbut" alt="Delete Note" src="/img/trash.svg"></div></div>'
      notebody.appendChild(item);
      */
      const item = document.createElement('div');
      item.classList.add('draggable-item');
      item.classList.add('tr');
      item.setAttribute('data-id', chknull(val.jnID));
      item.setAttribute('data-ord', chknull(val.jnOrd));
    
      const dragHandle = document.createElement('div');
      dragHandle.classList.add('drag-handle');
      dragHandle.setAttribute('ondragstart', 'dragStart(event)');
      dragHandle.draggable = true;
    
      const dragImage = document.createElement('img');
      dragImage.classList.add('scroll_img');
      dragImage.alt = 'Move Note';
      dragImage.src = '/img/scroll.png';
    
      dragHandle.appendChild(dragImage);
    
      const noteContent = document.createElement('div');
      noteContent.classList.add('ncol', 'td');
      noteContent.contentEditable = 'true';
      noteContent.setAttribute('data-col', 'jnNote');
      noteContent.innerHTML = chknull(val.jnNote);
    
      const amtContent = document.createElement('div');
      amtContent.classList.add('namt', 'td');
      amtContent.contentEditable = 'true';
      amtContent.setAttribute('data-col', 'jnAmt');
      amtContent.innerHTML = numberFormat(chknull(val.jnAmt), 2, '.', ',');
    
      const trashDiv = document.createElement('div');
      trashDiv.classList.add('ntra', 'td');
    
      const cmdImgDiv = document.createElement('div');
      cmdImgDiv.classList.add('cmd_img');
      cmdImgDiv.setAttribute('data-id', chknull(val.jnID));
    
      const trashImg = document.createElement('img');
      trashImg.classList.add('ntrash', 'nbut');
      trashImg.alt = 'Delete Note';
      trashImg.src = '/img/trash.svg';
    
      cmdImgDiv.appendChild(trashImg);
      trashDiv.appendChild(cmdImgDiv);
    
      item.appendChild(dragHandle);
      item.appendChild(noteContent);
      item.appendChild(amtContent);
      item.appendChild(trashDiv);
    
      notebody.appendChild(item);
    });
  }
  namtTot();
}
function jconupd(data) {
  var contlst = document.getElementById('contlst');
  var fragment = document.createDocumentFragment();  // Use a document fragment for better performance
  if (data.length > 0) {
    data.forEach(function (val) {
      var div = document.createElement('div');
      div.className = 'ccnt_card';
      div.setAttribute('data-id', chknull(val.cnID));
    
      div.innerHTML = `
      <div class="cnnum">${chknull(val.cnNum)}</div>
      <input type="checkbox" class="mcnprnt" name="mprint" value="${chknull(val.cnID)}">
      <div class="cnscomp">${chknull(val.snam)}</div>
      <div class="cnrcomp">${chknull(val.rnam)}</div>
      <div class="cnitm">${chknull(val.titm)} itms</div>
      <div class="cnwgt">${chknull(val.twgt)} kg</div>
      <div class="cnm3">${Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(chknull(val.tcub))} m3
      </div>
    `;
    
      fragment.appendChild(div);  // Append each card to the fragment
    });
  }
  contlst.innerHTML = '';  // Clear existing content if needed
  contlst.appendChild(fragment);  // Append the fragment once to the DOM
}

/*
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
}*/
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
        try {
          jdets = JSON.parse(data);
        } catch (e) { 
          jdets = [];
        }
        if (frdu == 'Y') {
          try {
            ojdets = JSON.parse(JSON.stringify(jdets));
          } catch (e) { 
          ojdets = [];
        }
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
          try {
            sups = JSON.parse(data);
          } catch (e) {
            sups = [];
          }
          if (frsu == 'Y') {
            try {
              osups = JSON.parse(JSON.stringify(sups));
            } catch (e) {
              osups = [];
            }
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
          try {
            notes = JSON.parse(data);
          } catch (e) {
            notes = [];
          }
          if (frnot == 'Y') {
            try {
              onotes = JSON.parse(JSON.stringify(notes));
            } catch (e) {
              onotes = [];
            }
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
  //console.log("jbn=" + jbn + "&indi=" + ind);
  xhr.send("jbn=" + jbn + "&indi=" + ind);
}
async function jbcon() {
  var ind = "con";
  var frcon = fr;
  const localUpd = upd;
  let newCnotData = null;  // Declare a local variable for new data
  try {
    const response = await fetch("/inc/job-init.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      
      body: new URLSearchParams({
        jbn: jbn,  // Assuming jbn is a global or available in this scope
        indi: ind,
      }),
    });
    if (!response.ok) {
      console.error(`Failure Con-note - ${jbn}`);
      console.error(`Error: ${response.statusText}`);
      return;
    }

    const data = await response.text();
    if (data.startsWith('<')) {
      document.getElementById('coll').insertAdjacentHTML('beforeend', data);
    } else {
      newCnotData = JSON.parse(data);  // Parse the JSON into the local variable
      try {
        cnot = JSON.parse(JSON.stringify(newCnotData));
      } catch (e) {
        cnot = [];
      }
      // If frcon is 'Y', create a deep copy of newCnotData into ocnot
      if (frcon === 'Y') {
        try {
          ocnot = JSON.parse(JSON.stringify(newCnotData));
        } catch (e) {
          ocnot = [];
        }
      }
      // Call jconupd with the locally stored new data
      if (localUpd === "y") {
        jconupd(newCnotData);  // Pass only the new data to jconupd
      }
    }
  } catch (error) {
    console.error("Error in making the request:", error);
  }
}

/*
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
}*/
function confrt(callback) {
  return new Promise((resolve, reject) => {
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
            try {
              frt = JSON.parse(data);
            } catch (e) {
              frt = [];
            }
            if (frfr == 'Y') {
              try {
                ofrt = JSON.parse(JSON.stringify(frt));
              } catch (e) {
                ofrt = [];
              }
            }
          }
          if (callback) callback(null, xhr);
          resolve(xhr);
        } else {
          console.log("Failure Freight - " + jbn);
          console.log("Error: " + xhr.responseText);
          console.log(xhr);
          if (callback) callback(new Error("Failed to complete confrt."));
          reject(new Error("Failed to complete confrt."));
        }
      }
    };

    xhr.onerror = function () {
      console.log("Error in making the request.");
      if (callback) callback(new Error("Error in making the request."));
      reject(new Error("Error in making the request."));
    };

    xhr.send("jbn=" + jbn + "&indi=" + ind);
  });
}
function conDetUpd() {
    var tQty = 0;
    var tWgt = 0;
    var tM3 = 0;
  
    document.querySelectorAll('#cnt_body tr').forEach(function (row) {
      if (row.getAttribute("data-id") !== "no") {
        var len = parseCell(row, 'itLen');
        var wid = parseCell(row, 'itWid');
        var hei = parseCell(row, 'itHei');
        var qty = parseCell(row, 'itQty');
        var noItemValue = parseCell(row, 'noItem');
        var itWgtValue = parseCell(row, 'itWgt');
  
        // Check if values are numeric before adding
        if (!isNaN(noItemValue)) {
          tQty += parseFloat(noItemValue);
        }
        if (!isNaN(itWgtValue)) {
          tWgt += parseFloat(itWgtValue);
        }
  
        // Check if all dimension values are numeric before adding
        if (!isNaN(len) && !isNaN(wid) && !isNaN(hei) && !isNaN(qty)) {
          tM3 += len * wid * hei * qty / 1000000;
        }
      }
    });
  
    document.getElementById('cn_titm').innerHTML = numberFormat(tQty, 0, '.', ',');
    document.getElementById('cn_twgt').innerHTML = numberFormat(tWgt, 1, '.', ',') + " kg";
    document.getElementById('cn_m3').innerHTML = numberFormat(tM3, 3, '.', ',') + " m3";
}
function parseCell(row, dataCol) {
  var cell = row.querySelector(`td[data-col="${dataCol}"]`);
  var cellValue = cell ? parseFloat(cell.innerHTML.replace(/,/g, '')) : NaN;
  return isNaN(cellValue) ? 0 : cellValue;
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
function addbkpop() {
  clrDd();
  var stxt;

  if (document.getElementById("dd").dataset.marker.includes('_')) {
    stxt = document.getElementById(document.getElementById("dd").dataset.marker + "name").value;
  } else {
    stxt = document.getElementById(document.getElementById("dd").dataset.marker + "nam").value;
  }


  if (stxt.length < 3) {
    document.querySelector(".ddbrtxt").innerHTML = "Please enter more letters";
    document.querySelector(".load-3").classList.remove("hideme");
  } else {
    document.querySelector(".ddbrtxt").innerHTML = "Getting Addresses";
    document.querySelector(".load-3").classList.remove("hideme");

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

    document.querySelector(".ddbrtxt").innerHTML = "Addresses Book Suggestions";
    
    document.querySelector(".load-3").classList.add("hideme");
  }
}
function ddConPop(val) {
  clrDd();
  var stxt = val;
  /*console.log(stxt);*/
  if (stxt.length < 2) {
    document.querySelector(".ddbrtxt").innerHTML = "Please enter more letters";
    document.querySelector(".load-3").classList.remove("hideme");
  } else {
    var endpoint = '';
    var marker = document.getElementById("dd").dataset.marker;

    if (marker == 'Jcont') {
      endpoint = "/inc/contbklst.php";
      document.querySelector(".ddbrtxt").innerHTML = "Getting Contacts";
    } else if (marker == 'client') {
      endpoint = "/inc/clientbklst.php";
      document.querySelector(".ddbrtxt").innerHTML = "Getting Clients";
    } else {
      document.querySelector(".ddbrtxt").innerHTML = "Contacting Server";
    }

    document.querySelector(".load-3").classList.remove("hideme");
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
      //console.log(data);
      document.getElementById("slist").innerHTML = data;
    })
    .catch(error => {
      console.log("Error:", error);
    })
    .finally(() => {
      document.querySelector(".ddbrtxt").innerHTML = "Addresses Book Suggestions";
      document.querySelector(".load-3").classList.add("hideme");
      
    });
  }
}
function ddCoPop(val) {
  clrDd();
  var stxt = val;

  if (stxt.length < 2) {
    document.querySelector(".ddbrtxt").innerHTML = "Please enter more letters";
    document.querySelector(".load-3").classList.remove("hideme");
  } else {
    var endpoint = '';
    var marker = document.getElementById("dd").dataset.marker;
    

    if (marker == 'Jcont') {
      endpoint = "/inc/contbklst.php";
      document.querySelector(".ddbrtxt").innerHTML = "Getting Contacts";
    } else if (marker == 'client') {
      endpoint = "/inc/ddpop.php";
      document.querySelector(".ddbrtxt").innerHTML = "Getting Clients";
    } else {
      document.querySelector(".ddbrtxt").innerHTML = "Contacting Server";
    }

    document.querySelector(".load-3").classList.remove("hideme");

    // Get data from Server
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'stxt=' + encodeURIComponent(stxt) + '&mrkr=' + marker,
    })
    .then(response => response.text())
    .then(data => {
      const rtrn = JSON.parse(data);

    // Check if the first row starts with 'Error'
    if (rtrn.length > 0 && !rtrn[0].clientName.startsWith('Error')) {
      // Get the container div
      
        const slistDiv = document.getElementById('slist');

      // Iterate through each row in the data
        
        rtrn.forEach(row => {

            if (marker == 'Jcont') {
            } else if (marker == 'client') {
            
            // Create the container div element
            const cliDIV = document.createElement('div');
            cliDIV.className = 'clicard';
              cliDIV.addEventListener('click', () => {
                console.log("Event flag");
              climkr = 1;
            });
      

            // Create and append child div elements for each row property
            const lstcliDiv = document.createElement('div');
            lstcliDiv.className = 'lstcli';
            lstcliDiv.textContent = row.clientName;
            cliDIV.appendChild(lstcliDiv);

            const lstcontDiv = document.createElement('div');
            lstcontDiv.className = 'lstcont';
            lstcontDiv.textContent = row.contd;
            cliDIV.appendChild(lstcontDiv);

            const lstcphDiv = document.createElement('div');
            lstcphDiv.className = 'lstcph';
            lstcphDiv.textContent = row.contPh;
            cliDIV.appendChild(lstcphDiv);

            const lstctcDiv = document.createElement('div');
            lstctcDiv.className = 'lstctc';
            lstctcDiv.textContent = row.contEm;
            cliDIV.appendChild(lstctcDiv);

            const lstctc2Div = document.createElement('div');
            lstctc2Div.className = 'lstctc2';
            lstctc2Div.textContent = row.contEm2;
            cliDIV.appendChild(lstctc2Div);

            const trashbutt = document.createElement('div');
            trashbutt.className = 'add_trash';

            const imgTrash = document.createElement('img');
            imgTrash.className = 'img_trash';
            imgTrash.alt = 'Delete Address';
            imgTrash.src = '/img/trash.svg';
            trashbutt.appendChild(imgTrash);

            cliDIV.appendChild(trashbutt);

            // Append the container div to the slist div
            slistDiv.appendChild(cliDIV);
      }});
    }})
    .catch(error => {
      console.log("Error:", error);
    })
    .finally(() => {
      document.querySelector(".ddbrtxt").innerHTML = "Addresses Book Suggestions";
      document.querySelector(".load-3").classList.add("hideme");
      
    });
  }
}
function ddTagPop(val) {
  const inputField = document.getElementById('tag-input'); 
  let query = val.trim(); 

  
  if (query === '') {
    query = null;
  }
  
  const fetchUrl = `/inc/jtags.php?action=list&detail=${encodeURIComponent(query)}&job=${jbn}`;
  // AJAX request to jtags.php
  fetch(fetchUrl)
    .then(response => {
      //console.log('Raw Response: ', response); // Log the raw response object
      return response.json();
    })
    .then(data => {
      //console.log('Parsed JSON Response: ', data); // Log the parsed JSON response

      const dropdown = document.getElementById('slist'); // Get the slist element inside dd
      dropdown.innerHTML = ''; // Clear any existing content

      if (data.tags && data.tags.length > 0) {
        // Loop through the array and create the necessary divs
        data.tags.forEach(tag => {
          const tagCard = document.createElement('div');
          tagCard.className = 'tagcard'; // Apply the tagcard class for styling

          const tagDets = document.createElement('div');
          tagDets.className = 'tagdets lstNam'; // Apply both tagdets and lstNam classes for styling
          tagDets.textContent = tag; // Set the tag name

          // Create the trash icon div (formatted with tag_trash)
          const trashDiv = document.createElement('div');
          trashDiv.className = 'add_trash'; // Similar to the original
          const trashImg = document.createElement('img');
          trashImg.className = 'img_trash tag_trash'; // Set the class to tag_trash for hiding functionality
          trashImg.src = '/img/trash.svg'; // Path to the trash icon
          trashImg.alt = 'Delete Tag';


          // Append the trash image to the trash div
          trashDiv.appendChild(trashImg);

          // Append the tagdets and trash div inside tagcard
          tagCard.appendChild(tagDets);
          tagCard.appendChild(trashDiv);

          // Append tagcard into the slist div
          dropdown.appendChild(tagCard);
        });

        // dropdown.style.display = 'block'; // Make sure the dropdown is visible
      } else {
        console.log('No tags found.'); // Log when no tags are returned
        // dropdown.style.display = 'none'; // Optionally hide the dropdown
      }
    })
    .catch(error => {
      console.error('Error fetching tags:', error);
    });
}
function convertToObject(data) {
  let result;

  // Check if it's a Map
  if (data instanceof Map) {
    result = {};
    data.forEach((value, key) => {
      result[key] = value;
    });
  }
  // Check if it's a JSON string
  else if (typeof data === 'string') {
    try {
      result = JSON.parse(data);
    } catch (error) {
      // Handle parsing error
      console.error('Error parsing JSON string:', error);
      result = null;
    }
  }
  // Check if it's an Object
  else if (data !== null && typeof data === 'object' && !Array.isArray(data)) {
    result = data;
  }
  // Handle other cases or return null for unsupported types
  else {
    console.error('Unsupported data type:', data);
    result = null;
  }

  return result;
}
function sendUpdate(id,ori,upd) {
  const sndata = new Map();
  sndata.set('id', id);
  sndata.set('ori', ori);
  sndata.set('Data', convertToObject(upd));

  fetch("/inc/blkupd.php", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'lnk=' + encodeURIComponent(JSON.stringify(Object.fromEntries(sndata))),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to Update note');
    }
    return response.text();
  })
  .then((data, status) => {
    if (data === 'success') {
      let actref = [];
      let oactref = [];
      var idvar;
      const nonkeys = ['hl'];
      //determine reference array from ori
      if (ori === 'jobDetails') {
        actref = jdets;
        oactref = ojdets;
        idvar = 'jobID';
      } else if (ori === 'jobNotes') {
        actref = notes;
        oactref = onotes;
        idvar = 'jnID';
      } else if (ori === 'jobSupplier') {
        actref = sups;
        oactref = osups;
        idvar = 'jsID';
      } else if (ori === 'conDetails') {
        actref = frt;
        oactref = ofrt;
        idvar = 'itID';
      } else if (ori === 'conNote') {
        actref = cnot;
        oactref = ocnot;
        idvar = 'cnID';
      } else {
        alert('Error: Unknown Origin reference - ' + ori)
        exit
      }
      //match id in reference array 
      var oin = -1;
      oactref.forEach((val, i) => {
        if (val[idvar] === id) {
          oin = i;
          return false;
        }
      });
      //check key value pairs within form and adjust depending on match to reference array
      for (const [key, value] of Object.entries(convertToObject(upd))) {
        if (key === idvar) {
        } else if (nonkeys.includes(key)) {
          //special key operations
        } else {
        let element = document.getElementById(key);

        element.classList.remove('pending');

        if (oin === -1 || chknull(oactref[oin][key]) !== value) {
          element.value = value;
          element.classList.add('updated');
        } else {
          element.classList.remove('updated');
        }

        updchkr();
      }
      actref[actcn][key] = value;
      }
    } else {
      alert('Error in updating');
      console.log('Variables - ' + id +' - ' + ori + ' - ' + upd);
    }
  })
  .catch(error => {
    alert('Error in updating');
    console.log('Error: ' + error);
    console.log('Variables - ' + id +' - ' + ori + ' - ' + upd);
  });
}
function cnDetUpd_old(cno, upd) {
  console.log('cndetupd');
  const nupd = convertToObject(upd);
  fetch("/inc/job-conn-upd.php", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'updstr=' + encodeURIComponent(JSON.stringify(nupd)) + '&cno=' + encodeURIComponent(cno),
  })
  .then(response => response.text())
  .then((data, status) => {
    console.log(data);
    if (data === 'success') {

      var oin = -1;
      ocnot.forEach((val, i) => {
        if (val.cnID === cno) {
          oin = i;
          return false;
        }
      });
      for (const [key, value] of Object.entries(nupd)) {
        if (key === 'hl') {
        } else {
        const element = document.getElementById(key);

        element.classList.remove('pending');

        if (oin === -1 || chknull(ocnot[oin][key]) !== value) {
          element.value = value;
          element.classList.add('updated');
        } else {
          element.classList.remove('updated');
        }

        updchkr();
      }
        cnot[actcn][key] = value;
      }
    } else {
      alert('Error in updating');
      console.log('Variables - ' + cno);
      console.log(upd);
    }
  })
  .catch(error => {
    alert('Error in updating');
    console.log('Error: ' + error);
    console.log('Variables - ' + cno);
    console.log(upd);
  });
}
function ddFrtPop(val) {
  
  clrDd();
  var stxt = val;

  if (stxt.length < 3) {
    document.querySelector(".ddbrtxt").innerHTML = "Please enter more letters";
    document.querySelector(".load-3").classList.remove("hideme");
  } else {
    document.querySelector(".ddbrtxt").innerHTML = "Getting Suggestions";
    document.querySelector(".load-3").classList.remove("hideme");

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
      document.getElementById("slist").innerHTML = data;
    })
    .catch(error => {
      console.log("Error: " + error);
    })
    .finally(() => {
      document.querySelector(".ddbrtxt").innerHTML = "Freight Suggestions";
      document.querySelector(".load-3").classList.add("hideme");
      
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
  if (frt.length > 0) {
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
        row.innerHTML = '<td contenteditable="true" id="senRef" data-col="senRef" class="senRef">' + (val.senRef !== null ? val.senRef : '') + '</td>' +
          '<td contenteditable="true" id="noItem" data-col="noItem" class="noItem">' + (val.noItem !== null ? val.noItem : '') + '</td>' +
          '<td contenteditable="true" id="psn" data-col="psn" class="psn">' + (val.psn !== null ? val.psn : '') + '</td>' +
          '<td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt">' + (val.itWgt !== null ? val.itWgt : '') + '</td>' +
          '<td contenteditable="true" id="itLen" data-col="itLen" class="itLen">' + (val.itLen !== null ? val.itLen : '') + '</td>' +
          '<td contenteditable="true" id="itWid" data-col="itWid" class="itWid">' + (val.itWid !== null ? val.itWid : '') + '</td>' +
          '<td contenteditable="true" id="itHei" data-col="itHei" class="itHei">' + (val.itHei !== null ? val.itHei : '') + '</td>' +
          '<td contenteditable="true" id="itQty" data-col="itQty" class="itQty">' + (val.itQty !== null ? val.itQty : '') + '</td>' +
          '<td contenteditable="true" id="unNum" data-col="unNum" class="unNum">' + (val.unNum !== null ? val.unNum : '') + '</td>' +
          '<td contenteditable="true" id="class" data-col="class" class="class">' + (val.class !== null ? val.class : '') + '</td>' +
          '<td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk">' + (val.sRisk !== null ? val.sRisk : '') + '</td>' +
          '<td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr">' + (val.pkGr !== null ? val.pkGr : '') + '</td>' +
          '<td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes">' + (val.pkDes !== null ? val.pkDes : '') + '</td>' +
          '<td class="cn_ctrls" data-col="cmd"><div class="cmd_img"><img class="cntrash" class="cnbut" alt="Delete Freight Note Line" src="/img/trash.svg"></div></td></tr>';
        cntBody.appendChild(row);

        var rows = cntBody.querySelectorAll('tr[data-id="' + val.itID + '"]');
        rows.forEach(function (row) {
          var cells = row.querySelectorAll('td[id]');
          cells.forEach(function (cell) {
            if (oind == -1) {
              cell.classList.add('updated');
            } else {
              if (cell.innerHTML != (ofrt[oind][cell.getAttribute('data-col')] !== null ? ofrt[oind][cell.getAttribute('data-col')] : '')) {
                cell.classList.add('updated');
              }
            }
          });
        });
      }
    });
  }

  if (pauseReq) {
    pauseReq = false;
  }
  conDetUpd();
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
        if (val.hasOwnProperty(k)) {
        if (k == "Pb") {
          if (val[k] != null) {
            document.getElementById(val[k]).checked = true;
          }
        } else if (k == "jobID") {

        } else if (k == "hl") {
          if (val[k] != null) {
            var checkboxes = document.querySelectorAll('.hli');
            checkboxes.forEach(function(checkbox) {
                var dataPoint = checkbox.getAttribute('data-point');
                // Check if the data-point value exists in val[k]
                if (val[k].includes(dataPoint)) {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
            });
          }
        } else {
          var element = document.getElementById(k);
          if (element) {
            element.value = (chknull(val[k]) !== null ? chknull(val[k]) : '');
            element.setAttribute('value', (chknull(val[k]) !== null ? chknull(val[k]) : ''));
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
        } else {
          
        }
        }
      }
    }
    }
  });

  frtload(cno);
  document.getElementById('boscr').classList.remove('hideme');
}
function clich(client, msg) {
    return new Promise((resolve, reject) => {
        var updclient = encodeURIComponent(client);
        fetch("/inc/job-cli-ch.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "client=" + updclient + "&jobno=" + jbn,
        }).then(response => response.text()).then(data => {
            document.getElementById("jbnum").innerHTML = data;
            jbn = Number(data) || 0;
            insertJob = ("000000" + data).slice(-5);
            document.getElementById("jobnum").innerHTML = "Job Specific Information - " + insertJob;
            document.getElementById('client').classList.remove("pending");
            document.getElementById('client').value = client;
            document.getElementById('client').classList.add("updated");
            updchkr();
            resolve(); // Resolve the Promise once the task is complete
        }).catch(error => {
            console.error('Error:', error);
            reject(error); // Reject the Promise if there's an error
        });
    });
}
//Dragging Note items
function dragStart(event) {
  // Find the closest ancestor with the class 'draggable-item'
  draggedItem = event.target.closest('.draggable-item');

  if (draggedItem) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', draggedItem.innerHTML);

    // Set a custom drag image
    const dragImage = document.createElement('div');
    dragImage.classList.add('custom-drag-image');

    // Copy styles from the original .draggable-item to the dragImage
    const computedStyles = window.getComputedStyle(draggedItem);
    for (const prop of computedStyles) {
      dragImage.style[prop] = computedStyles[prop];
    }

    dragImage.innerHTML = draggedItem.innerHTML;

    document.body.appendChild(dragImage);
    event.dataTransfer.setDragImage(dragImage, 0, 0);

    // Remove the drag image element after the drag operation
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  }
}
function allowDrop(event) {
  event.preventDefault();
}
function drop(event) {
  event.preventDefault();
  const target = event.target.closest('.draggable-item');
  if (draggedItem && notebody) {
    if (target) {
      notebody.insertBefore(draggedItem, target);
    } else {
      notebody.appendChild(draggedItem);
    }
    draggedItem = null;
    logOrderChange();
  }
}
function logOrderChange() {
  const items = document.querySelectorAll('.draggable-item');
  const newOrder = Array.from(items).map(item => item.getAttribute('data-id')).join('|');

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/inc/job-not-ordch.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        console.log("Order change response:", xhr.responseText);
      } else {
        console.error("Error in upddating reordering:", xhr.status, xhr.responseText);
      }
    }
  };

  xhr.onerror = function () {
    console.error("Error in making the request.");
  };
  const requestBody = `nord=${newOrder}&job=${jbn}`;
  xhr.send(requestBody);

  console.log('Order Changed:', newOrder);
}
function handleClick(event) {
  // Handle click on the drag handle
  event.stopPropagation();
}
function hlChange(){
  var cno = document.getElementById("cnID").value;
  var crd = new Map();
  const checkboxes = document.querySelectorAll('.hli');
  // String to store checked data-ids
  let checkedIdsString = "";
  // Loop through each checkbox
  checkboxes.forEach(function(checkbox) {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // If checked, add its data-id to the string
      checkedIdsString += checkbox.getAttribute('data-point');
    }
  });
  // Compile map of data
  crd.set("hl", checkedIdsString);
  //update server
  sendUpdate(cno,'conNote', crd);
}
function jobupd(scrd, crd) {
  fetch("/inc/job-dets-upd.php", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    
    body: "updstr=" + encodeURIComponent(JSON.stringify(Object.fromEntries(scrd))) + "&cno=" + jbn,
      
    }).then(response => response.text()).then(data => {
      if (data == "success") {
        for (let [key, value] of crd) {
          document.getElementById(key).classList.remove("pending");
          document.getElementById(key).value = value;
          document.getElementById(key).classList.add("updated");
        }
        updchkr();
        card.clear();
      } else {
        alert(data);
      }
    }).catch(error => {
      console.error('Error:', error);
    });
    sncrd.clear();
}
function updDvH(id) {
  var div = document.getElementById(id); // Replace 'dd' with your div's ID
  var divTop = div.getBoundingClientRect().top; // Get the top position relative to the viewport
  var windowHeight = window.innerHeight; // Get the viewport height
  var newHeight = windowHeight - divTop - 10; // Calculate the new height
  div.style.maxHeight = newHeight + 'px'; // Set the new height
}
async function processConnote(njn, cno, ncnum) {
  try {
    await confrt(); // Call confrt without parameters
    clrcnt();
    ccntLoad(njn);
    const oricnt = [];
    const cpycnt = [];

    if (frt.length > 0) {
      oricnt = frt.filter(item => item.cnID == cno);
      cpycnt = frt.filter(item => item.cnID == njn);
    }

    /*console.log(`${cno} - ${njn}`);
    console.log(oricnt, cpycnt);
    console.log(frt);
    console.log(`Connote ${ncnum} is ready for use, \nnote that an error has been detected in the freight line count.\nPlease reload the con-note and advise the developer.\n Original has ${oricnt.length} rows\nCopied has ${cpycnt.length} rows`);*/
    if (oricnt.length === cpycnt.length) {
      alert(`Connote ${ncnum} is ready for use`);
    } else {
      alert(`Connote ${ncnum} is ready for use, \nnote that an error has been detected in the freight line count.\nPlease reload the con-note and advise the developer.\n Original has ${oricnt.length} rows\nCopied has ${cpycnt.length} rows`);
    }
  } catch (error) {
    alert(`Connote copy has generated an error please advise to developer: `,error);
    console.error("An error occurred during the process:", error);
  }
}
function clrcnt() {
  document.querySelectorAll('.radios').forEach(function (radio) {
    radio.checked = false;
  });
  var checkboxes = document.querySelectorAll('.hli');
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });
  document.querySelectorAll('#cn-frame input').forEach(function (input) {
    if (input.type === 'radio') {
      // Handling radio buttons if needed
    } else {
      input.value = '';
      input.classList.remove('updated');
      input.classList.remove('pending');
    }
  });
}
function cn_close() {
  var upd2 = upd;
  startRotation();
  upd = "y";
  document.getElementById("contlst").innerHTML = "";
  jbcon();
  confrt();
  document.getElementById('boscr').classList.add('hideme');
  stopRotation();
  upd = upd2;
  
}
// Function to display the input form
function showTagInput() {
  positionDropdown()
  const dd = document.getElementById('dd');
  if (dd) {
      dd.classList.add('ddTag');
      dd.dataset.marker = "TAG";
    document.querySelector(".ddbrtxt").innerHTML = "Tag Suggestions";
    document.getElementById('slist').innerHTML = '';
      ddTagPop("");
  } 
}

// Function to position the dd element below the focused input field
function positionDropdown() {
  const ddElement = document.getElementById('dd');
  const inputField = document.activeElement.parentElement; // The input field triggering the dropdown
  if (inputField && ddElement) {
      // Get the position of the input field relative to the viewport
      const rect = inputField.getBoundingClientRect();
      const wrap = ddElement.parentElement.getBoundingClientRect();

      // Calculate the top and left positions relative to the browser window
      const top = rect.top + window.scrollY + rect.height - wrap.top; // Align just below the input
      const left = rect.left + window.scrollX - wrap.left;
      // Update the position of the dd element
      ddElement.style.position = 'absolute';
      ddElement.style.top = `${top}px`;
      ddElement.style.left = `${left}px`;
      ddElement.style.width = `${rect.width}px`; // Optionally match the width of the input field
      ddElement.style.display = 'block'; // Make sure it's visible
      const divTop = ddElement.getBoundingClientRect().top; // Get the top position relative to the viewport
      const windowHeight = window.innerHeight; // Get the viewport height
      const newHeight = windowHeight - divTop - 5; // Calculate the new height with 10px padding from the bottom
      //ddElement.style.maxHeight = newHeight + 'px'; // Set the new max height to prevent overflow
      ddElement.style.maxHeight = newHeight + 'px'; // Set the new max height to prevent overflow
      ddElement.style.overflowY = 'auto'; // Enable scrolling if content exceeds max height
      ddElement.classList.remove('hideme');
      
  }
}
// Function to realign the dropdown when the window is resized or scrolled
function realignDropdown() {
  const ddElement = document.getElementById('dd');
  if (ddElement.style.display === 'block') {
      positionDropdown(); // Recalculate position if dropdown is visible
  }
}
// Function to clear the input field
function clearTagInput() {
  document.getElementById('tag-input').value = '';
}
// Function to handle the "Add" button click
async function addNewTag(ntv) {
  console.log(ntv);
  const tagValue = ntv.trim();
  console.log(tagValue);
  if (tagValue) {
      try {
          // Construct the URL with query parameters
          const url = `/inc/jtags.php?job=${encodeURIComponent(jbn)}&action=add&detail=${encodeURIComponent(tagValue)}`;
        console.log(url);
          // Send the request as a GET request with query parameters
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              }
          });

          // Check for response status
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

          const data = await response.json();

          // Handle the response from the server
          if (data.success) {
              // Append the new tag to the tags container (if needed)
              addTagToList(tagValue);
          } else {
              console.error('Error adding tag:', data.error);
          }

      } catch (error) {
          console.error('Failed to add tag:', error);
      }

      // Clear the input after adding the tag
      clearTagInput();
  } else {
      alert('Please enter a tag before adding.');
  }
}
function addTagToList(tagValue) {
  // Create the tag HTML
  const tagHtml = `
      <div class="tag" onclick="removeTag(this)">
          ${tagValue}

      </div>
  `;
  
  // Find the container to append the tag to
  const tagContainer = document.querySelector('#jd-tags .cont');

  // Append the new tag
  if (tagContainer) {
      tagContainer.insertAdjacentHTML('beforeend', tagHtml);
  }
}
// Function to retrieve tags and add them to the list
function populateTags() {
  // URL to the jtags.php with the retrieve action
  const url = `/inc/jtags.php?job=${jbn}&action=retrieve`;
  //console.log(url);
  // Make an AJAX request to retrieve the tags
  fetch(url)
  .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    if (data.tags && Array.isArray(data.tags)) {
        // Loop through each tag and add it to the list
        data.tags.forEach(tag => {
            addTagToList(tag);
        });
    } else {
        console.error('Invalid data format:', data);
    }
})
.catch(error => console.error('Error fetching tags:', error));
}
// Function to remove a tag from the DOM
async function removeTag(element) {
  // Get the tag value (internal HTML or text content)
  const tagValue = element.innerHTML.trim(); // Adjust depending on how the tag value is stored
  // Remove the element from the UI
  try {
      // Construct the URL for the remove action
      const url = `/inc/jtags.php?job=${encodeURIComponent(jbn)}&action=remove&detail=${encodeURIComponent(tagValue)}`;

      // Send the request to jtags.php to remove the tag from the server
      const response = await fetch(url, {
          method: 'GET', // Use GET since the PHP file expects the parameters in the URL
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          }
      });

      // Check for response status
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      // Handle the response from the server
      if (data.success) {
          element.remove();
      } else {
          console.error('Error removing tag:', data.error);
      }

  } catch (error) {
      console.error('Failed to remove tag:', error);
  }
}
function ddclr() {
  //console.log('ddclr');
  const dd = document.getElementById('dd');
  dd.removeAttribute('marker');
  dd.classList.add('hideme');
  dd.classList.remove('ddTag');
  document.getElementById('tag-input-form').style.display = 'none';
}
function displayAllVersions() {
  // Create a Set to avoid duplicates
  const versionInfoSet = new Set();

  // Function to process an element (script, link, etc.)
  function processElement(element, attribute) {
    const urlValue = element.getAttribute(attribute);

    if (urlValue && urlValue.includes('?ver=')) {
      // Create a URL object to parse the URL
      const url = new URL(urlValue, window.location.origin);

      // Extract the 'ver' parameter
      const version = url.searchParams.get('ver');

      // Extract the file name and extension
      const pathname = url.pathname;
      const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);
      const extensionMatch = fileName.match(/\.(\w+)$/);

      if (extensionMatch && version) {
        const extension = extensionMatch[1];
        const label = extension.substring(0, 2).toLowerCase();

        // Prepare the version info object
        const versionInfo = { label, version };

        // Add to the Set to avoid duplicates
        versionInfoSet.add(JSON.stringify(versionInfo)); // Use JSON stringification for Set storage
      }
    }
  }

  // Get all script elements
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    processElement(scripts[i], 'src');
  }

  // Get all link elements
  const links = document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) {
    processElement(links[i], 'href');
  }

  // If there are any version infos, display them
  if (versionInfoSet.size > 0) {
    // Create a div element
    const versionDiv = document.createElement('div');
    versionDiv.id = 'version-display';

    // Style the div
    versionDiv.style.position = 'fixed';
    versionDiv.style.bottom = '2px';
    versionDiv.style.right = '2px';
    versionDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    versionDiv.style.color = '#fff';
    versionDiv.style.padding = '2px 2px';
    versionDiv.style.borderRadius = '5px';
    versionDiv.style.fontSize = '12px';
    versionDiv.style.zIndex = '1000';
    versionDiv.style.lineHeight = '1.5';
    //versionDiv.style.cursor = 'pointer'; // Indicate that it's interactive

    // Create a fragment to hold the lines
    const fragment = document.createDocumentFragment();

    // Variables to store the js line and other lines
    let jsLine = null;
    const otherLines = [];

    // Add each version info on a new line using <span> elements
    versionInfoSet.forEach((infoStr) => {
      const info = JSON.parse(infoStr);
      const { label, version } = info;

      const line = document.createElement('span');
      line.textContent = `${label}: ${version}`;
      line.style.display = 'block'; // Make each <span> start on a new line
      line.style.fontSize = 'inherit'; // Ensure font size is inherited

      if (label === 'js') {
        jsLine = line;
      } else {
        line.style.display = 'none'; // Hide other lines initially
        otherLines.push(line);
      }

      fragment.appendChild(line);
    });

    // If jsLine is not found, but there are other lines, pick the first one to display
    if (!jsLine && otherLines.length > 0) {
      jsLine = otherLines.shift();
      jsLine.style.display = 'block'; // Ensure it's visible
    }

    // Append the fragment to the versionDiv
    versionDiv.appendChild(fragment);

    // Add mouseover and mouseout event listeners
    versionDiv.addEventListener('mouseover', () => {
      otherLines.forEach((line) => {
        line.style.display = 'block';
      });
    });

    versionDiv.addEventListener('mouseout', () => {
      otherLines.forEach((line) => {
        line.style.display = 'none';
      });
    });

    // Append the div to the body
    document.body.appendChild(versionDiv);
  } else {
    console.log('No files with ?ver parameter found.');
  }
}
async function hideTag(tagCard) {
  // Get the tag details from the tagCard div (assuming the tag text is inside the div)
  const tagValue = tagCard.querySelector('.tagdets').textContent.trim();
  
  if (!tagValue) {
      console.error("Tag is missing");
      return;
  }
  // Construct the URL with query parameters for the hide action
  const url = `/inc/jtags.php?action=hide&detail=${encodeURIComponent(tagValue)}&job=${jbn}`;
  
  console.log(`Hiding tag: ${tagValue}`);
  
  try {
    // Send the GET request to hide the tag on the server
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    // Log the raw response for debugging
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        // Parse the response as JSON only if the content type is JSON
        const data = await response.json();

        if (data.success) {
            console.log(`Tag ${tagValue} successfully hidden.`);
            tagCard.remove(); // Remove the tagCard div from the UI
        } else {
            console.error('Error hiding tag:', data.error);
        }
    } else {
        // If it's not JSON, log the text response
        const errorText = await response.text();
        console.error('Unexpected response format:', errorText);
    }

} catch (error) {
    console.error('Failed to hide tag:', error);
}
}
function startRotation() {
  const rcn = document.getElementById('rcn');
  if (!isRotating) {
      rcn.classList.add('rotate');  // Start rotation
      isRotating = true;
  }
}

function stopRotation() {
  const rcn = document.getElementById('rcn');
  if (isRotating) {
      rcn.classList.remove('rotate');  // Stop rotation
      rcn.style.transform = 'rotate(0deg)';  // Reset to original position
      isRotating = false;
  }
}


//----------------------------------------------------------------Clean up whole function to create card of required changes then one send run.
document.addEventListener('DOMContentLoaded', function () {

  //console.log(window.location.href);
  window.addEventListener('popstate', function(event) {
    console.log('pop');
  });
  const notebody = document.getElementById('notebody');
  actcn = null;
  climkr = 0;
  clrhld = 0;
  //jbn = 0;
  jbn = Number(getSearchParams("job_no")) || 0;
  firstpop();
  namtTot();
  updchkr();
  displayAllVersions();

  document.getElementById("cl-job").addEventListener('click', function (event) {
    var userResponse = confirm("This will clean all data from the job. All data will be removed and a clean job sheet will remain.\n \n Would you like to continue?");
    if (userResponse) {
      // update job to clear all data.
      if (typeof jbn !== 'undefined' && jbn != 0) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                if (xhr.responseText.indexOf('Error') > -1) {
                    alert('Job Clear Error');
                } else {
                    console.log('Success');
                    location.reload();
                }
            }
        };
        xhr.open("POST", "/inc/clrjob.php", true);
        xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
        xhr.send("jobno=" + encodeURIComponent(jbn));
    } else {
        alert("You cannot clear a job without a job number");
    }
} else {
    alert("No Changes made");
}
  });
  document.getElementById("slist").addEventListener('mouseover', function (event) {
    if (event.target.closest('.clicard')) {
      climkr = 1; // Set climkr to 1 when hovering over a clicard
    }
  }, true); // Use capture phase to ensure early detection

  document.getElementById("slist").addEventListener('mouseout', function (event) {
    if (event.target.closest('.clicard')) {
      climkr = 0; // Reset climkr to 0 when leaving a clicard
    }
  }, true); // Use capture phase for consistency


  document.getElementById("slist").addEventListener('click', function (event) {
    event.stopPropagation;
    console.log("click event");
    var target = event.target;
    //Trash functions
    if (Array.from(target.classList).some(className => /_trash$/.test(className))) {
      console.log("trash targeted");
      //Trash link functions
      const classActions = {
        'contcard': function (element) {
          clrhld = 1;
          //Contact card Trash click
          ccard = element;
          var adBuild = {
            clientName: document.getElementById('client').value,
            lstNam: ccard.querySelector(".lstNam").innerHTML != '' ? ccard.querySelector(".lstNam").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : null,
            lstPh: ccard.querySelector(".lstPh").innerHTML != '' ? ccard.querySelector(".lstPh").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : null,
            lstEm: ccard.querySelector(".lstEm").innerHTML != '' ? ccard.querySelector(".lstEm").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : null,
          };
          console.log(adBuild);
          var senBuild = JSON.stringify(adBuild);
          console.log(senBuild);
          console.log(encodeURIComponent(senBuild));
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log(xhr.responseText);
              if (xhr.responseText.indexOf('Error') > -1) {
                alert('Address Card Removal Error');
              } else {
                ccard.remove();
              }
            }
          };
          xhr.open("POST", "/inc/conrem.php", true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(encodeURIComponent(senBuild));
        },
        'clicard': function (element) {
          //update so that it uses ELEMENT instead of contacard.
          clrhld = 1;
          ccard = element;
          var adBuild = {
            lstcli: ccard.querySelector(".lstcli").innerHTML != '' ? ccard.querySelector(".lstcli").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : document.getElementById('client').value,
            lstcont: ccard.querySelector(".lstcont").innerHTML != '' ? ccard.querySelector(".lstcont").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : null,
            lstcph: ccard.querySelector(".lstcph").innerHTML != '' ? ccard.querySelector(".lstcph").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : null,
            lstctc: ccard.querySelector(".lstctc").innerHTML != '' ? ccard.querySelector(".lstctc").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : null,
            lstctc2: ccard.querySelector(".lstctc2").innerHTML != '' ? ccard.querySelector(".lstctc2").innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : null,
          };
          var senBuild = JSON.stringify(adBuild);
          //console.log(senBuild);
          //console.log(encodeURIComponent(senBuild));
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              //console.log(xhr.responseText);
              if (xhr.responseText.indexOf('Error') > -1) {
                alert('Address Card Removal Error');
              } else {
                /*console.log(xhr.responseText);*/
                ccard.remove();
              }
            }
          };
          xhr.open("POST", "/inc/clirem.php", true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(encodeURIComponent(senBuild));
        },
        'tagcard': function (element) {
          event.stopPropagation();
          hideTag(element);
        },
        'addcard': function (element) {
          //Address card trash click
          clrhld = 1;
          var addCard = element;
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
                /*console.log(xhr.responseText);*/
                addCard.remove();
              }
            }
          };

          xhr.open("POST", "/inc/adrem.php", true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(encodeURIComponent(senBuild));
        }
      };
      for (const className in classActions) {
        if (classActions.hasOwnProperty(className)) {
          const closestElement = event.target.closest(`.${className}`);
          if (closestElement) {
            classActions[className](closestElement);
            break; // Stop after finding the first match 
          }
        }
      }
    } else {
      const classActions = {
        'contcard': function (element) {
          event.preventDefault(); // Prevents input from losing focus
          var target = element;
          console.log(target);
          if (target.parentNode.classList.contains('clicard')) {
            var target = target.parentNode;
          }
          document.getElementById("cliContact").value = urldecoder(target.querySelector(".lstNam").innerHTML);
          document.getElementById("cliContPh").value = urldecoder(target.querySelector(".lstPh").innerHTML);
          document.getElementById("cliContEm").value = urldecoder(target.querySelector(".lstEm").innerHTML);
          document.getElementById("cliContEm2").value = "";
          document.getElementById("cliContact").classList.add("pending");
          document.getElementById("cliContPh").classList.add("pending");
          document.getElementById("cliContEm").classList.add("pending");
          document.getElementById("cliContEm2").classList.add("pending");
          updchkr();
          // call job-dets-upd function with built cards
          card.clear();
          card.set("cliContact", urldecoder(target.querySelector(".lstNam").innerHTML));
          card.set("cliContPh", urldecoder(target.querySelector(".lstPh").innerHTML));
          card.set("cliContEm", urldecoder(target.querySelector(".lstEm").innerHTML));
          card.set("cliContEm2", "");
    
          sncrd.clear();
          sncrd.set("contd", urldecoder(target.querySelector(".lstNam").innerHTML));
          sncrd.set("contPh", urldecoder(target.querySelector(".lstPh").innerHTML));
          sncrd.set("contEm", urldecoder(target.querySelector(".lstEm").innerHTML));
          sncrd.set("contEm2", "");
    
          jobupd(sncrd, card);
    
          document.getElementById("jobRef").focus();
          ddclr();
        },
        'clicard': function (element) {
          climkr = 1;
          event.preventDefault(); // Prevents input from losing focus
          var target = element;
          if (target.parentNode.classList.contains('clicard')) {
            var target = target.parentNode;
          }
          document.getElementById("client").value = urldecoder(target.querySelector(".lstcli").innerHTML);
          document.getElementById("cliContact").value = urldecoder(target.querySelector(".lstcont").innerHTML);
          document.getElementById("cliContPh").value = urldecoder(target.querySelector(".lstcph").innerHTML);
          document.getElementById("cliContEm").value = urldecoder(target.querySelector(".lstctc").innerHTML);
          document.getElementById("cliContEm2").value = urldecoder(target.querySelector(".lstctc2").innerHTML);
          document.getElementById("client").classList.add("pending");
          document.getElementById("cliContact").classList.add("pending");
          document.getElementById("cliContPh").classList.add("pending");
          document.getElementById("cliContEm").classList.add("pending");
          document.getElementById("cliContEm2").classList.add("pending");
          updchkr();
          //Set marker to cancel client update
          climkr = 1;
          //Call job client update
          clich(urldecoder(target.querySelector(".lstcli").innerHTML), "Card").then(() => {
            // call job-dets-upd function with built cards
            card.clear();
            card.set("cliContact", urldecoder(target.querySelector(".lstcont").innerHTML));
            card.set("cliContPh", urldecoder(target.querySelector(".lstcph").innerHTML));
            card.set("cliContEm", urldecoder(target.querySelector(".lstctc").innerHTML));
            card.set("cliContEm2", urldecoder(target.querySelector(".lstctc2").innerHTML));
    
            sncrd.clear();
            sncrd.set("contd", urldecoder(target.querySelector(".lstcont").innerHTML));
            sncrd.set("contPh", urldecoder(target.querySelector(".lstcph").innerHTML));
            sncrd.set("contEm", urldecoder(target.querySelector(".lstctc").innerHTML));
            sncrd.set("contEm2", urldecoder(target.querySelector(".lstctc2").innerHTML));
    
            jobupd(sncrd, card);
    
            document.getElementById("jobRef").focus();
          }).catch(error => {
              // Handle error if clich() fails
              console.error('clich() failed:', error);
          });
          climkr = 0;
          ddclr();
        },
        'tagcard': function (element) {
          event.stopPropagation();
          addNewTag(urldecoder(element.querySelector(".tagdets").innerHTML));
          ddclr();
        },
        'frtLne': function (element) {
          event.stopPropagation();
          if (!target.classList.contains("frtLne") && target.parentElement.classList.contains("frtLne")) {
            target = target.parentElement;
          }
          var fld = "";
          var chg = "";
          Array.from(target.childNodes).forEach(function (frtLne) {
              fld = frtLne.dataset.marker;
              chg = frtLne.innerHTML;
              document.getElementById("add" + fld).innerHTML = chg;
          });
          ddclr();
      },
        'addcard': function (element) {
          // Select the element
          let mrkr = document.getElementById("dd").dataset.marker;
          var addCard = element;
          
          var fld = "";
          var chg = "";
          Array.from(addCard.children).forEach(function (child) {
            if (!child.classList.contains('add_trash')) {
              fld = mrkr + child.classList[0];
              chg = child.innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
              document.getElementById(fld).value = chg;
              document.getElementById(fld).classList.add("pending");
              document.getElementById(fld).classList.remove("updated");
              card.set(fld, chg);
              sncrd.set(fld, chg);
            }
          });
          updchkr();
          if (mrkr === 'd' || mrkr === 'c') {

            jobupd(sncrd, card);
          } else {
            var cno = document.getElementById("cnID").value;
            sendUpdate(cno, 'conNote', card);
          }
          ddclr();
    
      }
    };
    for (const className in classActions) { 
      if (classActions.hasOwnProperty(className)) { 
        const closestElement = event.target.closest(`.${className}`); 
        if (closestElement) { 
          classActions[className](closestElement); 
          break; // Stop after finding the first match 
        } 
      } 
    }    

  }
  });
  document.querySelector("input[name=clientName]").addEventListener('change', function () {
    if (climkr !== 1) {
      var client = document.querySelector("input[name=clientName]").value;
      clich(client,"UPD");
    } else {
      climkr = 0;
    }
  });
  
  document.querySelector("input[name=clientName]").addEventListener('keydown', function (e) {
    if (e.which === 9) {
      climkr = 0;
    }
  });
  
  document.querySelectorAll(".j_det_info").forEach(function (element) {
    element.addEventListener('change', function () {
      var card = new Map();
      var ent = element.value;
      var fldId = element.id;
      card.set(element.name, ent);
      
      fetch("/inc/job-dets-upd.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "updstr=" + encodeURIComponent(JSON.stringify(Object.fromEntries(card))) + "&cno=" + jbn,
      }).then(response => response.text()).then(function (data) {
        if (data.slice(0,7) === 'success') {
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
      var valprep = encodeURIComponent(val);
      console.log("col = " + col);
      console.log("val = " + val);
      console.log("did = " + did);
      fetch("/inc/job_add_upd.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "col=" + col + "&val=" + valprep.replace(/\+/g, '%2B') + "&jno=" + jbn,
      }).then(response => response.text()).then(function (data) {
        if (data.slice(0,7) === 'success') {
        document.getElementById(did).setAttribute("value", val);
        if (document.getElementById(did).classList.contains("pending")) {
          document.getElementById(did).classList.remove("pending");
        }
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
      } else {
          alert("Error in updating: " + data);
          console.log('here');
      }
      }).catch(function (error) {
        console.error('Error:', error);
      });
    });
  
    input.addEventListener('focus', function () {
      if (input.id === "cnam" || input.id === "dnam") {
  
      } else {
        ddclr();
        /*document.getElementById("dd").removeAttribute('marker');
        document.getElementById("dd").classList.add("hideme");
        clrDd();*/
      }
    });

  });
  //adding a note
  document.getElementById('newn').addEventListener('click', function () {
    var nnote = document.getElementById('nnt').innerHTML;
    var namt = document.getElementById('nna').textContent.replace(",", "").replace("$", "");
    var encodedVal = encodeURIComponent(nnote);
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
            body: "txt=" + encodedVal.replace(/\+/g, '%2B') + "&amt=" + namt + "&jobno=" + jbn,
          }).then(response => response.text()).then(function (data) {
            nnote = JSON.parse(data);
            if (!Array.isArray(notes)) {
              notes = [];  // Initialize as an array if it's not one
            }
            notes.push(nnote);
            /*
            const item = document.createElement('div');
            item.classList.add('draggable-item');
            item.classList.add('tr');
            item.draggable = true;
            item.setAttribute('ondragstart', 'dragStart(event)');
            item.setAttribute('data-id', chknull(nnote.jnID));
            item.setAttribute('data-ord', chknull(nnote.jnOrd));
            item.innerHTML = '<div class="drag-handle"><img class="scroll_img" alt="Move Note" src="/img/scroll.png"></div><div contenteditable="true" data-col="jnNote" class="ncol td">' + chknull(nnote.jnNote) + '</div><div contenteditable="true" data-col="jnAmt" class="namt td">' + numberFormat(chknull(nnote.jnAmt), 2, '.', ',') + '</div><div class="ntra td"><div class="cmd_img" data-id="' + chknull(nnote.jnID) + '"><img class="ntrash nbut" alt="Delete Note" src="/img/trash.svg"></div></div>'
            notebody.appendChild(item);
            */
            const item = document.createElement('div');
            item.classList.add('draggable-item');
            item.classList.add('tr');
            item.setAttribute('data-id', chknull(nnote.jnID));
            item.setAttribute('data-ord', chknull(nnote.jnOrd));
            
            const dragHandle = document.createElement('div');
            dragHandle.classList.add('drag-handle');
            dragHandle.setAttribute('ondragstart', 'dragStart(event)');
            dragHandle.draggable = true;
            
            const dragImage = document.createElement('img');
            dragImage.classList.add('scroll_img');
            dragImage.alt = 'Move Note';
            dragImage.src = '/img/scroll.png';
            
            dragHandle.appendChild(dragImage);
            
            const noteContent = document.createElement('div');
            noteContent.classList.add('ncol', 'td');
            noteContent.contentEditable = 'true';
            noteContent.setAttribute('data-col', 'jnNote');
            noteContent.innerHTML = chknull(nnote.jnNote);
            
            const amtContent = document.createElement('div');
            amtContent.classList.add('namt', 'td');
            amtContent.contentEditable = 'true';
            amtContent.setAttribute('data-col', 'jnAmt');
            amtContent.innerHTML = numberFormat(chknull(nnote.jnAmt), 2, '.', ',');
            
            const trashDiv = document.createElement('div');
            trashDiv.classList.add('ntra', 'td');
            
            const cmdImgDiv = document.createElement('div');
            cmdImgDiv.classList.add('cmd_img');
            cmdImgDiv.setAttribute('data-id', chknull(nnote.jnID));
            
            const trashImg = document.createElement('img');
            trashImg.classList.add('ntrash', 'nbut');
            trashImg.alt = 'Delete Note';
            trashImg.src = '/img/trash.svg';
            
            cmdImgDiv.appendChild(trashImg);
            trashDiv.appendChild(cmdImgDiv);
            
            item.appendChild(dragHandle);
            item.appendChild(noteContent);
            item.appendChild(amtContent);
            item.appendChild(trashDiv);
            
            notebody.appendChild(item);

            document.getElementById('nnt').textContent = "";
            document.getElementById('nna').textContent = "";
            namtTot();
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
        body: "jnid=" + encodeURIComponent(nid),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to remove note');
        }
        return response.text();
      })
      .then(function (data) {
        console.log(data);
        if (data === "success") {
          notes = notes.filter(val => val.jnID !== nid);
          console.log(notes);
          document.querySelector('.tr[data-id="' + nid + '"]').remove();
        } else {
          alert("Error in removing note");
          console.log("Variables - " + nid);
        }
        namtTot();
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
  
      var nval;
  
      if (col == "jnAmt") {
        target.innerHTML = numberFormat(target.innerHTML.replace(/\,/g, "").replace("$", ""), 2, ".", ",");
        nval = target.innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\,/g, "").replace("$", "");
      } else {
        var nval1 = target.innerHTML.replace(/<div>/g, "&zzz;").replace(/<br>/g, "&zzz;");
        nval = nval1.replace(/(<([^>]+)>)/ig, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&zzz;/g, "<br>");
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
        console.log(nval);
        console.log(col);
        console.log(nid);
        var encodedVal = encodeURIComponent(nval);
        fetch("/inc/job-note-upd.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: "updstr=" + encodedVal.replace(/\+/g, '%2B') + "&ref=" + col + "&cno=" + nid,
        }).then(response => response.text()).then(function (data) {
          if (data === "success") {
            console.log(ind);
            console.log(col);
            console.log(nval);
            console.log(notes);
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
            console.log(data);
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
          namtTot();
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
  
      var cval;
  
      if (col == "jnAmt") {
        cval = numberFormat(target.innerHTML.replace(/\,/g, "").replace("$", ""), 2, ".", ",");
      } else {
        cval = target.innerHTML.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
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
  // reloading Connotes
  document.querySelector('img[id=rcn]').addEventListener('click', function () {
    cn_close();
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
          console.log(data);
          if (data.substring(0, 1) === '<') {
            document.getElementById('coll').insertAdjacentHTML('beforeend', data);
          } else {
            try {
              var obj = JSON.parse(data);
              if (Array.isArray(obj)) {
                if (!Array.isArray(cnot)) {
                  cnot = [];  // Initialize as an array if it's not one
                }
                if (!Array.isArray(ocnot)) {
                  ocnot = [];  // Initialize as an array if it's not one
                }
                cnot.push(obj[0]);
                ocnot.push(obj[0]);
                ccntLoad(obj[0].cnID);
              }
              } catch (e) {
                console.error("Parsing error:", e);
              }
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
        if (!isNaN(Number(data))) {
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
          
          processConnote(njn, cno, ncnum);

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

          if (!isNaN(Number(data))) {
            cnot.forEach(function (val, i) {
              if (val.cnID == cno) {
                cnot.splice(i, 1);
              }
            });

            if (confirm("Move was successful, would you like to go to job " + ej + "?")) {
              window.location.href = "/jdet.php?job_no=" + dj;
            } else {
              cn_close();
              
              actcn = null;
              clrcnt();
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
          if (!isNaN(Number(data))) {
            cnot.splice(actcn, 1);
            cn_close();
            
            clrcnt();
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
      if (!Array.isArray(mcnl)) {
        mcnl = [];  // Initialize as an array if it's not one
      }
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
  var nid = null;
  if (event.target.classList.contains('ccnt_card')) {
    nid = event.target.getAttribute('data-id');
  } else if (event.target.parentNode.classList.contains('ccnt_card')) {
    nid = event.target.parentNode.getAttribute('data-id');
  }
  if (nid != null) {
    if (mcnf === "Y") {
      mcnf = "";
      return;
    }
    ccntLoad(nid);
  }
});
//connote functions
document.getElementById('boscr').addEventListener('click', function () {
  cn_close();
  actcn = null;
  clrcnt();
});
document.querySelector('.wrapper').addEventListener('click', function (event) {
  event.stopPropagation();
  const cliContactFocused = document.querySelector("#cliContact").matches(":focus");
  const cnamFocused = document.querySelector("#cnam").matches(":focus");
  const dnamFocused = document.querySelector("#dnam").matches(":focus");
  const clientFocused = document.querySelector("#client").matches(":focus");
  const tagFocused = document.querySelector("#tag-input").matches(":focus");

  if (!cliContactFocused && !cnamFocused && !dnamFocused && !clientFocused && !tagFocused) {
    if (clrhld === 0) {
      ddclr();
    } else {
      clrhld = 0; 
    }
    /*
    const dd = document.getElementById('dd');
    dd.removeAttribute('marker');
    dd.classList.add('hideme');    
    clrDd();
    */
  }
});
document.getElementById('cn-frame').addEventListener('click', function (event) {
  event.stopPropagation();
  const activeElementClass = document.activeElement.getAttribute('class');
  const activeElementParentId = document.activeElement.parentElement.getAttribute('id');

  var cnameInputFocused = false;
  var inputs = document.querySelectorAll('.cn_cname input');
  
  inputs.forEach(function(input) {
      if (input === document.activeElement) {
          cnameInputFocused = true;
          return;
      }
  });
  const isExcludedClass = activeElementClass && !["psn", "senRef"].includes(activeElementClass);
  const isExcludedParent = activeElementParentId !== 'ncn';
  if (!cnameInputFocused && isExcludedClass && isExcludedParent) {
    ddclr();
    /*
    const dd = document.getElementById('dd');
    dd.removeAttribute('marker');
    dd.classList.add('hideme');
    clrDd();
    */
  }
});
document.querySelectorAll('.cndd').forEach(function (element) {
  element.addEventListener('change', function () {
    var cnupd = new Map();
    var updstr;
    var fld;
    var chg = this.value.replace(/\'/g, "''");
    var cno = document.getElementById('cnID').value;

    if (this.type === 'radio') {
      fld = 'Pb';
    } else {
      fld = this.id;
    }

    cnupd.set(fld, chg);


    sendUpdate(cno,'conNote', cnupd);
  });
});

  //add con note line
document.querySelector("img[id=ncl]").addEventListener('click', function () {
  var cnum = document.querySelector("#cnID").value;
  const kv = {};
  const trElement = document.getElementById("ncn");
  const tdElements = trElement.getElementsByTagName("td");

  for (const td of tdElements) {
    const key = td.getAttribute("data-col");
    const value = td.textContent.trim() || null;
    if (key != "cmd") {
      kv[key] = value;
      td.textContent = "";
    }
  }

  // Post data
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/inc/job-confrt-add.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          try {
            JSON.parse(xhr.responseText);
          } catch (e) {
            console.log(xhr.responseText)
            alert("error response not correct format");
            return;
          }

        var rtrn = JSON.parse(xhr.responseText);
        if (!Array.isArray(frt)) {
          frt = [];  // Initialize as an array if it's not one
        }
          frt.push(rtrn);
          /*console.log(rtrn);*/
          var frtItem = frt[frt.length - 1];

          var txt = `
            <tr data-id="${frtItem.itID}">
              <td contenteditable="true" id="senRef" data-col="senRef" class="senRef updated">${frtItem.senRef || ''}</td>
              <td contenteditable="true" id="noItem" data-col="noItem" class="noItem updated">${frtItem.noItem || ''}</td>
              <td contenteditable="true" id="psn" data-col="psn" class="psn updated">${frtItem.psn || ''}</td>
              <td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt updated">${frtItem.itWgt || ''}</td>
              <td contenteditable="true" id="itLen" data-col="itLen" class="itLen updated">${frtItem.itLen || ''}</td>
              <td contenteditable="true" id="itWid" data-col="itWid" class="itWid updated">${frtItem.itWid || ''}</td>
              <td contenteditable="true" id="itHei" data-col="itHei" class="itHei updated">${frtItem.itHei || ''}</td>
              <td contenteditable="true" id="itQty" data-col="itQty" class="itQty updated">${frtItem.itQty || ''}</td>
              <td contenteditable="true" id="unNum" data-col="unNum" class="unNum updated">${frtItem.unNum || ''}</td>
              <td contenteditable="true" id="class" data-col="class" class="class updated">${frtItem.class || ''}</td>
              <td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk updated">${frtItem.sRisk || ''}</td>
              <td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr updated">${frtItem.pkGr || ''}</td>
              <td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes updated">${frtItem.pkDes || ''}</td>
              <td class="cn_ctrls" data-col="cmd">
                <div class="cmd_img">
                  <img class="cntrash cnbut" alt="Delete Freight Note Line" src="/img/trash.svg">
                </div>
              </td>
            </tr>
          `;

          document.getElementById("cnt_body").insertAdjacentHTML("beforeend", txt);
          conDetUpd();
      } else if (xhr.readyState == 4) {
          console.log("status = " + xhr.status);
          console.log(xhr.responseText);
          alert("Error in updating");
      }
  };
  var data = "cnum=" + encodeURIComponent(cnum) + "&kv=" + encodeURIComponent(JSON.stringify(kv));
  xhr.send(data);
});
function findParentRow(element) {
  while (element && element.tagName !== "TR") {
      element = element.parentElement;
  }
  return element;
}
//delete con note line
document.getElementById("cnt_body").addEventListener('click', function (event) {
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
              var cnupd = { [col]: nval };
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
                          console.log("Variables - " + cnupd + " : " + nid);
                          console.log("Error: " + xhr.responseText);
                      }
                  } else if (xhr.readyState == 4) {
                      alert("Error in updating");
                      console.log("Error: " + xhr.responseText);
                      console.log("Variables - " + cnupd + " : " + nid);
                      console.log(xhr);
                  }
              };
              var data = "updstr=" + encodeURIComponent(JSON.stringify(cnupd)) + "&cno=" + encodeURIComponent(nid);
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
      var itid = Number(target.closest("tr").getAttribute("data-id"));
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
          if (frt[aid][col].toString() !== cval.toString()) {
              mrkr.classList.add("pending");
              mrkr.classList.remove("updated");
          } else {
              mrkr.classList.add("updated");
              mrkr.classList.remove("pending");
          }
      } else {
          if (ofrt[oid][col].toString() === cval.toString()) {
              mrkr.classList.remove("updated");
              mrkr.classList.remove("pending");
          } else {
              if (frt[aid][col].toString() !== cval.toString()) {

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
          /*this.parentNode.parentNode.appendChild(document.querySelector('#dd'));
          document.getElementById("dd").classList.remove("hideme");
          
          document.getElementById("dd").dataset.marker = "NCN";*/
          positionDropdown();
          ddFrtPop(td.innerHTML);
          event.stopPropagation();
      });
  
      td.addEventListener("keyup", function () {
          ddFrtPop(td.innerHTML);
      });
  });
  //dropdown address book
document.getElementById("snam").addEventListener("focusin", function (event) {
    /*this.parentNode.appendChild(document.querySelector('#dd'));
    document.getElementById("dd").classList.remove("hideme");*/
    positionDropdown();
    document.getElementById("dd").dataset.marker = "s";
    addbkpop();
    event.stopPropagation();
});

document.getElementById("snam").addEventListener("keyup", function () {
    this.classList.add("pending");
    document.getElementById("snam").classList.remove("updated");
    updchkr();
    addbkpop();
});

document.getElementById("rnam").addEventListener("focusin", function (event) {
  /*this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");*/
  positionDropdown();
  
  document.getElementById("dd").dataset.marker = "r";
  addbkpop();
  event.stopPropagation();
});

document.getElementById("rnam").addEventListener("keyup", function () {
  this.classList.add("pending");
  document.getElementById("rnam").classList.remove("updated");
  updchkr();
  addbkpop();
});

document.getElementById("onam").addEventListener("focusin", function (event) {
  event.stopPropagation();
  /*this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");*/
  positionDropdown();
  document.getElementById("dd").dataset.marker = "o";
  addbkpop();
});

document.getElementById("onam").addEventListener("keyup", function () {
  addbkpop();
});

document.querySelectorAll(".cndd").forEach(function (element) {
  element.addEventListener("focus", function () {
    ddclr();
    /*
      document.getElementById("dd").removeAttribute('marker');
      document.getElementById("dd").classList.add("hideme");
      clrDd();
      */
  });
});

document.querySelectorAll("input").forEach(function(input) {
  input.addEventListener('keyup', function() {
      // Normalize null and '' to be the same
      let originalValue = this.getAttribute("value") || '';
      let currentValue = this.value || '';
      
      /*console.log('-' + originalValue + '-');
      console.log('-' + currentValue + '-');*/
      
      if (currentValue !== originalValue) {
          this.classList.add("pending");
          this.classList.remove("updated");
      } else {
          this.classList.remove("pending");
          this.classList.add("updated");
      }
      updchkr();
  });
});
//dropdown contacts
document.getElementById("cliContact").addEventListener('focusin', function() {
  /*this.parentNode.appendChild(document.querySelector('#dd'));
  document.getElementById("dd").classList.remove("hideme");*/
  positionDropdown();
  //updDvH('dd');
  document.getElementById("dd").dataset.marker = "Jcont";
  ddConPop(this.value);
  event.stopPropagation();
});

document.getElementById("cliContact").addEventListener('keyup', function() {
  ddConPop(this.value);
});

document.getElementById("client").addEventListener('focusin', function() {
  positionDropdown();
  document.getElementById("dd").dataset.marker = "client";
  ddCoPop(this.value);
  event.stopPropagation();
});

document.getElementById("client").addEventListener('keyup', function() {
  ddCoPop(this.value);
});
  //adding a supplier
document.getElementById("addsup").addEventListener('click', function () {
  var nsup;
  const kv = {};
  const parentDiv = document.getElementById("asup");
  
  for (const childDiv of parentDiv.children) {
    if (childDiv.id !== 'addsup') {
      const col = childDiv.getAttribute('data-col');
      const val = childDiv.innerText.trim().replace(/\n/g, '<br>').replace(/\+/g, '%2B'); // Encode '+' as '%2B'
      kv[col] = val || null;
      childDiv.textContent = '';
    }
  }


  if (jbn === "" || jbn === 0) {
      alert("A job needs to be created for notes to be added - addsup.click");
  } else {
      if (Object.values(kv).every(value => value === null)){
          alert("Cannot add an all blank entry");
      } else {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                /*console.log(xhr.responseText);*/
                  if (xhr.responseText[0] !== '{') {
                      alert("Error when trying to add supplier supplier!\n" + xhr.responseText);
                  } else {
                    nsup = JSON.parse(xhr.responseText);
                    if (!Array.isArray(sups)) {
                      sups = [];  // Initialize as an array if it's not one
                    }
                      sups.push(nsup);
                      var txt = '<div class="supln" data-id="' + chknull(nsup.jsID) + '"><div contenteditable="true" data-col="jsName" class="supSu lsup updated">' + chknull(nsup.jsName) + '</div><div contenteditable="true" data-col="jsType" class="supTy lsup updated">' + chknull(nsup.jsType) + '</div><div contenteditable="true" data-col="jsDesc" class="supDe lsup updated">' + chknull(nsup.jsDesc) + '</div><div contenteditable="true" data-col="jsEst" class="supEc lsup updated">$' + numberFormat(chknull(nsup.jsEst), 2, '.', ',') + '</div><div contenteditable="true" data-col="jsInvRec" class="supIr lsup updated">' + chknull(nsup.jsInvRec) + '</div><div contenteditable="true" data-col="jsNotes" class="supNo lsup updated">' + chknull(nsup.jsNotes) + '</div><div class="suprm td" data-id="' + chknull(nsup.jsID) + '">Remove Supplier</div></div>';
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
        xhr.send("jobno=" + jbn + "&crd=" + encodeURIComponent(JSON.stringify(kv)));
      }
  }
});

  //deleting a supplier
  document.getElementById("supbody").addEventListener('click', function (event) {
    if (event.target.classList.contains("suprm")) {
        var nid = event.target.getAttribute("data-id");
        fetch("/inc/job-sup-rem.php", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: "id=" + encodeURIComponent(nid),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to remove supplier');
          }
          return response.text();
      })
      .then(function (data) {
          if (data === "success") {
              sups = sups.filter(val => val.jsID !== nid); // Filter out the removed supplier from sups array
              var elementToRemove = document.querySelector(".supln[data-id='" + nid + "']");
              if (elementToRemove) {
                  elementToRemove.remove();
              }
          } else {
              throw new Error('Failed to remove supplier');
          }
      })
      .catch(function (error) {
          console.log("Error: ", error.message);
          alert("Error in removing supplier");
      });
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
        var nval = target.innerHTML.trim().replace(/\n/g, '<br>');

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
                        console.log(data);
                        if (data === "success") {
                            sups.forEach(function (val, i) {
                                if (val.jsID == nid) {
                                    sups[i][col] = nval;
                                    obj.classList.add("updated");
                                    obj.classList.remove("pending");
                                    if (col == "jsEst") {
                                        obj.innerHTML = "$" + numberFormat(chknull(nval), 2, '.', ',');
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
                            console.log("Variables - " + nval + " : " + col + " : " + nid);
                            console.log("Error: " + data);
                        }
                    } else {
                        alert("Error in updating");
                        console.log("Variables - " + nval + " : " + col + " : " + nid);
                        console.log("Error status: " + xhr.status);
                    }
                }
            };
            var encodedVal = encodeURIComponent(nval.replace(/\+/g, '%2B').replace(/\&/g, '%26'));
            xhr.open("POST", "/inc/job-sup-upd.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("updstr=" + encodedVal + "&ref=" + encodeURI(col) + "&cno=" + nid);
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
          ddclr();
          /*
            document.getElementById("dd").removeAttribute('marker');
            document.getElementById("dd").classList.add("hideme");
            clrDd();
          */
        }
    });
});

document.getElementById('cn-close').addEventListener('click', function () {
  cn_close();
});

document.getElementById("cnam").addEventListener("focusin", function() {
  positionDropdown();
  document.getElementById("dd").setAttribute('data-marker', 'c');
  addbkpop();
});

document.getElementById("cnam").addEventListener("keyup", function() {
  addbkpop();
});

document.getElementById("dnam").addEventListener("focusin", function() {
  positionDropdown();
  document.getElementById("dd").setAttribute('data-marker', 'd');
  addbkpop();
});

document.getElementById("dnam").addEventListener("keyup", function() {
  addbkpop();
});
notebody.addEventListener('dragover', allowDrop);
notebody.addEventListener('drop', drop);

document.getElementById('tga').addEventListener('click', function() {
  const form = document.getElementById('tag-input-form');
  form.style.display = 'flex';
  document.getElementById('tag-input').focus();

});
// Call the function when the input field is focused or the value changes
document.getElementById('tag-input').addEventListener('input', function() {
  console.log(this.value);
  ddTagPop(this.value);
  
});
document.getElementById('tag-input').addEventListener('focus', function() {
  showTagInput();
});
document.getElementById('add-tag-button').addEventListener('click', function() {
  event.stopPropagation();
  let tagInput = document.getElementById('tag-input').value;
  
  if (tagInput == '') {
    alert("You must enter in tag information to add it");
  } else if (jbn == null) {
    alert("You must have a job number to add a tag");
  } else {
    addNewTag(tagInput);
    document.getElementById('tag-input').value = '';
  }
});

document.getElementById('client').addEventListener('input', positionDropdown);
document.getElementById('client').addEventListener('focus', positionDropdown);

// Recalculate position when the window is resized or scrolled
window.addEventListener('resize', realignDropdown);
window.addEventListener('scroll', realignDropdown);

});
//suggestion list moving and activating
document.addEventListener('focus', function(event) {
  if (event.target.classList.contains('ddv')) {
    //clear and set the data-marker
    document.getElementById("dd").removeAttribute("data-marker");
    // Get the ID of the active (focused) element
    const activeElementId = document.activeElement.id;
    // Use the active element's ID in a switch statement to determine action
    switch (activeElementId) {
      case 'client':
        break;
      case 'cliContact':
        break;
      case 'tag-input':
        break;
      case 'cnam':
        break;
      case 'dnam':
        break;
      case 'snam':
        break;
      case 'rnam':
        break;
      case 'onam':
        break; 
      default:
        if (event.target.parentElement.id == 'NCN') {
        } else {
        }
    }
      //clear the dd contents

      //Move the dd element

      //update the suggestions.

  } else {
    //clear the data markers and contents.

  }
}, true);

window.addEventListener('beforeunload', (event) => {

  if (document.getElementById("updcheck").classList.contains("chkpend")) {
      // Trigger any needed updates here
      document.getElementById("updcheck").focus(); // Trigger blur-based save if relevant

      // Show a confirmation dialog
      event.returnValue = 'Pending Changes detected, attempting to update server. Are you sure you want to leave?';
  }
});