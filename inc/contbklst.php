<?php
//set vars and checks    
if (isset($_POST['stxt'])) {
    $stxt = trim($_POST['stxt']);
};
$emparray = array();
require_once 'dbh.inc.php';

$stxt = safeStrReplace(" and ", "%", $stxt);
$stxt = safeStrReplace(" AND ", "%", $stxt);
$stxt = safeStrReplace(" And ", "%", $stxt);

$sql = "SELECT contd as nam,contPh as Ph,contEm as Em FROM `jobList` WHERE CONCAT(ifnull(contd,''),ifnull(contPh,''),ifnull(contEm,'')) like '%$stxt%'
UNION SELECT sCtc as nam,sPh as Ph,NULL as Em FROM `conNotes` WHERE smrk is null and CONCAT(ifnull(sCtc,''),ifnull(sPh,'')) like '%$stxt%'  
UNION SELECT rCtc as nam,rPh as Ph,NULL as Em FROM `conNotes` WHERE rmrk is null and CONCAT(ifnull(rCtc,''),ifnull(rPh,'')) like '%$stxt%'  
UNION SELECT oCtc as nam,oPh as Ph,NULL as Em FROM `conNotes` WHERE omrk is null and CONCAT(ifnull(oCtc,''),ifnull(oPh,'')) like '%$stxt%'   limit 10;";

$resultData = mysqli_query($conn, $sql);
if (mysqli_num_rows($resultData) > 0) {
    $c = 0;
    while ($row = mysqli_fetch_assoc($resultData)) {
        echo '<div class="contcard"><div class="lstNam">' . $row['nam'] . '</div><div class="lstPh">' . $row['Ph'] . '</div><div class="lstEm">' . $row['Em'] . '</div><div class="add_trash"><img class="img_trash" alt="Delete Address" src="/img/trash.svg"></div></div>';
        //$emparray[] = $row;
        $c++;
        if ($c > 9) {
            break;
        }
    }
}
