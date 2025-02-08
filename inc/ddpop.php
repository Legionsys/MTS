<?php
//set vars and checks    
if (isset($_POST['stxt'])) {
    $stxt = trim($_POST['stxt']);
};
if (isset($_POST['mrkr'])) {
    $mrkr = trim($_POST['mrkr']);
};
$emparray = array();
require_once 'dbh.inc.php';
//check if mrkr is in approved list
if (in_array($mrkr, array('client','address'))) {
    //clean up search string
    $stxt = safeStrReplace(" and ","%",$stxt);
    $stxt = safeStrReplace(" AND ","%",$stxt);
    $stxt = safeStrReplace(" And ","%",$stxt);

    //set SQL string based off of mrkr and stxt
    if ($mrkr == 'client') {
    $sql = "SELECT DISTINCT a.clientName,b.contd,b.contPh,b.contEm,b.contEm2,max(b.jobID) FROM clientList a LEFT JOIN jobList b on a.clientId = b.clientId WHERE a.act='1' and pmrk is null and CONCAT(ifnull(a.clientName,''),ifnull(b.contd,''),ifnull(b.contPh,''),ifnull(b.cCtc,''),ifnull(b.cCtc2,'')) like '%$stxt%' Group by a.clientName,b.contd,b.contPh,b.contEm,b.contEm2 order by max(b.jobID) DESC limit 50;";
    } else if ($mrkr == 'contact') {
        $sql = "SELECT contd as nam,contPh as Ph,contEm as Em FROM `jobList` WHERE CONCAT(ifnull(contd,''),ifnull(contPh,''),ifnull(contEm,'')) like '%$stxt%' UNION SELECT sCtc as nam,sPh as Ph,NULL as Em FROM `conNotes` WHERE smrk is null and CONCAT(ifnull(sCtc,''),ifnull(sPh,'')) like '%$stxt%' UNION SELECT rCtc as nam,rPh as Ph,NULL as Em FROM `conNotes` WHERE rmrk is null and CONCAT(ifnull(rCtc,''),ifnull(rPh,'')) like '%$stxt%' UNION SELECT oCtc as nam,oPh as Ph,NULL as Em FROM `conNotes` WHERE omrk is null and CONCAT(ifnull(oCtc,''),ifnull(oPh,'')) like '%$stxt%' limit 10;";
    }

    $resultData = mysqli_query($conn,$sql);
    if (mysqli_num_rows($resultData) > 0){
        $c = 0;
        while ($row = mysqli_fetch_assoc($resultData)) {
            //echo '<div class="contcard"><div class="lstcli">'.$row['clientName'].'</div><div class="lstcont">'.$row['contd'].'</div><div class="lstcph">'.$row['contPh'].'</div><div class="lstctc">'.$row['contEm'].'</div><div class="lstctc2">'.$row['contEm2'].'</div></div>';
            $emparray[] = $row;
            $c++;
            if ($c > 49) {
                break;
            }

        } 
        echo json_encode($emparray);
    }
} else {
    //return error value
    echo "Error: Invalid Marker!";
}

?>