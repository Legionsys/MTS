<?php
require_once 'dbh.inc.php';
$sql = "SELECT * FROM clientList";
$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    echo '<option value="" selected>Client Filter</option>';
    while ($row = mysqli_fetch_assoc($resultData)) {
        echo '<option value="'.$row['clientId'].'">'.$row['clientName'].'</option>';
    }
    
 } else {
    echo '<option value="" selected>No Clients</option>';    
}

?>