<?php
//set vars and checks    
if (isset($_POST['cnid'])) {
    $cnid = trim($_POST['cnid']);
};

require_once 'dbh.inc.php';

$sql = "SELECT * FROM conDets where cnID=? and frtDie is Null order by class desc";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    echo "<script>console.log('Error with return');</script>";
    exit();
}
mysqli_stmt_bind_param($stmt, "i", $cnid);
mysqli_stmt_execute($stmt);

$resultData = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($resultData) > 0){
    $titm = 0;
    $twgt = 0;
    $tcub = 0;

    while ($row = mysqli_fetch_assoc($resultData)) {
        echo '<tr data-id="'.$row['itID'].'"><td contenteditable="true" id="senRef" data-col="senRef" class="senRef">'.$row['senRef'].'</td><td contenteditable="true" id="noItem" data-col="noItem" class="noItem">'.$row['noItem'].'</td>';
        echo '<td contenteditable="true" id="psn" data-col="psn" class="psn">'.$row['psn'].'</td><td contenteditable="true" id="itWgt" data-col="itWgt" class="itWgt">'.$row['itWgt'].'</td><td contenteditable="true" id="itLen" data-col="itLen" class="itLen">'.$row['itLen'].'</td>';
        echo '<td contenteditable="true" id="itWid" data-col="itWid" class="itWid">'.$row['itWid'].'</td><td contenteditable="true" id="itHei" data-col="itHei" class="itHei">'.$row['itHei'].'</td><td contenteditable="true" id="itQty" data-col="itQty" class="itQty">'.$row['itQty'].'</td>';
        echo '<td contenteditable="true" id="unNum" data-col="unNum" class="unNum">'.$row['unNum'].'</td><td contenteditable="true" id="class" data-col="class" class="class">'.$row['class'].'</td><td contenteditable="true" id="sRisk" data-col="sRisk" class="sRisk">'.$row['sRisk'].'</td>';
        echo '<td contenteditable="true" id="pkGr" data-col="pkGr" class="pkGr">'.$row['pkGr'].'</td><td contenteditable="true" id="pkDes" data-col="pkDes" class="pkDes">'.$row['pkDes'].'</td><td class="cn_ctrls" data-col="cmd">';
        echo '<div class="cmd_img"><img class="cntrash" class="cnbut" alt="Delete Freight Note Line" src="/img/trash.svg"></div></td></tr>';
    }
}
mysqli_stmt_close($stmt);
?>