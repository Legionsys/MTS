<?php
//set vars and checks    
if (isset($_POST['stxt'])) {
    $stxt = trim($_POST['stxt']);
};

require_once 'dbh.inc.php';

$stxt = str_replace(" and ","%",$stxt);
$stxt = str_replace(" AND ","%",$stxt);
$stxt = str_replace(" And ","%",$stxt);
$stxt = str_replace("'","%",$stxt);

//$sql = "SELECT a.cnID,a.cnNum,a.snam,a.rnam,sum(ifnull(b.noItem,0)) as titm,sum(ifnull(b.itWgt,0)) as twgt,sum(ifnull((b.itLen*b.itWid*b.itHei*b.itQty)/1000000,0)) as tcub FROM conNotes a LEFT JOIN conDets b on a.cnID = b.cnID WHERE a.jobID = $jbno group by a.cnID,a.cnNum,a.snam,a.rnam;";

$sql = "SELECT snam as nam,sadd1 as add1,sadd2 as add2,sadd3 as add3,sst as st,spc as pc,sCtc as ct,sPh as ph FROM `conNotes` WHERE CONCAT(ifnull(snam,''),ifnull(sadd1,''),ifnull(sadd2,''),ifnull(sadd3,''),ifnull(sst,''),ifnull(spc,''),ifnull(sCtc,''),ifnull(sPh,'')) like '%$stxt%'
UNION SELECT rnam as nam,radd1 as add1,radd2 as rdd2,radd3 as add3,rst as st,rpc as pc,rCtc as ct,rPh as ph FROM `conNotes` WHERE CONCAT(ifnull(rnam,''),ifnull(radd1,''),ifnull(radd2,''),ifnull(radd3,''),ifnull(rst,''),ifnull(rpc,''),ifnull(rCtc,''),ifnull(rPh,'')) like '%$stxt%'  
UNION SELECT onam as nam,oadd1 as add1,oadd2 as add2,oadd3 as add3,ost as st,opc as pc,oCtc as ct,oPh as ph FROM `conNotes` WHERE CONCAT(ifnull(onam,''),ifnull(oadd1,''),ifnull(oadd2,''),ifnull(oadd3,''),ifnull(ost,''),ifnull(opc,''),ifnull(oCtc,''),ifnull(oPh,'')) like '%$stxt%' 
UNION SELECT cnam as nam,cadd1 as add1,cadd2 as add2,cadd3 as add3,cst as st,cpc as pc,cCtc as ct,cPh as ph FROM `jobList` WHERE CONCAT(ifnull(cnam,''),ifnull(cadd1,''),ifnull(cadd2,''),ifnull(cadd3,''),ifnull(cst,''),ifnull(cpc,''),ifnull(cCtc,''),ifnull(cPh,'')) like '%$stxt%' 
UNION SELECT dnam as nam,dadd1 as add1,dadd2 as add2,dadd3 as add3,dst as st,dpc as pc,dCtc as ct,dPh as ph FROM `jobList` WHERE CONCAT(ifnull(dnam,''),ifnull(dadd1,''),ifnull(dadd2,''),ifnull(dadd3,''),ifnull(dst,''),ifnull(dpc,''),ifnull(dCtc,''),ifnull(dPh,'')) like '%$stxt%' limit 10;";

//$sql = "SELECT * FROM conNotes WHERE jobID = $jbno;";
//echo "<script>console.log('".$sql."')</script>";
$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    $c = 0;
    while ($row = mysqli_fetch_assoc($resultData)) {
        echo '<div class="addcard"><div class="nam">'.$row['nam'].'</div><div class="add1">'.$row['add1'].'</div><div class="add2">'.$row['add2'].'</div><div class="add3">'.$row['add3'].'</div><div class="st">'.$row['st'].'</div><div class="pc">'.$row['pc'].'</div><div class="Ctc">'.$row['ct'].'</div><div class="Ph">'.$row['ph'].'</div></div>';
        $c++;
        if ($c > 9) {
            break;
        }

    } 
    
}
?>