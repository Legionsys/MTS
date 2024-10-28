var srchAll;
var srchCli;
var srchTag;
var srchInv;
var srchJob;
var actcli = [];
var inact = [];
var acttag = [];
var hidtag = [];
var srchTags = [];

function joblstUpd() {
  var wild = document.getElementById("search-all").value;
  var cli = srchCli;
  var job = srchJob;
  var inv = srchInv;
  var tags = srchTags.join(',');
  

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure it: specify the request type (POST), the URL, and whether it should be asynchronous
  xhr.open("POST", "/inc/job-summ-upd.php", true);

  // Set the request header for the form data
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Define the callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Update the content of the element with the response data
      document.getElementById("job_board").innerHTML = xhr.responseText;
      //document.getElementById("nav-title").innerHTML = "Job Management Sheets - " + new Date().getTime().toString();
    }
  };

  // Convert the data to a URL-encoded string
  var formData = "wild=" + encodeURIComponent(wild) + "&cli=" + encodeURIComponent(cli) + "&job=" + encodeURIComponent(job) + "&inv=" + encodeURIComponent(inv) + "&tags=" + encodeURIComponent(tags);

  // Send the request with the form data
  xhr.send(formData);
}
function urlUpdate() {
  var filters = [];

  // Handle 'wild' parameter
  if (srchAll !== 'null' && srchAll !== false) {
    filters.push('wild=' + encodeURIComponent(srchAll));
  } else {
    filters.push('wild=null');
  }

  // Handle 'cli' parameter
  if (srchCli !== 'null' && srchCli !== false) {
    filters.push('cli=' + encodeURIComponent(srchCli));
  } else {
    filters.push('cli=null');
  }

  // Handle 'inv' parameter
  if (srchInv !== 'null' && srchInv !== false) {
    filters.push('inv=' + encodeURIComponent(srchInv));
  } else {
    filters.push('inv=null');
  }

  // Handle 'job' parameter
  if (srchJob !== 'null' && srchJob !== false) {
    filters.push('job=' + encodeURIComponent(srchJob));
  } else {
    filters.push('job=null');
  }

  // Handle 'tags' parameter
  if (srchTags.length > 0) {
    filters.push('tags=' + encodeURIComponent(srchTags.join(',')));
  } else {
      filters.push('tags=null');
  }


  // Construct the new URL
  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + filters.join('&');

  // Update the URL without reloading the page
  window.history.pushState({ path: newurl }, '', newurl);
}

function cliupd() {
  var xhr = new XMLHttpRequest();

  // Configure the request: specify the request type (GET) and the URL
  xhr.open("GET", "/inc/lstcli.php", true);

  // Define the callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Parse the JSON response
      var clients = JSON.parse(xhr.responseText);
      // Iterate over the clients array
      clients.forEach(function (v) {
        if (v.act === "1") {
          actcli.push(v);
        } else {
          inact.push(v);
        }

        // Update the HTML if srchCli matches
        if (srchCli == v.clientId) {
          document.getElementById("clisel").innerHTML = v.clientName;
        }
      });

      // Uncomment the following line if you want to log actcli
      // console.log(actcli);
    }
  };

  // Send the request
  xhr.send();

  // Use the `onload` event to ensure that the request is completed before calling clilstupd
  xhr.onload = function () {
    clilstupd();
  };
}

