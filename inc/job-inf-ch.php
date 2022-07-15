<?php
//set vars and checks    
    if (isset($_POST["upd"])) {
        $newd = trim($_POST["upd"]);
    };

    if (isset($_POST['jobno'])) {
        $jbno = trim($_POST['jobno']);
    };
    if (isset($_POST['det'])) {
        $jcol = trim($_POST['det']);
    };
    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';
    

//check if ClientID exists
    if ($newd == '') {
        $newd = NULL;
    }

    $sql = "UPDATE jobList set ".$jcol." = ? WHERE jobID = ?;";
    //echo $newd." | ".$jbno." | ".$jcol;
    /*if ($jcol == "contd") {
        $sql = "UPDATE jobList set contd = ? WHERE jobID = ?;";
    } elseif ($jcol == "contPh") {
        $sql = "UPDATE jobList set contPh = ? WHERE jobID = ?;";
    } elseif ($jcol == "contEm") {
        $sql = "UPDATE jobList set contEm = ? WHERE jobID = ?;";
    } elseif ($jcol == "jobRef") {
        $sql = "UPDATE jobList set jobRef = ? WHERE jobID = ?;";
    } elseif ($jcol == "jobDate") {
        $sql = "UPDATE jobList set jobDate = ? WHERE jobID = ?;";
    } elseif ($jcol == "jobFin") {
        $sql = "UPDATE jobList set jobFin = ? WHERE jobID = ?;";
    } else {
        exit();        
    } */ 
//echo $sql;    
$stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "si", $newd,$jbno);
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