<?php
//set vars and checks    
if (isset($_POST['jbn'])) {
    $job = trim($_POST['jbn']);
};
if (isset($_POST['indi'])) {
    $indi = trim($_POST['indi']);
};
$emparray = array();
require_once 'dbh.inc.php';

if ($indi == "job") {
    $sql = "SELECT clientName AS client, jobRef, contd AS cliContact, contPh AS cliContPh, contEm AS cliContEm, contEm2 AS cliContEm2, jobDate AS puDate, jobFin AS doDate, jobComp AS ac_cb, jobInv AS inv_c, invNum as InvNum, cnam, cadd1, cadd2, cadd3, cst, cpc, cCtc, cPh, cEm, cCtc2 AS j_r_ct2, cPh2 AS j_r_ph2, cEm2 AS j_r_em2, dnam, dadd1, dadd2, dadd3, dst, dpc, dCtc, dPh, dEm, dCtc2 as j_e_ct2, dPh2 AS j_e_ph2, dEm2 AS j_e_em2, cnmrk FROM jobList LEFT JOIN clientList on jobList.clientId=clientList.clientId WHERE jobID = ? limit 1;";
} elseif ($indi == "sup") {
    $sql = "SELECT * FROM jobSup WHERE jobID = ? order by jsID desc;";
} elseif ($indi == "not") {
    $sql = "SELECT * FROM jobNote WHERE jobID = ? and jnDie is null order by jnOrd;";
} elseif ($indi == "con") {
    $sql = "SELECT a.*,b.titm,b.twgt,b.tcub FROM conNotes a LEFT JOIN (select cnID,sum(ifnull(noItem,0)) as titm,sum(ifnull(itWgt,0)) as twgt,sum(ifnull((itLen*itWid*itHei*itQty)/1000000,0)) as tcub from conDets WHERE frtDie is Null group by cnID) b on a.cnID = b.cnID WHERE a.jobID = ? order by cnID;";
} elseif ($indi == "frt") {
    $sql = "SELECT * FROM conDets where cnID in (Select cnID from conNotes where jobID = ?) and frtDie is Null order by class desc,itID;";
} elseif ($indi == "cslnk") {
    $sql = "SELECT * FROM jobConSupLnk where cnID in (Select cnID from conNotes where jobID = ?) and deltime is Null order by cnid desc;";
}



//$sql = "SELECT * FROM conNotes where cnID=?";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt, $sql)) {
    error_log("SQL Prepare Error: " . mysqli_error($conn));
    echo "<script>console.log('SQL Prepare Error: " . mysqli_error($conn) . "');</script>";
    exit();
}
mysqli_stmt_bind_param($stmt, "i", $job);
if (!mysqli_stmt_execute($stmt)) {
    error_log("SQL Execution Error: " . mysqli_stmt_error($stmt));
    echo "<script>console.log('SQL Execution Error: " . mysqli_stmt_error($stmt) . "');</script>";
    exit();
}

$resultData = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($resultData) > 0) {
    while ($row = mysqli_fetch_assoc($resultData)) {
        $emparray[] = $row;
    }
    if (!empty($emparray)) {
        if (headers_sent()) {
            die("Headers already sent");
        }
        header('Content-Type: application/json');
        for ($i = 0; $i < count($emparray); $i++) {
            foreach ($emparray[$i] as $key => $value) {
                if (is_string($value)) {
                    $emparray[$i][$key] = cleanUTF8($value);
                }
            }
        }
        $jsonData = json_encode($emparray);
        if ($jsonData === false) {
            error_log("JSON encode failed: " . json_last_error_msg());
            echo json_encode(array("error" => "JSON encoding failed: " . json_last_error_msg()));
        } else {
            echo $jsonData;
        }
    } else {
        echo json_encode([]);
        //echo json_encode(array("error" => "No data found"));
    }
} else {
    echo json_encode([]);
    //echo json_encode(array("error" => "No results"));
}

mysqli_stmt_close($stmt);