function clilstupd() {
  var searchCliValue = document.getElementById('search-cli').value.toLowerCase();

  // Clear the content of the elements
  document.getElementById("actclilst").innerHTML = "";
  document.getElementById("deaclilst").innerHTML = "";

  // Iterate over the 'actcli' array
  actcli.forEach(function (v) {
    if (searchCliValue === '' || v.clientName.toLowerCase().includes(searchCliValue)) {
      // Append content to 'actclilst' based on search criteria
      document.getElementById("actclilst").innerHTML +=
        '<div class="selCli" data-id="' + v.clientId + '"><div class="scname">' + v.clientName + '</div><div class="vtog"><img src="img/hide.svg" alt="hide client"></div></div>';
    }
  });

  // Iterate over the 'inact' array
  inact.forEach(function (v) {
    if (searchCliValue === '' || v.clientName.toLowerCase().includes(searchCliValue)) {
      // Append content to 'deaclilst' based on search criteria
      document.getElementById("deaclilst").innerHTML +=
        '<div class="selCli" data-id="' + v.clientId + '"><div class="scname">' + v.clientName + '</div><div class="vtog"><img src="img/view.svg" alt="view client"></div></div>';
    }
  });
}
/*
function tagupd() {
  var xhr = new XMLHttpRequest();
  var param1 = encodeURIComponent("flist");
  var param2 = encodeURIComponent("0");

  xhr.open("GET", `/inc/jtags.php?action=${param1}&job=${param2}`, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      try {
        // Parse the JSON response as an object
        var response = JSON.parse(xhr.responseText);

        acttag = [];
        hidtag = [];

        // Access the tags array inside the response object
        if (Array.isArray(response.tags)) {
          response.tags.forEach(function (v) {
            if (!v.hide) {
              acttag.push(v);
            } else {
              hidtag.push(v);
            }

            if (srchTag == v.tag) {
              document.getElementById("tagsel").innerHTML = v.tag;
            }
          });
        } else {
          console.error("Expected an array but received:", response.tags);
        }


      } catch (error) {
        console.error("Error parsing JSON response:", error);
      }
    }
  };

  xhr.send();

  xhr.onload = function () {
    taglstupd();
  };
}
*/

/*function tagupd() {
  var xhr = new XMLHttpRequest();
  var param1 = encodeURIComponent("flist"); // Replace "value1" with the actual value you want to send
  var param2 = encodeURIComponent("0");
  // Configure the request: specify the request type (GET) and the URL
  xhr.open("GET", `/inc/jtags.php?action=${param1}&job=${param2}`, true);

  // Define the callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Parse the JSON response

      var tags = JSON.parse(xhr.responseText);
      console.log(tags);

      acttag = [];
      hidtag = [];
      // Iterate over the clients array
      tags.forEach(function (v) {
        if (v.hide == "") {
          acttag.push(v);
        } else {
          hidtag.push(v);
        }

        // Update the HTML if srchCli matches
        if (srchTag == v.tag) {
          document.getElementById("tagsel").innerHTML = v.tag;
        }
      });
      console.log(acttag);
      console.log(hidtag);
      // Uncomment the following line if you want to log actcli
      // console.log(actcli);
    }
  };

  // Send the request
  xhr.send();

  // Use the `onload` event to ensure that the request is completed before calling clilstupd
  xhr.onload = function () {
    taglstupd();
  };
}*/
/*
function taglstupd() {
  var searchTagValue = document.getElementById('search-tag').value.toLowerCase();

  // Clear the content of the elements
  document.getElementById("acttaglst").innerHTML = "";
  document.getElementById("deataglst").innerHTML = "";
  console.log(searchTagValue);
  if (searchTagValue === '') {
    console.log('srch val = blank');
  }
  // Iterate over the 'actcli' array
  acttag.forEach(function (v) {
    if (searchTagValue === '' || v.tag.toLowerCase().includes(searchTagValue)) {
      // Append content to 'actclilst' based on search criteria
      document.getElementById("acttaglst").innerHTML +=
        '<div class="selTag" data-tag="' + v.tag + '"><div class="stname">' + v.tag + '</div><div class="vtog"><img src="img/hide.svg" alt="hide tag"></div></div>';
    }
  });

  // Iterate over the 'inact' array
  hidtag.forEach(function (v) {
    if (searchTagValue === '' || v.tag.toLowerCase().includes(searchTagValue)) {
      // Append content to 'deaclilst' based on search criteria
      document.getElementById("deataglst").innerHTML +=
        '<div class="selCli" data-id="' + v.tag + '"><div class="stname">' + v.tag + '</div><div class="vtog"><img src="img/view.svg" alt="view tag"></div></div>';
    }
  });
}
*/

