<?php 
    $pName = "jsumm";
    include_once 'header.php';
    $pName = "";
?>

<section>
    <div class="jsum-head">
        <div>
            <a class="weatherwidget-io" href="https://forecast7.com/en/n20d31118d59/port-hedland/" data-label_1="PORT HEDLAND" data-label_2="WEATHER" data-theme="original" >PORT HEDLAND WEATHER</a>
            <script>
                !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
            </script>
        </div>
        <div>
            <a class="weatherwidget-io" href="https://forecast7.com/en/n23d36119d74/newman/" data-label_1="NEWMAN" data-label_2="WEATHER" data-theme="original" >NEWMAN WEATHER</a>
            <script>
                !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
            </script>
        </div>
        <div>
            <a class="weatherwidget-io" href="https://forecast7.com/en/n28d78114d61/geraldton/" data-label_1="GERALDTON" data-label_2="WEATHER" data-theme="original" >GERALDTON WEATHER</a>
            <script>
                !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');
            </script>
        </div>
    </div>
    <div class="jsum-body">
        <div id="filters">
            <!--<div id="filt_start"></div>-->
            <input id="search-all" type="text" placeholder="Search for...">
            <!-- <input id="Client Search" type="text" placeholder="Client List">-->
            <!-- <select name="cli-fil" id="cli-fil"></select> -->
            
            <div id="cli-fil"><div id="clisel"></div><div id="clilst"></div></div>
            <div class="filt_box">
                <div class="selectors">
                    <input type="radio" id="all-job" name="job_Tog" value="All" class="radios">
                    <label for="all-job" class="jt_lab">
                        
                        <span class="jt_sp">
                            All Jobs
                        </span>
                    </label>
                    <input type="radio" id="act-job" name="job_Tog" value="Act" class="radios" checked="true">
                    <label for="act-job" class="jt_lab">
                    
                        <span class="jt_sp">
                            Active Jobs
                        </span>
                    </label>
                    <input type="radio" id="com-job" name="job_Tog" value="Com" class="radios">
                    <label for="com-job" class="jt_lab">
                    
                        <span class="jt_sp">
                            Complete Jobs
                        </span>
                    </label>
                </div>
            </div>
            <div class="filt_box">
                <div class="selectors">
                    <input type="radio" id="all-inv" name="inv_Tog" value="All" class="radios" checked="true">
                    <label for="all-inv" class="jt_lab">
                        
                        <span class="jt_sp">
                            All Billing
                        </span>
                    </label>
                    <input type="radio" id="pend-inv" name="inv_Tog" value="Pend" class="radios">
                    <label for="pend-inv" class="jt_lab">
                    
                        <span class="jt_sp">
                            Inv Open
                        </span>
                    </label>
                    <input type="radio" id="com-inv" name="inv_Tog" value="Com" class="radios">
                    <label for="com-inv" class="jt_lab">
                    
                        <span class="jt_sp">
                            Inv Complete
                        </span>
                    </label>
                </div>
            </div>
            <div id="filt_end"></div>
            <a href="/jdet.php">
                <div id="njdiv">

                    <!--<img id="addjob" alt="Add a Job" src="/img/add_file.png">-->
                    Add New Job

                </div>
            </a>
            <div id="filt_rend"></div>
        </div>
        <div id="job_board">

        </div>
    </div>
</section>
<script src="/js/jsumm.js?ver=2"></script>
<?php 
    include_once 'footer.php'
?>