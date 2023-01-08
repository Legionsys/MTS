<?php
$emparray = array();
require_once 'dbh.inc.php';
$sql = "SELECT * FROM clientList order by clientName";
$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    while ($row = mysqli_fetch_assoc($resultData)) {
        $emparray[] = $row;
    }
    echo json_encode($emparray);
 }
mysqli_close($conn);
?>