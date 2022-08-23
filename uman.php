<?php 
    $pName = "uman";
    include_once 'header.php';
    $pName = "";
    if (!defined("FS_ROOT")) {
        define("FS_ROOT", realpath(dirname(__FILE__)));
    }
    include FS_ROOT.'/inc/dbh.inc.php';
?>

<section>
    <div id="pop"></div>
    <div class="usrMan">
        <div id="usrbody">
            <div class="titlebar">Active User Details</div>
            <div id="usrfunction">                
                <div id="usrdet">
<?php
        /*session_start();

        $UID = $_SESSION["useruid"];
        $usId = $_SESSION["userid"];*/

        /*echo '<script>console.log("$UID='.$UID.' - $usId='.$usId.'");</script>';*/
        $UID = $_SESSION["useruid"];
        $usId = $_SESSION["userid"];
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
                </div>
            </div>
            <div class="titlebar">Manage Users</div>
            <div id="usrsel">
                <div id="usrhead">
                    <div class="head_usrcrd" >
                        <div class="head_usrnam">Name</div>
                        <div class="head_usreml">Email</div>
                        <div class="head_usrscrn">Login</div>
                        <div class="head_usract">Status</div>
                        <div class="head_pwdreset">Reset Password</div>
                    </div>
                </div>
                <div id="usrlist">

                </div>
            </div>
            <div id="usredit">
                <div class="editusrcard" data-id="0">
                    <div class="me_cont">
                        <input id="upd_name" type="text" name="usrnam" class="me_input" placeholder=" ">
                        <label for="upd_name" class="my_label">Name</label>
                    </div>
                    <div class="me_cont">
                        <input id="upd_email" type="text" name="usreml" class="me_input" placeholder=" ">
                        <label for="upd_email" class="my_label">Email</label>
                    </div>
                    <div class="me_cont">
                        <input id="upd_scrn" type="text" name="usrscrn" class="me_input" placeholder=" ">
                        <label for="upd_scrn" class="my_label">Login Name</label>
                    </div>
                    <div class="me_butts">
                        <div ID="usract" class="usract upd_but">ACTIVE</div>
                        <div ID="usrupd" class="usrupd upd_but no-change">UPDATE</div>
                        <div ID="pwdchange" class="pwdchange upd_but">ADD USER</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script src="/js/uman.js?ver=1"></script>
<?php 
    include_once 'footer.php'
?>