function getUrlParameter(sParam) {
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
}
function toggleTagVisibility() {
  var dropdown = document.getElementById('tagFilterDropdown');
  var visible = document.getElementById('visibleTags');
  var hidden = document.getElementById('hiddenTags');

  // Toggle the main dropdown visibility
  if (dropdown.style.display === 'none' || dropdown.style.display === '') {
    dropdown.style.display = 'block';  // Show the dropdown if it's hidden
    visible.style.display = 'block';   // Start with visible tags shown
    hidden.style.display = 'none';     // Hide the hidden tags initially
  } else {
    dropdown.style.display = 'none';   // Hide the entire dropdown if it's shown
  }
}
function fetchTags() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/jtags.php?action=flist&job=0', true); // Replace <jobNumber> with the actual job number variable

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);

      // Separate tags into visible and hidden based on `hide` column
      var tags = response.tags.map(tag => ({
        name: tag.tag,
        visible: tag.hide === null  // Visible if hide is null
      }));

      updateTagList(tags); // Pass sorted tags to updateTagList function
    }
  };

  xhr.send();
}
function updateTagList(tags) {
  // Get the container elements for visible and hidden tags
  var visibleTagContainer = document.getElementById('visibleTags');
  var hiddenTagContainer = document.getElementById('hiddenTags');

  // Clear any existing tags in both containers
  visibleTagContainer.innerHTML = '';
  hiddenTagContainer.innerHTML = '';

  // Loop through each tag in the array
  tags.forEach(function (tag) {
    // Create a div element for each tag
    var tagElement = document.createElement('div');
    tagElement.innerHTML = tag.name;
    tagElement.classList.add('tag-item');
    tagElement.onclick = function () {
      selectTag(tag.name);  // Calls selectTag when the tag is clicked
    };

    // Append the tag to the appropriate container based on visibility
    if (tag.visible) {
      visibleTagContainer.appendChild(tagElement);
    } else {
      hiddenTagContainer.appendChild(tagElement);
    }
  });
}
function selectTag(tag) {
  // Set the selected tag in srchTags (limited to one tag for now)
  srchTags = [tag];

  // Update the URL with the selected tag filter
  urlUpdate();

  // Refresh the job list with the new filter
  joblstUpd();
}
window.onload = function () {
  srchAll = getUrlParameter('wild');
  srchInv = getUrlParameter('inv');
  srchJob = getUrlParameter('job');
  srchCli = getUrlParameter('cli');
  
  var tagsParam = getUrlParameter('tags');
    srchTags = tagsParam ? tagsParam.split(',') : [];

  
  // Update the value of the search-all input
  if (srchAll !== "null" && srchAll !== false) {
    document.getElementById("search-all").value = srchAll;
  } else {
    srchAll = 'null';
  }

  // Handle srchInv and set the corresponding radio button
  if (srchInv === "null" || srchInv === false) {
    srchInv = 'All';
  }
  var invTogRadio = document.querySelector("input[name='inv_Tog'][value='" + srchInv + "']");
  if (invTogRadio) {
    invTogRadio.checked = true;
  }

  // Handle srchJob and set the corresponding radio button
  if (srchJob === "null" || srchJob === false) {
    srchJob = 'Act';
  }
  var jobTogRadio = document.querySelector("input[name='job_Tog'][value='" + srchJob + "']");
  if (jobTogRadio) {
    jobTogRadio.checked = true;
  }

  // Call the functions joblstUpd and cliupd
  joblstUpd();
  cliupd();
  //tagupd();
};
// Add a popstate event listener to handle the back button navigation
window.addEventListener('popstate', function(event) {
  joblstUpd(); // Refresh the job list when the user navigates back
  cliupd(); // Refresh the client list when the user navigates back
  //tagupd();
  fetchTags(); //Refresh the tags list when the user navigates back
});

