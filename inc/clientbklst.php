<?php
//set vars and checks    
if (isset($_POST['stxt'])) {
    $stxt = trim($_POST['stxt']);
};
$emparray = array();
require_once 'dbh.inc.php';

$stxt = str_replace(" and ","%",$stxt);
$stxt = str_replace(" AND ","%",$stxt);
$stxt = str_replace(" And ","%",$stxt);

//$sql = "SELECT a.cnID,a.cnNum,a.snam,a.rnam,sum(ifnull(b.noItem,0)) as titm,sum(ifnull(b.itWgt,0)) as twgt,sum(ifnull((b.itLen*b.itWid*b.itHei*b.itQty)/1000000,0)) as tcub FROM conNotes a LEFT JOIN conDets b on a.cnID = b.cnID WHERE a.jobID = $jbno group by a.cnID,a.cnNum,a.snam,a.rnam;";

$sql = "SELECT DISTINCT a.clientName,b.contd,b.contPh,b.contEm,b.contEm2,max(b.jobID) FROM clientList a LEFT JOIN jobList b on a.clientId = b.clientId WHERE a.act='1' and pmrk is null and CONCAT(ifnull(a.clientName,''),ifnull(b.contd,''),ifnull(b.contPh,''),ifnull(b.cCtc,''),ifnull(b.cCtc2,'')) like '%$stxt%' Group by a.clientName,b.contd,b.contPh,b.contEm,b.contEm2 order by max(b.jobID) DESC limit 10;";

//$sql = "SELECT * FROM conNotes WHERE jobID = $jbno;";
//echo "<script>console.log('".$sql."')</script>";
$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    $c = 0;
    while ($row = mysqli_fetch_assoc($resultData)) {
        //echo '<div class="contcard"><div class="lstcli">'.$row['clientName'].'</div><div class="lstcont">'.$row['contd'].'</div><div class="lstcph">'.$row['contPh'].'</div><div class="lstctc">'.$row['contEm'].'</div><div class="lstctc2">'.$row['contEm2'].'</div></div>';
        $emparray[] = $row;
        $c++;
        if ($c > 9) {
            break;
        }

    } 
    echo json_encode($emparray);
}
?>