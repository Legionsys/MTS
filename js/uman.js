indi = 0;
nam = '';
ema = '';
scr = '';
var myDetails = new Object();
function useridchk() {
  fetch("/inc/usrlst.php")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('usrlist').innerHTML = data;
    })
    .catch(error => {
      console.error('Error fetching user list:', error);
    });
}
function mechk() {
  myDetails.name = document.getElementById("my_name").value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  myDetails.email = document.getElementById("my_email").value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  myDetails.scr = document.getElementById("my_scrn").value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  // You can uncomment the following lines if you need to make an additional AJAX request
  /*
  fetch("/inc/usrlst_me.php")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('usrdet').innerHTML = data;
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
    });
  */
}
function usrclr() {
  document.getElementById("upd_name").value = '';
  document.getElementById("upd_email").value = '';
  document.getElementById("upd_scrn").value = '';
  document.getElementById("usract").innerHTML = 'ACTIVE';
  document.getElementById("usract").classList.add("no-change");
  document.getElementById("pwdchange").classList.add("no-change");
  document.getElementById("usrupd").innerHTML = "ADD USER";
  document.querySelector(".editusrcard").setAttribute("data-id", "0");
  document.getElementById("upd_scrn").classList.remove("rejected", "approved");
  document.querySelector("label[for=upd_scrn]").classList.remove("lab_rejected", "lab_approved");
  document.querySelector("label[for=upd_scrn]").innerHTML = "Login Name";
  nam = '';
  ema = '';
  scr = '';
}
function passclr() {
  document.getElementById("Cur_pass").value = '';
  document.getElementById("npo_pass").value = '';
  document.getElementById("npt_pass").value = '';
  document.getElementById("Cur_pass").classList.remove("approved", "rejected");
  document.querySelector("label[for=Cur_pass]").classList.remove("lab_approved", "lab_rejected");
  document.querySelector("label[for=Cur_pass]").innerHTML = "Current Password";
  document.getElementById("passUpdBut").classList.add('no-change');
  document.querySelectorAll('.valid').forEach(function (element) {
    element.classList.remove('valid');
    element.classList.add('invalid');
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var chk = [0,0,0,0,0,0];
  var meNameInput = document.getElementById('my_name');
  var meEmailInput = document.getElementById('my_email');
  var meScrInput = document.getElementById('my_scrn');
  var usrUpdMeBtn = document.getElementById('usrupdme');
  var pwdChangeBtn = document.getElementById('me_pwd_ch');
  var popElement = document.getElementById('pop');
  var passwrdChgElement = document.getElementById('passwrd_chg');
  var passUpdBut = document.getElementById('passUpdBut');
  var actusrcard = document.querySelector('.actusrcard');
  var npoPass = document.getElementById('npo_pass');
  var curPass = document.getElementById('Cur_pass');
  var labelForCurPass = document.querySelector("label[for=Cur_pass]");
  var newPass = document.querySelector('.newp');
  var nptPass = document.getElementById('npt_pass');
  var lengthElem = document.getElementById('length');
  var letterElem = document.getElementById('letter');
  var capitalElem = document.getElementById('capital');
  var numberElem = document.getElementById('number');
  var matchPwdElem = document.getElementById('matchpwd');
  var vpassElements = document.querySelectorAll('.vpas');



  useridchk();
  mechk();

  // Add event listener to each input
  meNameInput.addEventListener('input', handleInputChange);
  meEmailInput.addEventListener('input', handleInputChange);
  meScrInput.addEventListener('input', handleInputChange);
  pwdChangeBtn.addEventListener('click', handlePwdChangeClick);
  passUpdBut.addEventListener('click', handlePassUpdClick);
  curPass.addEventListener('blur', handleCurPassBlur);
  newPass.addEventListener('focus', function() {
    indi = 1;
  });
  newPass.addEventListener('blur', function() {
    indi = 0;
  });
  newPass.addEventListener('keyup', function() {
    var pswd = npoPass.value;
  
    // Check length
    if (pswd.length < 8) {
      lengthElem.classList.remove('valid');
      lengthElem.classList.add('invalid');
      chk[0] = 0;
    } else {
      lengthElem.classList.remove('invalid');
      lengthElem.classList.add('valid');
      chk[0] = 1;
    }
  
    // Validate letter
    if (pswd.match(/[A-z]/)) {
      letterElem.classList.remove('invalid');
      letterElem.classList.add('valid');
      chk[1] = 1;
    } else {
      letterElem.classList.remove('valid');
      letterElem.classList.add('invalid');
      chk[1] = 0;
    }
  
    // Validate capital letter
    if (pswd.match(/[A-Z]/)) {
      capitalElem.classList.remove('invalid');
      capitalElem.classList.add('valid');
      chk[2] = 1;
    } else {
      capitalElem.classList.remove('valid');
      capitalElem.classList.add('invalid');
      chk[2] = 0;
    }
  
    // Validate number
    if (pswd.match(/\d/)) {
      numberElem.classList.remove('invalid');
      numberElem.classList.add('valid');
      chk[3] = 1;
    } else {
      numberElem.classList.remove('valid');
      numberElem.classList.add('invalid');
      chk[3] = 0;
    }
  
    // Validate matching passwords
    if (pswd === nptPass.value && pswd !== '') {
      matchPwdElem.classList.remove('invalid');
      matchPwdElem.classList.add('valid');
      chk[4] = 1;
    } else {
      matchPwdElem.classList.remove('valid');
      matchPwdElem.classList.add('invalid');
      chk[4] = 0;
    }
  
    // Add all array values together
    if (chk.includes(0)) {
      passUpdBut.classList.add('no-change');
    } else {
      passUpdBut.classList.remove('no-change');
    }
  
    console.log(chk.toString());
  });



  // Event handler function
  function handleInputChange() {
    if (myDetails.name !== meNameInput.value || myDetails.email !== meEmailInput.value || myDetails.scr !== meScrInput.value) {
      usrUpdMeBtn.classList.remove('no-change');
    } else {
      usrUpdMeBtn.classList.add('no-change');
    }
  }
  function handlePwdChangeClick() {
    indi = 1;
    popElement.classList.add('obscr');
    passwrdChgElement.classList.remove('hide');
  }
  function handlePassUpdClick() {
    if (passUpdBut.classList.contains('no-change')) {
      console.log("no-change no post");
    } else {
      var myPass = {
        id: actusrcard.getAttribute('data-id'),
        npass: npoPass.value
      };
  
      var xhr = new XMLHttpRequest();
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
          
          if (xhr.responseText.search('Error') > -1) {
            alert("Password update failed, please report to page Admin ln 280");
          } else {
            alert("Password update successful");
            passclr();
            popElement.classList.remove("obscr");
            passwrdChgElement.classList.add('hide');
          }
        }
      };
  
      xhr.open("POST", "/inc/usrpassupd.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(myPass));
    }
  }
  function handleCurPassBlur() {
    if (curPass.value === '') {
      curPass.classList.remove('approved', 'rejected');
      labelForCurPass.classList.remove('lab_approved', 'lab_rejected');
      labelForCurPass.textContent = 'Current Password';
    } else {
      var myPass = {
        id: actusrcard.getAttribute('data-id'),
        pass: curPass.value
      };
  
      var xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
          console.log(xhr.responseText.search('Error'));
  
          if (xhr.responseText.search('Error') > -1) {
            console.log('rejected upd');
            // Password did not match, make box red
            curPass.classList.remove('approved');
            curPass.classList.add('rejected');
            labelForCurPass.classList.remove('lab_approved');
            labelForCurPass.classList.add('lab_rejected');
            labelForCurPass.textContent = "Current Password - DOESN'T MATCH";
            chk[5] = 0;
          } else {
            console.log('Approved upd');
            // Password matched, make box green
            curPass.classList.remove('rejected');
            curPass.classList.add('approved');
            labelForCurPass.classList.remove('lab_rejected');
            labelForCurPass.classList.add('lab_approved');
            labelForCurPass.textContent = 'Current Password - MATCH';
            chk[5] = 1;
          }
        }
      };
  
      xhr.open('POST', '/inc/usrpasschk.php', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(myPass));
    }
  }

