<?php
//set vars and checks    
if (isset($_POST['jbno'])) {
    $jbno = trim($_POST['jbno']);
};
if (isset($_POST['chkcn'])) {
    $cnl = trim($_POST['chkcn']);
};
$cnl = "," . $cnl . ",";
require_once 'dbh.inc.php';

if ($jbno != 0) {
    
    $sql = "SELECT a.cnID,a.cnNum,a.snam,a.rnam,b.titm,b.twgt,b.tcub
    FROM conNotes a 
    LEFT JOIN (select cnID,sum(ifnull(noItem,0)) as titm,sum(ifnull(itWgt,0)) as twgt,sum(ifnull((itLen*itWid*itHei*itQty)/1000000,0)) as tcub from conDets WHERE frtDie is Null group by cnID) b on a.cnID = b.cnID 
    WHERE a.jobID = $jbno group by a.cnID,a.cnNum,a.snam,a.rnam order by cnID;";

    //$sql = "SELECT a.cnID,a.cnNum,a.snam,a.rnam,sum(ifnull(b.noItem,0)) as titm,sum(ifnull(b.itWgt,0)) as twgt,sum(ifnull((b.itLen*b.itWid*b.itHei*b.itQty)/1000000,0)) as tcub FROM conNotes a LEFT JOIN conDets b on a.cnID = b.cnID WHERE a.jobID = $jbno and frtDie is Null group by a.cnID,a.cnNum,a.snam,a.rnam order by cnID;";
    //$sql = "SELECT * FROM conNotes WHERE jobID = $jbno;";
    //echo "<script>console.log('".$sql."')</script>";
    $resultData = mysqli_query($conn,$sql);
    if (mysqli_num_rows($resultData) > 0){
        while ($row = mysqli_fetch_assoc($resultData)) {
            echo '<div data-id="'.$row['cnID'].'" class="ccnt_card"><div class="cnnum">'.$row['cnNum'].'</div><input type="checkbox" class="mcnprnt" name="mprint" value="'.$row['cnID']; 
            if (strpos($cnl, "," . $row['cnID'] . ",") > -1) {
                echo '" checked><div class="cnscomp">'.$row['snam'].'</div>';
            } else {
                echo '"><div class="cnscomp">'.$row['snam'].'</div>';
            }
            
            echo '<div class="cnrcomp">'.$row['rnam'].'</div><div class="cnitm">'.$row['titm'].' itms</div><div class="cnwgt">'.$row['twgt'].' kg</div><div class="cnm3">'.round($row['tcub'],3,PHP_ROUND_HALF_UP).' m3</div></div>';
        } 
        
    }
};
?>