<?php
//set vars and checks    
    if (isset($_POST['ccont'])) {
        $ccont = trim($_POST['ccont']);
    };

    if (isset($_POST['jobno'])) {
        $jbno = trim($_POST['jobno']);
    };
    require_once 'dbh.inc.php';

//check if ClientID exists
    if ($ccont == '') {
        $ccont = NULL;
    }
    $sql = "UPDATE jobList set contd = ? WHERE jobID = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ss", $ccont,$jbno);
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