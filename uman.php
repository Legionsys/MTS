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
    <div id="pop">
        <div id = "passwrd_chg" class="passwrd_chg_splash hide">
            <div class="p_upd">
                <input id="Cur_pass" type="password" name="curPass" class="passChg_input" value="" placeholder=" ">
                <label for="Cur_pass" class="passChg_label">Current Password</label>
                <div class="vpas" lnk="Cur_pass"><img src="./img/eye.svg" alt=""></div>
            </div>
            <div class="p_upd">
                <input id="npo_pass" type="password" name="nPass1" class="passChg_input newp" value="" placeholder=" ">
                <label for="npo_pass" class="passChg_label">New Password</label>
                <div class="vpas" lnk="npo_pass"><img src="./img/eye.svg" alt=""></div>
            </div>
            <div class="p_upd">
                <input id="npt_pass" type="password" name="nPass2" class="passChg_input newp" value="" placeholder=" ">
                <label for="npt_pass" class="passChg_label">Repeat New Password</label>
                <div class="vpas" lnk="npt_pass"><img src="./img/eye.svg" alt=""></div>
            </div>
            <div id="pswd_info">
                <h4>Password minimum requirements:</h4>
                <ul class="pwd_reqs">
                    <li id="letter" class="invalid">At least <strong>one letter</strong></li>
                    <li id="capital" class="invalid">At least <strong>one capital letter</strong></li>
                    <li id="number" class="invalid">At least <strong>one number</strong></li>
                    <li id="length" class="invalid">At least <strong>8 characters long</strong></li>
                    <li id="matchpwd" class="invalid"><strong>Both Passwords Match</strong></li>
                </ul>
            </div>
            <div id="passUpdBut" class="Updbut no-change">UPDATE</div>
        </div>
        <div class="passwrd_reset_splash hide">
            <div class="pwdresalrt">Generating Temporary Password</div>
        </div>

    </div>
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
                echo '<input id="my_name" type="text" name="usrnam" class="me_input inp_std" value="'.$row['usersName'].'" placeholder=" ">';
                echo '<label for="my_name" class="my_label">Name</label>';
                echo '</div>';
                echo '<div class="me_cont">';
                echo '<input id="my_email" type="text" name="usreml" class="me_input inp_std" value="'.$row['usersEmail'].'" placeholder=" ">';
                echo '<label for="my_email" class="my_label">Email</label>';
                echo '</div>';
                echo '<div class="me_cont">';
                echo '<input id="my_scrn" type="text" name="usrscrn" class="me_input inp_std" value="'.$row['usersUid'].'" placeholder=" ">';
                echo '<label for="my_scrn" class="my_label">Login Name</label>';
                echo '</div>';
                echo '<div class="me_butts">';
                echo '<div id="me_usract" class="active me_but">ACTIVE</div>';
                echo '<div id="me_pwd_ch" class="pwdchange me_but">CHANGE PASSWORD</div>';
                echo '<div id="usrupdme" class="me_but no-change">UPDATE</div></div></div>';


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
                    <div class="usr_cont">
                        <input id="upd_name" type="text" name="usrnam" class="usr_input inp_std" placeholder=" ">
                        <label for="upd_name" class="my_label">Name</label>
                    </div>
                    <div class="usr_cont">
                        <input id="upd_email" type="text" name="usreml" class="usr_input inp_std" placeholder=" ">
                        <label for="upd_email" class="my_label">Email</label>
                    </div>
                    <div class="usr_cont">
                        <input id="upd_scrn" type="text" name="usrscrn" class="usr_input inp_std" placeholder=" ">
                        <label for="upd_scrn" class="my_label">Login Name</label>
                    </div>
                    <div class="usr_butts">
                        <div ID="usract" class="usract upd_but no-change">ACTIVE</div>
                        <div ID="pwdchange" class="pwdchange upd_but no-change">RESET PASSWORD</div>
                        <div ID="usrupd" class="usrupd upd_but no-change">ADD USER</div>
                    </div>
                    <div class="clr_but">
                        <div class="clr">
                            <div class="cnal">C</div>
                            <div class="cnaw">Clear</div>
                        </div>
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