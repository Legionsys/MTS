<?php
require_once 'dbh.inc.php';
session_start();

    $UID = $_SESSION["useruid"];
    $usId = $_SESSION["userid"];

/*echo '<script>console.log("$UID='.$UID.' - $usId='.$usId.'");</script>';*/

$sql = "SELECT * FROM `users` where usersId = '".$usId."'";
$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    while ($row = mysqli_fetch_assoc($resultData)) {

            echo '<div class="actusrcard" data-id="'.$row['usersId'].'">';
            echo '<input type-"text" name="usrnam" class="au_name" value="'.$row['usersName'].'">';
            echo '<input type-"text" name="usreml" class="au_email" value="'.$row['usersEmail'].'">';
            echo '<input type-"text" name="usrscrn" class="au_id" value="'.$row['usersUid'].'">';
            echo '<div class="usract active">ACTIVE</div>';
            echo '<div class="pwdchange">CHANGE PASSWORD</div></div>';

        }
 } else {
    echo '<script>alert.window("ERROR WITH USER DETAILS");</script>';
}

?>