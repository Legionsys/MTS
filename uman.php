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
            <div class="titlebar">
            Active User Details
            </div>
            <div id="usrfunction">
                
                <div id="usrdet"></div>
            </div>
            <div class="titlebar">
            Manage Users
            </div>
            <div id="usrsel">
                <div id="usrhead">
                    <div class="head_usrcrd" >
                        <div class="head_usrnam">Name</div>
                        <div class="head_usreml">Email</div>
                        <div class="head_usrscrn">Login</div>
                        <div class="head_usract">Status</div>
                        <div class="head_pwdreset">RESET PASSWORD</div>
                    </div>
                </div>
                <div id="usrlist">

                </div>
            </div>
            <div id="usredit">

            </div>
        </div>
    </div>
</section>

<?php 
    include_once 'footer.php'
?>