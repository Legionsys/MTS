<?php
//set vars and checks    
    if (isset($_POST['cn'])) {
        $cnid = trim($_POST['cn']);
    };

    require_once 'dbh.inc.php';
    
//Copy main details and get new ID#
$sql = "INSERT INTO conNotes (jobID,snam,sadd1,sadd2,sadd3,sst,spc,sCtc,sPh,rnam,radd1,radd2,radd3,rst,rpc,rCtc,rPh,Pb,pAcc,pQuo,onam,oadd1,oadd2,oadd3,ost,opc,oCtc,oPh,osc)
select jobID,snam,sadd1,sadd2,sadd3,sst,spc,sCtc,sPh,rnam,radd1,radd2,radd3,rst,rpc,rCtc,rPh,Pb,pAcc,pQuo,onam,oadd1,oadd2,oadd3,ost,opc,oCtc,oPh,osc from conNotes where cnID =? ;";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "s", $cnid);
mysqli_stmt_execute($stmt);
$resultData = mysqli_insert_id($conn);
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

    //add all the lines from the original con-note
    $sql = "INSERT INTO conDets (cnID,senRef,noItem,psn,itWgt,itLen,itWid,itHei,itQty,unNum,class,sRisk,pkGr,pkDes)
    select ?,senRef,noItem,psn,itWgt,itLen,itWid,itHei,itQty,unNum,class,sRisk,pkGr,pkDes FROM conDets where cnID=? and frtDie is Null;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "si", $resultData,$cnid);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    echo $resultData;
} else {
    return "ERROR";
    exit();
}
?>