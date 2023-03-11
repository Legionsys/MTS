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
        mysqli_stmt_close($stmt);

        $sql = "Select ".$jcol." from jobList WHERE jobID = ".$jbno;
        $resultData2 = mysqli_query($conn,$sql);
        if (mysqli_num_rows($resultData2) > 0){               
            while ($row = mysqli_fetch_assoc($resultData2)) {
            echo "data complete";
            return $row;
            //return $row[$jcol];

        } 

        }
        //return $resultData;
    } else {
        return "ERROR";
        exit();
    }
    mysqli_stmt_close($stmt);


?>