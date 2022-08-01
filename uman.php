<?php 
    $pName = "uman";
    include_once 'header.php';
    $pName = "";
?>
<script src="/js/uman.js?ver=1"></script>
<section>
    <div id="pop"></div>
    <div class="usrMan">
        <div id="usrbody">
            <div class="titlebar">Active User Details</div>
            <div id="usrfunction">                
                <div id="usrdet"></div>
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
                <div class="actusrcard" data-id="0">
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
                        <div ID="pwdchange" class="pwdchange upd_but">ADD USER</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php 
    include_once 'footer.php'
?>