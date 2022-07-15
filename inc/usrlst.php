<?php
require_once 'dbh.inc.php';
session_start();

    $UID = $_SESSION["useruid"];
    $usId = $_SESSION["userid"];

/*echo '<script>console.log("$UID='.$UID.' - $usId='.$usId.'");</script>';*/

$sql = "SELECT * FROM `users` where usersId <> '".$usId."'";
$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    while ($row = mysqli_fetch_assoc($resultData)) {
            echo '<div class="usrcrd" data-id="'.$row['usersId'].'"><div class="usrnam">'.$row['usersName'].'</div><div class="usreml">'.$row['usersEmail'].'</div><div class="usrscrn">'.$row['usersUid'].'</div>';
            if (is_null($row['active'])) {
                echo '<div class="usract active">ACTIVE</div>';
            } else {
                echo '<div class="usract inactive">DEACTIVATED</div>';
            }
            echo '<div class="pwdreset">RESET PASSWORD</div></div>';
    }
    
 } else {
    echo '<script>alert.window("ERROR WITH USERS");</script>';
}

?>