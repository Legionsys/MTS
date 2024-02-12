<?php
//set vars and checks    
if (isset($_POST["txt"])) {
    $ntxt = trim($_POST["txt"]);
};

if (isset($_POST['jobno'])) {
    $jbno = trim($_POST['jobno']);
};
if (isset($_POST['amt'])) {
    $namt = trim($_POST['amt']);
};
require_once 'dbh.inc.php';

//Check max Ord Number for notes on Job
$sql = "SELECT max(jnOrd) as MaxOrd FROM jobNote WHERE jobID = ?;";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    echo "<script>console.log('Error with Checking max ord');</script>";
    exit();
}

mysqli_stmt_bind_param($stmt, "s", $jbno);
mysqli_stmt_execute($stmt);

$resultData = mysqli_stmt_get_result($stmt);
if ($row = mysqli_fetch_assoc($resultData)) {
    $ord = $row['MaxOrd'];        
} else {
    $ord = 0;
}
mysqli_stmt_close($stmt); 
if ($ord == null) {
    $ord = 0;
}

$ord = $ord + 1;
//set up correct statement
if ($ntxt == '' and $namt != '') {
    $sql = "INSERT INTO jobNote (jobID,jnAmt,jnOrd) VALUES (?,?,?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "sss", $jbno,$namt,$ord);
    mysqli_stmt_execute($stmt);
} elseif ($ntxt != '' and $namt == '') {
    $sql = "INSERT INTO jobNote (jobID,jnNote,jnOrd) VALUES (?,?,?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "sss", $jbno,$ntxt,$ord);
    mysqli_stmt_execute($stmt);
} else {
    $sql = "INSERT INTO jobNote (jobID,jnNote,jnAmt,jnOrd) VALUES (?,?,?,?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ssss", $jbno,$ntxt,$namt,$ord);
    mysqli_stmt_execute($stmt);
}

//return 'instered';
$jnid = mysqli_insert_id($conn);

mysqli_stmt_close($stmt);
$sql = "select * from jobNote where jnID = ?;";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt, $sql)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmt);
    exit();
}
// Bind parameter
mysqli_stmt_bind_param($stmt, "i", $jnid);

// Execute the query
mysqli_stmt_execute($stmt);

// Get result
$resultSelect = mysqli_stmt_get_result($stmt);

// Check if the retrieved data matches the inserted data
$updatedData = mysqli_fetch_assoc($resultSelect);

// Return inserted data in JSON format
echo json_encode($updatedData);

mysqli_stmt_close($stmt);
mysqli_close($conn);

/*
if ($namt != null) {
    $namt = number_format($namt,2);
}

if ($resultData != null ) {
    echo '<div class="draggable-item tr" draggable="true" ondragstart="dragStart(event)" data-id="'.$resultData.'" data-ord="'.$ord.'"><div class="drag-handle"><img class="scroll_img" alt="Move Note" src="/img/scroll.png"></div>';
    echo '<div contenteditable="true" data-col="jnNote" class="ncol td">'.$ntxt.'</div>';
    echo '<div contenteditable="true" data-col="jnAmt" class="namt td">'.$namt.'</div>';
    echo '<div class="ntra td"><div class="cmd_img" data-id="'.$resultData.'"><img class="ntrash" class="nbut" alt="Delete Note" src="/img/trash.svg"></div></div></div>';
} else {
    echo "<script>console.log('Error with adding');</script>";
    exit();
}
mysqli_stmt_close($stmt);
*/


?>