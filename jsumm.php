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
            
            <div id="cli-fil">
                <div id="clisel">
                    Client Directory
                </div>
                <div id="clilst" class="hidden">
                    
                    <div id='schclitop'>
                        <input id="search-cli" class="cliwild" type="text" placeholder="Client Search">
                        <div id="cliclr">Clear</div>
                    </div>
                    <div id="actcli" class="clilstr">
                        Active Clients
                        <div id="actimg" class="vlst"><img src="img/down.svg" alt="Open list"></div>
                    </div>
                    <div id="actclilst" class="lstcli">

                    </div>
                    <div id="decli" class="clilstr">
                        Inactive Clients
                        <div id="decimg" class="vlst"><img src="img/left.svg" alt="Closed list"></div>
                    </div>
                    <div id="deaclilst" class="lstcli hidden">
                        
                    </div>
                </div>
            </div>
            <div id="tag-fil">
                <div id="tagsel">
                    Tag Directory
                </div>
                <div id="taglst" class="hidden">
                    
                    <div id='schtagtop'>
                        <input id="search-tag" class="tagwild" type="text" placeholder="Tag Search">
                        <div id="tagclr">Clear</div>
                    </div>
                    <div id="acttag" class="taglstr">
                        Active Tags
                        <div id="actimg" class="vlst"><img src="img/down.svg" alt="Open list"></div>
                    </div>
                    <div id="acttaglst" class="lsttag">

                    </div>
                    <div id="detag" class="taglstr">
                        Inactive Tags
                        <div id="decimg" class="vlst"><img src="img/left.svg" alt="Closed list"></div>
                    </div>
                    <div id="deataglst" class="lsttag hidden">
                        
                    </div>
                </div>
            </div>





            <!--<button id="toggleTagFilter" onclick="toggleTagVisibility()">Tags</button>
            <div id="tagFilterDropdown" style="display:none;">
                <div id="visibleTags"></div>--> <!-- This will contain visible tags -->
                <!--<div id="hiddenTags" style="display:none;"></div>--> <!-- This will contain hidden tags and is initially hidden -->
            <!--</div>-->
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
            <!--<div class="filt_box">
                <div class="selectors">
                    <input type="radio" id="sJob" name="sort_Tog" value="sJob" class="radios" checked="true">
                    <label for="sJob" class="jt_lab">
                        
                        <span class="jt_sp">
                            Sort Jobs
                        </span>
                    </label>
                    <input type="radio" id="sPick" name="sort_Tog" value="sPick" class="radios">
                    <label for="sPick" class="jt_lab">
                    
                        <span class="jt_sp">
                            Sort Pick Up
                        </span>
                    </label>
                </div>
            </div>-->
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
<!--<script src="/js/jsumm.js?ver=0924"></script>-->
<?php 
echo '<script src="'.fileDetails("/js/jsumm.js").'"></script>';
    include_once 'footer.php'
?>
