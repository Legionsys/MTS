<?php 
    $pName = "jsumm";
    include_once 'header.php';
    $pName = "";
?>
<script src="/js/jsumm.js?ver=1"></script>
<section>
    <div class="jsum-head">
        <div>
            <p>Small fixes have been made</p>
            <p>1 - Dates have been formated on the job cards to show day-month-year</p>
            <p>2 - Con Note weights no longer multiply by the quantity in the cubic</p>
            <p>3 - the number of items, weight and cubic now show in the con note cards</p>

        </div>
        <div>
            Con Notes can now be downloaded by selecting Print from inside the connote<br><br>
            <p>If you receive a blank screen it means there was an error on the con note. some of these are still being
                ironed out but you should be able to view and download basic con-notes</p>
            <p>Due to the restrictions on the con note layout only 5 rows of con note details can be shown, and they can
                all only be one line each.</p>
        </div>
        <div>
            <p> The "Search for.." filter will be expanded to cover also the clients, their contacts, notes against the
                jobs, supplier names, supplier addresses, name of your suppliers, description of your suppliers, con
                note addresses, con note freight description, senders reference, invoice numbers and any other areas you
                would like it to look in.
        </div>
    </div>
    <div class="jsum-body">
        <div id="filters">
            <!--<div id="filt_start"></div>-->
            <input id="search-all" type="text" placeholder="Search for...">
            <select name="cli-fil" id="cli-fil">

            </select>
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

<?php 
    include_once 'footer.php'
?>