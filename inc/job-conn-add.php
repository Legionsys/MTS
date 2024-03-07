<?php
//set vars and checks    
if (isset($_POST['jobno'])) {
    $jbno = trim(urldecode($_POST['jobno']));
};

require_once 'dbh.inc.php';

//check if jobnumber is not 0, and is a number

//insert new line into conNotes table and get the ID
$sql = "INSERT INTO conNotes (jobID,snam,sadd1,sadd2,sadd3,sst,spc,sCtc,sPh,rnam,radd1,radd2,radd3,rst,rpc,rCtc,rPh) select jobID,cnam,cadd1,cadd2,cadd3,cst,cpc,cCtc,cPh,dnam,dadd1,dadd2,dadd3,dst,dpc,dCtc,dPh from jobList where jobID = ?;";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {

    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "s", $jbno);
mysqli_stmt_execute($stmt);
//return 'instered';
$resultData = mysqli_insert_id($conn);
mysqli_stmt_close($stmt);
if ($resultData != null ) {
    $num = "E".sprintf('%05d', $resultData);
    $sql = "UPDATE conNotes set cnNum=? WHERE cnID=?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "si", $num, $resultData);
    
    mysqli_stmt_execute($stmt);    
    mysqli_stmt_close($stmt);
    $sql = "SELECT a.*,b.titm,b.twgt,b.tcub FROM conNotes a LEFT JOIN (select cnID,sum(ifnull(noItem,0)) as titm,sum(ifnull(itWgt,0)) as twgt,sum(ifnull((itLen*itWid*itHei*itQty)/1000000,0)) as tcub from conDets WHERE frtDie is Null group by cnID) b on a.cnID = b.cnID WHERE a.cnID = ? order by cnID;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        echo "<script>console.log('Error with return');</script>";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "i", $resultData);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($resultData) > 0){
        while ($row = mysqli_fetch_assoc($resultData)) {
            $emparray[] = $row;
        }
        echo json_encode($emparray);
    } else {
        $result = false;
        echo "<script>console.log('Error or Zero rows for job ".$job." using ind ".$indi."');</script>";     
    }


    //echo $resultData;

    //echo '<div data-id="'.$resultData.'" class="ccnt_card"><div class="cnnum">'.$num.'</div><div class="cnscomp">Blank</div><div class="cnrcomp">Blank</div>';
    //echo '<div class="cnitm">0 itms</div><div class="cnwgt">0 kg</div><div class="cnm3">0 m3</div></div>';   
    
    //return $resultData;
} else {
    return "ERROR";
    exit();
}
//mysqli_stmt_close($stmt);




?>