document.addEventListener("DOMContentLoaded", function () {
  //search update
  document.getElementById("search-all").addEventListener("keyup", function () {
    srchAll = document.getElementById("search-all").value;
    joblstUpd();
  });
  document.getElementById("search-all").addEventListener("change", function () {
    urlUpdate();
  });

  var radioInputs = document.querySelectorAll("input[type='radio']");
  radioInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      srchInv = document.querySelector("input[name='inv_Tog']:checked").value;
      srchJob = document.querySelector("input[name='job_Tog']:checked").value;
      urlUpdate();
      joblstUpd();
    });
  });

  document.getElementById("search-cli").addEventListener("keyup", function () {
    clilstupd();
  });

  document.getElementById("clisel").addEventListener("click", function (event) {
    event.stopPropagation();
    document.getElementById("clilst").classList.remove("hidden");
    var value = document.getElementById("search-cli").value;
    document.getElementById("search-cli").focus();
    document.getElementById("search-cli").value = value;
  });

  /*document.getElementById("tagsel").addEventListener("click", function (event) {
    event.stopPropagation();
    document.getElementById("taglst").classList.remove("hidden");
    var value = document.getElementById("search-cli").value;
    document.getElementById("search-tag").focus();
    document.getElementById("search-tag").value = value;
  });*/

  document.body.addEventListener("click", function () {
    console.log("body click");
    document.getElementById("clilst").classList.add("hidden");
    //document.getElementById("taglst").classList.add("hidden");
  });

  document.getElementById("clilst").addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.querySelector(".clilstr").addEventListener("click", function () {
    if (document.getElementById("actclilst").classList.contains("hidden")) {
      document.getElementById("actclilst").classList.remove("hidden");
      document.getElementById("deaclilst").classList.add("hidden");
      document.getElementById("actimg").innerHTML = '<img src="img/down.svg" alt="Open list">';
      document.getElementById("decimg").innerHTML = '<img src="img/left.svg" alt="Open list">';
    } else {
      document.getElementById("deaclilst").classList.remove("hidden");
      document.getElementById("actclilst").classList.add("hidden");
      document.getElementById("decimg").innerHTML = '<img src="img/down.svg" alt="Open list">';
      document.getElementById("actimg").innerHTML = '<img src="img/left.svg" alt="Open list">';
    }
  });

  document.getElementById("cliclr").addEventListener("click", function () {
    srchCli = 'null';
    document.getElementById("clisel").innerHTML = '';
    document.getElementById("search-cli").value = '';
    urlUpdate();
    joblstUpd();
  });

  /*document.getElementById("tagclr").addEventListener("click", function () {
    srchTag = 'null';
    document.getElementById("tagsel").innerHTML = '';
    document.getElementById("search-tag").value = '';
    urlUpdate();
    joblstUpd();
  });*/

  document.getElementById("clilst").addEventListener("click", function (event) {
    if (event.target.classList.contains("scname")) {
      console.log(event.target.closest(".selCli").getAttribute("data-id"));
      console.log(event.target.innerHTML);
      srchCli = event.target.closest(".selCli").getAttribute("data-id");
      document.getElementById("clisel").innerHTML = event.target.innerHTML;
      document.getElementById("clilst").classList.add("hidden");
      urlUpdate();
      joblstUpd();
    }
  });

  /*document.getElementById("taglst").addEventListener("click", function (event) {
    if (event.target.classList.contains("stname")) {
      console.log(event.target.closest(".seltag").getAttribute("data-id"));
      console.log(event.target.innerHTML);
      srchCli = event.target.closest(".selTag").getAttribute("data-id");
      document.getElementById("tagsel").innerHTML = event.target.innerHTML;
      document.getElementById("taglst").classList.add("hidden");
      urlUpdate();
      joblstUpd();
    }
  });*/

  document.getElementById("clilst").addEventListener("click", function (event) {
    console.log(event.target);
    if (event.target.classList.contains("vtog") || event.target.parentNode.classList.contains("vtog")) {
      if (!event.target.classList.contains("vtog")) {
        target = event.target.parentNode;
      } else {
        target = event.target;
      }
      event.stopPropagation();
      console.log('vtogclick - ' + target.closest(".selCli").getAttribute("data-id"));
      console.log('vtogclick - ' + target.closest(".selCli").parentNode.getAttribute("id"));
      console.log(target.closest(".selCli").parentNode.getAttribute("id").substring(0, 3));
      var obj = {};
      var ind = 0;
      var clId = target.closest(".selCli").getAttribute("data-id");

      //check if Active of Deactive list
      if (target.closest(".selCli").parentNode.getAttribute("id").substring(0, 3) == 'act') {
        //if Active
        inact.unshift(actcli[actcli.findIndex(x => x.clientId === clId)]);
        actcli = actcli.filter(function (e) {
          return e.clientId != clId;
        });
      } else if (target.closest(".selCli").parentNode.getAttribute("id").substring(0, 3) == 'dea') {
        //If Deactivated
        ind = 1;
        actcli.unshift(inact[inact.findIndex(x => x.clientId === clId)]);
        inact = inact.filter(function (e) {
          return e.clientId != clId;
        });
      } else {
        //Error thrown
        alert('Please note that there was an issue trying to update the status of the selected client. Please contact IT with the client name that you were trying to update.');
        return false;
      }
      clilstupd();
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/inc/cliact_upd.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
        }
      };
      xhr.send("cli=" + clId + "&mkr=" + ind);
    }
  });
});