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
            echo '<div class="me_cont">';
            echo '<input id="my_name" type="text" name="usrnam" class="me_input" value="'.$row['usersName'].'" placeholder=" ">';
            echo '<label for="my_name" class="my_label">Name</label>';
            echo '</div>';
            echo '<div class="me_cont">';
            echo '<input id="my_email" type="text" name="usreml" class="me_input" value="'.$row['usersEmail'].'" placeholder=" ">';
            echo '<label for="my_email" class="my_label">Email</label>';
            echo '</div>';
            echo '<div class="me_cont">';
            echo '<input id="my_scrn" type="text" name="usrscrn" class="me_input" value="'.$row['usersUid'].'" placeholder=" ">';
            echo '<label for="my_scrn" class="my_label">Login Name</label>';
            echo '</div>';
            echo '<div class="me_butts">';
            echo '<div class="usract active me_but">ACTIVE</div>';
            echo '<div class="usrupdme me_but no-change">UPDATE</div>';
            echo '<div class="pwdchange me_but">CHANGE PASSWORD</div></div></div>';

        }
 } else {
    echo '<script>alert.window("ERROR WITH USER DETAILS");</script>';
}

?>