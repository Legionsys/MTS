<?php
//set vars and checks    
if (isset($_POST["jnid"])) {
    $jnid = trim($_POST["jnid"]);
};

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
    //return 'instered';
    $resultData = mysqli_insert_id($conn);

    if ($resultData != null ) {
        return $resultData;
    } else {
        return "ERROR";
        exit();
    }
    mysqli_stmt_close($stmt);

?>