<?php 
if (isset($_POST['job'])) {
    $job = trim($_POST['job']);
};
if (isset($_POST['mrkr'])) {
    $mrkr = trim($_POST['mrkr']);
};

require_once 'dbh.inc.php';
require_once 'jobfunct.inc.php';

if ($job != "" && $mrkr != "") {
    //Check if tag exists
    jobTag($conn, $job, $mrkr);    
} else {
    echo "Error: Missing job or mrkr";
}

?>