vpassElements.forEach(function(element) {
  // Add mousedown event listener
  element.addEventListener('mousedown', function() {
    // Get the target input element based on lnk attribute
    var targetInput = document.getElementById(element.getAttribute('lnk'));
    // Change the type attribute to "text"
    targetInput.type = 'text';
  });

  // Add mouseup event listener
  element.addEventListener('mouseup', function() {
    // Get the target input element based on lnk attribute
    var targetInput = document.getElementById(element.getAttribute('lnk'));
    // Change the type attribute to "password"
    targetInput.type = 'password';
  });
});
document.getElementById("me_usract").addEventListener("click", function() {
  if (confirm("Note that this action will deactivate your account and log you out.\nDo you still want to continue?")) {
    // Process to update account active status
    indi = 1;

    // Update server to change status
    var idn = document.querySelector(".actusrcard").getAttribute("data-id");
    var fun = 'status';
    var upd = 1;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          // Confirm and log out
          alert('Your account has been deactivated and you will now be logged out');
          window.location = '/inc/logout.inc.php';
        } else {
          alert('Error trying to update users status');
          console.log("Error: " + xhr.responseText);
        }
      }
    };

    xhr.open("POST", "/inc/userman.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("idn=" + idn + "&funct=" + fun + "&val=" + upd);
  }
});
document.getElementById("usrupdme").addEventListener("click", function() {
  if (!document.getElementById("usrupdme").classList.contains("no-change")) {
    // Build JSON
    var myNew = new Object();
    myNew.id = document.querySelector(".actusrcard").getAttribute("data-id");
    myNew.name = document.getElementById("my_name").value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    myNew.email = document.getElementById("my_email").value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    myNew.scr = document.getElementById("my_scrn").value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    var senBuild = JSON.stringify(myNew);
    
    // Send request and process
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(xhr.responseText);
        if (xhr.responseText.search('Error') > -1) {
          alert('Updating User Details Failed');
        } else {
          mechk();
          document.getElementById("usrupdme").classList.add("no-change");
        }
      }
    };
    
    xhr.open("POST", "/inc/userupd.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(senBuild);
  }
});
document.querySelector(".clr").addEventListener("click", function() {
  usrclr();
});
//user table items
document.getElementById("usrlist").addEventListener("click", function(event) {
  var target = event.target;
  if (target.classList.contains("usrcrd") && indi === 0) {
    usrclr();
    document.querySelector(".editusrcard").setAttribute("data-id", target.getAttribute("data-id"));
    nam = target.querySelector(".usrnam").innerHTML;
    ema = target.querySelector(".usreml").innerHTML;
    scr = target.querySelector(".usrscrn").innerHTML;
    document.getElementById("upd_name").value = nam;
    document.getElementById("upd_email").value = ema;
    document.getElementById("upd_scrn").value = scr;

    var usractValue = target.querySelector(".usract").innerHTML;
    if (usractValue === "ACTIVE") {
      document.getElementById("usract").innerHTML = "ACTIVE";
      document.getElementById("usract").classList.remove("no-change");
    } else {
      document.getElementById("usract").innerHTML = "INACTIVE";
      document.getElementById("usract").classList.remove("no-change");
    }

    document.getElementById("pwdchange").innerHTML = "RESET PASSWORD";
    document.getElementById("pwdchange").classList.remove("no-change");
    document.getElementById("usrupd").innerHTML = "UPDATE";
  }
  indi = 0;
});
document.getElementById("usrlist").addEventListener("click", function(event) {
  var target = event.target;
  if (target.classList.contains("usract")) {
    indi = 1;
    // Update server to change status
    var parentUsrCrd = target.closest(".usrcrd");
    idn = parentUsrCrd.getAttribute("data-id");
    fun = 'status';
    upd = target.innerHTML === "ACTIVE" ? 1 : 0;
    marker = target;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (upd === 1) {
            marker.innerHTML = "INACTIVE";
          } else {
            marker.innerHTML = "ACTIVE";
          }
        } else {
          alert('Error trying to update users status');
          console.log("Error: " + xhr.responseText);
        }
      }
    };

    xhr.open("POST", "/inc/userman.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("idn=" + idn + "&funct=" + fun + "&val=" + upd);
  }
});
document.getElementById("usrlist").addEventListener("click", function(event) {
  var target = event.target;
  if (target.classList.contains("pwdreset")) {
    indi = 1;
    // Update server to generate temporary password
    var parentUsrCrd = target.closest(".usrcrd");
    idn = parentUsrCrd.getAttribute("data-id");
    fun = 'pwdres';

    // Pop up shield
    document.getElementById("pop").classList.add("obscr");
    document.querySelector(".pwdresalrt").innerHTML = 'Generating Temporary Password';
    document.querySelector(".pwdresalrt").classList.remove("hide");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          document.querySelector(".pwdresalrt").innerHTML = 'New Password is <br><br>' + xhr.responseText;
        } else {
          document.querySelector(".pwdresalrt").innerHTML = 'ERROR WITH PASSWORD RESET';
          alert('Error trying to reset password');
          console.log("Error: " + xhr.responseText);
        }
      }
    };

    xhr.open("POST", "/inc/userman.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("idn=" + idn + "&funct=" + fun);
  }
});
//User edit items
document.querySelector(".usr_input").addEventListener("keyup", function() {
  var updName = document.getElementById("upd_name").value;
  var updEmail = document.getElementById("upd_email").value;
  var updScr = document.getElementById("upd_scrn");

  if (updName !== '' && updEmail !== '' && !updScr.classList.contains("invalid")) {
    if (nam !== updName || ema !== updEmail || scr !== updScr.value) {
      document.getElementById("usrupd").classList.remove("no-change");
    } else {
      document.getElementById("usrupd").classList.add("no-change");
    }
  } else {
    document.getElementById("usrupd").classList.add("no-change");
  }
});
document.getElementById("usrupd").addEventListener("click", function() {
  if (this.classList.contains("no-change")) {
    // No change action
  } else {
    var usrD = {};
    usrD.id = document.querySelector(".editusrcard").getAttribute("data-id");
    usrD.name = document.getElementById("upd_name").value;
    usrD.email = document.getElementById("upd_email").value;
    usrD.scr = document.getElementById("upd_scrn").value;
    var senBuild = JSON.stringify(usrD);
    console.log(senBuild);

    if (document.querySelector(".editusrcard").getAttribute("data-id") === '0') {
      document.getElementById("pop").classList.add("obscr");
      document.querySelector(".pwdresalrt").innerHTML = 'Creating New User';
      document.querySelector(".pwdresalrt").classList.remove("hide");
      document.querySelector(".passwrd_reset_splash").classList.remove("hide");
    } else {
      // Handle update case
    }

    // Send request and process
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.response);
        console.log(xhr.responseText);

        if (xhr.responseText.search('Error') > -1) {
          if (document.querySelector(".editusrcard").getAttribute("data-id") === "0") {
            document.querySelector(".pwdresalrt").innerHTML = 'Error creating user';
          } else {
            alert('Updating User Details Failed');
          }
        } else {
          if (document.querySelector(".editusrcard").getAttribute("data-id") === "0") {
            document.querySelector(".editusrcard").setAttribute("data-id", xhr.responseText.split("-")[1]);
            document.querySelector(".pwdresalrt").innerHTML = 'New User Created <br> Password is <br>' + xhr.responseText.split("-")[2];
            document.getElementById("usract").innerHTML = 'ACTIVE';
            document.getElementById("usract").classList.remove("no-change");
            document.getElementById("pwdchange").innerHTML = 'RESET PASSWORD';
            document.getElementById("pwdchange").classList.remove("no-change");
            document.getElementById("usrupd").innerHTML = "UPDATE";
            console.log(xhr.responseText);
          } else {
            alert('Updating User Details Success');
          }
          useridchk();
          nam = document.getElementById("upd_name").value;
          ema = document.getElementById("upd_email").value;
          scr = document.getElementById("upd_scrn").value;
          document.getElementById("usrupd").classList.add("no-change");
        }
      }
    };

    xhr.open("POST", "/inc/userupd.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(senBuild);
  }
});
document.getElementById("upd_scrn").addEventListener("blur", function() {
  if (document.getElementById("upd_scrn").value == '') {
    document.getElementById("upd_scrn").classList.remove("rejected", "approved");
    document.querySelector("label[for=upd_scrn]").classList.remove("lab_rejected", "lab_approved");
    document.querySelector("label[for=upd_scrn]").innerHTML = "Login Name";
  } else {
    var uScr = { id: document.querySelector(".editusrcard").getAttribute("data-id"), scr: document.getElementById("upd_scrn").value };
    var senBuild = JSON.stringify(uScr);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        console.log(xhr.responseText.search('Error'));
        var us_lab = document.querySelector("label[for=upd_scrn]");
        var upds = document.getElementById("upd_scrn");
        var usupd = document.getElementById("usrupd");

        if (xhr.responseText.search('Error') > -1) {
          console.log("rejected upd");
          // Password did not match; make box red
          upds.classList.remove("approved", "inp_std");
          us_lab.classList.remove("lab_approved");
          us_lab.classList.add("lab_rejected");
          us_lab.innerHTML = "DUPLICATE LOGIN NAME FOUND";
          usupd.classList.add("no-change");
        } else {
          console.log("Approved upd");
          // Password matched; make box green
          upds.classList.remove("rejected", "inp_std");
          us_lab.classList.remove("lab_rejected");
          us_lab.classList.add("lab_approved");
          us_lab.innerHTML = "LOGIN NAME UNIQUE";
          if (nam != document.getElementById("upd_name").value || ema != document.getElementById("upd_email").value || scr != document.getElementById("upd_scrn").value) {
            usupd.classList.remove("no-change");
          } else {
            usupd.classList.add("no-change");
          }
        }
      }
    };

    xhr.open("POST", "/inc/usrscrchk.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(senBuild);
  }
});
//pop up functions
document.getElementById("pop").addEventListener("click", function(event) {
  var pwdResAlert = event.target.closest(".pwdresalrt");
  if (pwdResAlert) {
    event.stopPropagation();
  }
});
document.getElementById("pop").addEventListener("click", function(event) {
  var passwrdChgSplash = event.target.closest(".passwrd_chg_splash");
  if (passwrdChgSplash) {
    event.stopPropagation();
  }
});
document.getElementById("pop").addEventListener("click", function () {
  if (indi === 0) {
    document.getElementById("pop").classList.remove("obscr");
    document.getElementById("passwrd_chg").classList.add('hide');
    document.querySelector(".pwdresalrt").classList.add("hide");
    document.querySelector(".passwrd_reset_splash").classList.add("hide");
  }
});

});
