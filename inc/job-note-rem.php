<?php
//set vars and checks    
if (isset($_POST["jnid"])) {
    $jnid = trim($_POST["jnid"]);
} else {
    echo "ERROR";
    exit();
}

require_once 'dbh.inc.php';
$ddate = date('Y-m-d');
$sql = "UPDATE jobNote set jnDie = ? WHERE jnID = ?;";
$stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ss", $ddate,$jnid);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_affected_rows($stmt) > 0) {
        echo "success";
    } else {
        echo "ERROR";
    }
    
    mysqli_stmt_close($stmt);

/*

    //return 'instered';
    $resultData = mysqli_insert_id($conn);

    if ($resultData != null ) {
        return "success";
    } else {
        return "ERROR";
        exit();
    }
    mysqli_stmt_close($stmt);
*/
?>