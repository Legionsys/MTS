<?php
//set vars and checks    
if (isset($_POST["cnum"])) {
    $cnum = trim($_POST["cnum"]);
};
if (isset($_POST['sref'])) {
    $sref = trim($_POST['sref']);
};
if (isset($_POST['nitm'])) {
    $nitm = trim($_POST['nitm']);
};
if (isset($_POST['psn'])) {
    $psn = trim($_POST['psn']);
};
if (isset($_POST['itWgt'])) {
    $itWgt = trim($_POST['itWgt']);
};
if (isset($_POST['itLen'])) {
    $itLen = trim($_POST['itLen']);
};
if (isset($_POST['itWid'])) {
    $itWid = trim($_POST['itWid']);
};
if (isset($_POST['itHei'])) {
    $itHei = trim($_POST['itHei']);
};
if (isset($_POST['itQty'])) {
    $itQty = trim($_POST['itQty']);
};
if (isset($_POST['unNum'])) {
    $unNum = trim($_POST['unNum']);
};
if (isset($_POST['dcls'])) {
    $dcls = trim($_POST['dcls']);
};
if (isset($_POST['sRisk'])) {
    $sRisk = trim($_POST['sRisk']);
};
if (isset($_POST['pkGr'])) {
    $pkGr = trim($_POST['pkGr']);
};
if (isset($_POST['pkDes'])) {
    $pkDes = trim($_POST['pkDes']);
};


require_once 'dbh.inc.php';

//
$sql = "INSERT INTO conDets (cnID,senRef,noItem,psn,itWgt,itLen,itWid,itHei,itQty,unNum,class,sRisk,pkGr,pkDes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "isisiiiiisssss", $cnum,$sref,$nitm,$psn,$itWgt,$itLen,$itWid,$itHei,$itQty,$unNum,$dcls,$sRisk,$pkGr,$pkDes);
mysqli_stmt_execute($stmt);
$resultData = mysqli_insert_id($conn);
if ($resultData == null) {
    echo "<script>alert('Error when trying to add row');</script>";
    exit();
}
mysqli_stmt_close($stmt);

//$sql = "SELECT * FROM conDets WHERE cnID = ? and frtDie is Null order by class desc;";
$sql = "SELECT * FROM conDets WHERE itID =?;";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "i", $resultData);
mysqli_stmt_execute($stmt);
$resultData = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($resultData) > 0){
    /*$titm = 0;
    $twgt = 0;
    $tcub = 0;

    while ($row = mysqli_fetch_assoc($resultData)) {
        echo '<tr data-id="'.$row['itID'].'"><td contenteditable="true" id="senRef" data-col="senRef" class="senRef">'.$row['senRef'].'</td><td contenteditable="true" id="noItem" data-col="noItem" class="noItem">'.$row['noItem'].'</td>';
        echo '<td contenteditable="true" id="psn" data-col="psn" class="psn">'.$row['psn'].'</td><td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt">'.$row['itWgt'].'</td><td contenteditable="true" id="itLen" data-col="itLen" class="itLen">'.$row['itLen'].'</td>';
        echo '<td contenteditable="true" id="itWid" data-col="itWid" class="itWid">'.$row['itWid'].'</td><td contenteditable="true" id="itHei" data-col="itHei" class="itHei">'.$row['itHei'].'</td><td contenteditable="true" id="itQty" data-col="itQty" class="itQty">'.$row['itQty'].'</td>';
        echo '<td contenteditable="true" id="unNum" data-col="unNum" class="unNum">'.$row['unNum'].'</td><td contenteditable="true" id="class" data-col="class" class="class">'.$row['class'].'</td><td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk">'.$row['sRisk'].'</td>';
        echo '<td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr">'.$row['pkGr'].'</td><td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes">'.$row['pkDes'].'</td><td class="cn_ctrls" data-col="cmd">';
        echo '<div class="cmd_img"><img class="cntrash" class="cnbut" alt="Delete Freight Note Line" src="/img/trash.svg"></div></td></tr>';


    }*/
    while ($row = mysqli_fetch_assoc($resultData)) {
        $emparray[] = $row;
    }
    echo json_encode($emparray); 
}
mysqli_stmt_close($stmt);
?>