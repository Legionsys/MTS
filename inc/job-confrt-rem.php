<?php
//set vars and checks    
if (isset($_POST["frid"])) {
    $frid = trim($_POST["frid"]);
};

require_once 'dbh.inc.php';

$sql = "UPDATE conDets set frtDie = ? WHERE itID = ?;";
$stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ss", date('Y-m-d'),$frid);
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