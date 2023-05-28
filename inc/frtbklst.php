<?php
//set vars and checks    
if (isset($_POST['stxt'])) {
    $stxt = trim($_POST['stxt']);
};

require_once 'dbh.inc.php';

$stxt = str_replace(" and ","%",$stxt);
$stxt = str_replace(" AND ","%",$stxt);
$stxt = str_replace(" And ","%",$stxt);

//$sql = "SELECT a.cnID,a.cnNum,a.snam,a.rnam,sum(ifnull(b.noItem,0)) as titm,sum(ifnull(b.itWgt,0)) as twgt,sum(ifnull((b.itLen*b.itWid*b.itHei*b.itQty)/1000000,0)) as tcub FROM conNotes a LEFT JOIN conDets b on a.cnID = b.cnID WHERE a.jobID = $jbno group by a.cnID,a.cnNum,a.snam,a.rnam;";

$sql = "SELECT DISTINCT senRef,noItem,psn,itWgt,itLen,itWid,itHei,itQty,unNum,class,sRisk,pkGr,pkDes FROM `conDets` WHERE CONCAT(ifnull(senRef,''),ifnull(noItem,''),ifnull(psn,''),ifnull(itWgt,''),ifnull(itLen,''),ifnull(itWid,''),ifnull(itHei,''),ifnull(itQty,''),ifnull(unNum,''),ifnull(class,''),ifnull(sRisk,''),ifnull(pkGr,''),ifnull(pkDes,'')) like '%$stxt%' limit 10;";

//$sql = "SELECT * FROM conNotes WHERE jobID = $jbno;";
//echo "<script>console.log('".$sql."')</script>";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    $c = 0;
    while ($row = mysqli_fetch_assoc($resultData)) {

        echo '<div class="frtLne"><div data-marker="senRef" class="frtl bksenRef senRef">'.$row['senRef'].'</div><div data-marker="noItem" class="frtl bknoItem noItem">'.$row['noItem'].'</div><div data-marker="psn" class="frtl bkpsn psn">'.$row['psn'].'</div><div data-marker="itWgt" class="frtl bkitWgt itWgt">'.$row['itWgt'].'</div><div data-marker="itLen" class="frtl bkitLen itLen">'.$row['itLen'].'</div><div data-marker="itWid" class="frtl bkitWid itWid">'.$row['itWid'].'</div><div data-marker="itHei" class="frtl bkitHei itHei">'.$row['itHei'].'</div><div data-marker="itQty" class="frtl bkitQty itQty">'.$row['itQty'].'</div><div data-marker="unNum" class="frtl bkunNum unNum">'.$row['unNum'].'</div><div data-marker="class" class="frtl bkclass class">'.$row['class'].'</div><div data-marker="sRisk" class="frtl bksRisk sRisk">'.$row['sRisk'].'</div><div data-marker="pkGr" class="frtl bkpkGr pkGr">'.$row['pkGr'].'</div><div data-marker="pkDes" class="frtl bkpkDes pkDes">'.$row['pkDes'].'</div></div>';
        $c++;
        if ($c > 9) {
            break;
        }

    } 
    
}
?>