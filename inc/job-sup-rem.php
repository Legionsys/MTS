<?php
//set vars and checks    
if (isset($_POST["id"])) {
    $jsid = trim($_POST["id"]);
};

require_once 'dbh.inc.php';

$sql = "Delete from jobSup WHERE jsID = ?;";
$stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $jsid);
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