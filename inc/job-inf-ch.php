<?php
//set vars and checks    
    $newd = $jbno = $jcol = NULL;
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
        die("ERROR: " . mysqli_error($conn));
    }
    mysqli_stmt_bind_param($stmt, "si", $newd,$jbno);
    mysqli_stmt_execute($stmt);

    if (mysqli_affected_rows($conn) > 0) {
        mysqli_stmt_close($stmt);
    
        $sql = "SELECT " . $jcol . " FROM jobList WHERE jobID = ?";
        $stmt = mysqli_stmt_init($conn);
    
        if (mysqli_stmt_prepare($stmt, $sql)) {
            mysqli_stmt_bind_param($stmt, "i", $jbno);
            mysqli_stmt_execute($stmt);
    
            $resultData2 = mysqli_stmt_get_result($stmt);
    
            if ($row = mysqli_fetch_assoc($resultData2)) {
                if ($row[$jcol] == $newd) {
                    echo "success";
                } else {
                    echo "error";
                }
            }
        } else {
            die("ERROR: " . mysqli_error($conn));
        }
        mysqli_stmt_close($stmt);
    } else {
        die("ERROR: Update failed");
    }
    
    // Close the database connection
    mysqli_close($conn);
    ?>
   