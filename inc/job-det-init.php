<?php
//set vars and checks    
    if (isset($_POST['jobno'])) {
        $jbno = $_POST['jobno'];
    } else {
        echo "Error in Post";
        return;
    };
    require 'dbh.inc.php';

    if ($jbno != 0) {
        $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId=clientList.clientId WHERE jobID = ".$jbno;
        $resultData = mysqli_query($conn,$sql);
        if (mysqli_num_rows($resultData) > 0){
            while ($row = mysqli_fetch_assoc($resultData)) {
                echo '<div class="div_client"><div class="group"><input value="'.$row['clientName'].'" id="client" class="inputMaterial" name="client" type="text" required />';
                echo '<span id="client_span" class="highlight"></span><span class="bar"></span><label> Client </label></div></div>;';
                echo '<div class="div_cliContact"><div class="group"><input value="'.$row['contd'].'" id="cliContact" class="inputMaterial" name="cliContact" type="text" required />';
                echo '<span class="highlight"></span><span class="bar"></span><label> Contact </label></div></div>';
                echo '<div class="div_jobRef"><div class="group"><input value="'.$row['jobRef'].'" id="jobRef" class="inputMaterial" name="jobRef" type="text" required />';
                echo '<span class="highlight"></span><span class="bar"></span><label>Refernce/PO#</label></div></div>';
                echo '<div class="div_puDate"><div class="group"><input value="'.$row['jobDate'].'" id="puDate" class="inputMaterial" name="puDate" type="date" required />';
                echo '<span class="highlight"></span><span class="bar"></span><label>Pick Up Date</label></div></div>';
                echo '<div class="div_doDate"><div class="group"><input value="'.$row['jobfin'].'" id="doDate" class="inputMaterial" name="doDate" type="date" required />';
                echo '<span class="highlight"></span><span class="bar"></span><label>Drop Off Date</label></div></div>';
            }
        
        } else {
        $result = false;
        /*return $result;*/
        }
    } else {
        echo '<div class="div_client"><div class="group"><input id="client" class="inputMaterial" name="client" type="text" required />';
        echo '<span id="client_span" class="highlight"></span><span class="bar"></span><label> Client </label></div></div>';
        echo '<div class="div_cliContact"><div class="group"><input id="cliContact" class="inputMaterial" name="cliContact" type="text" required />';
        echo '<span class="highlight"></span><span class="bar"></span><label> Contact </label></div></div>';
        echo '<div class="div_jobRef"><div class="group"><input id="jobRef" class="inputMaterial" name="jobRef" type="text" required />';
        echo '<span class="highlight"></span><span class="bar"></span><label>Refernce/PO#</label></div></div>';
        echo '<div class="div_puDate"><div class="group"><input id="puDate" class="inputMaterial" name="puDate" type="date" required />';
        echo '<span class="highlight"></span><span class="bar"></span><label>Pick Up Date</label></div></div>';
        echo '<div class="div_doDate"><div class="group"><input id="doDate" class="inputMaterial" name="doDate" type="date" required />';
        echo '<span class="highlight"></span><span class="bar"></span><label>Drop Off Date</label></div></div>';
    }

?>