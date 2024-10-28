<?php
//set vars and checks    

if (isset($_POST['wild'])) {
    $wild = trim($_POST['wild']);
};

if (isset($_POST['cli'])) {
    $client = trim($_POST['cli']);
};

if (isset($_POST['job'])) {
    $job = trim($_POST['job']);
};

if (isset($_POST['inv'])) {
    $inv = trim($_POST['inv']);
};

$tags = isset($_POST['tags']) ? $_POST['tags'] : null;


define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT.'/dbh.inc.php';

require FS_ROOT.'/jobfunct.inc.php';



if ($client == 'null' || $client == 'false' || $client == 'All'){
    $client = '';
};


$clientId = '';
//change client name for client ID if client is filled in

if (strlen($client) > 0) {
    if (is_numeric($client) == 1) {
        $clientId = $client;
    } else {
        $clientId = cliIdexist($conn,$client);
    }
}


$sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId WHERE ";

if (strlen($clientId) > 0){
    $sql = $sql."jobList.clientId = $clientId AND ";
};
if (strlen($wild) > 0){
    $sql = $sql."concat(ifnull(clientList.clientName,'') ,ifnull(jobList.contd,'') ,ifnull(jobList.contPh,'') ,ifnull(jobList.contEm,'') ,ifnull(jobList.contEm2,'') ,ifnull(jobList.jobRef,'') ,ifnull(jobList.invNum,'') ,ifnull(jobList.cnam,'') ,ifnull(jobList.cadd1,'') ,ifnull(jobList.cadd2,'') ,ifnull(jobList.cadd3,'') ,ifnull(jobList.cst,'') ,ifnull(jobList.cCtc,'') ,ifnull(jobList.cEm,'') ,ifnull(jobList.cCtc2,'') ,ifnull(jobList.cEm2,'') ,ifnull(jobList.dnam,'') ,ifnull(jobList.dadd1,'') ,ifnull(jobList.dadd2,'') ,ifnull(jobList.dadd3,'') ,ifnull(jobList.dst,'') ,ifnull(jobList.dCtc,'') ,ifnull(jobList.dEm,'') ,ifnull(jobList.dCtc2,'') ,ifnull(jobList.dEm2,'')) like '%$wild%' AND ";
};

if ($job == "Act"){
    $sql = $sql."jobComp IS NULL AND ";
};
if ($job == "Com"){
    $sql = $sql."jobComp IS NOT NULL AND ";
}; 


if ($inv == "Pend"){
    $sql = $sql."jobComp IS NULL ";
} 
if ($inv == "Com"){
    $sql = $sql."jobComp IS NOT NULL ";
};

if ($tags) {
    // Assuming you join `jobTags` table with the job table, you can filter jobs based on the selected tags.
    $tagsArray = explode(',', $tags); // Convert tags string to array
    // Example: Modify your SQL query to add a WHERE condition that matches job tags
    $query .= " AND jobID IN (SELECT job FROM jobTags WHERE removed IS null AND tag IN (" . implode(',', array_map('intval', $tagsArray)) . "))";
};



if (substr($sql,-5) == " AND "){
    $sql = substr($sql,0,strlen($sql)-4);
};
if (substr($sql,-5) == "HERE "){
    $sql = substr($sql,0,strlen($sql)-6);
};

$sql = $sql."order by jobID;";/*
if (strlen($clientId) > 0 and strlen($wild) > 0) {
    $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId WHERE jobRef like '%$wild%' AND clientId = $clientId order by jobID;";
} elseif (strlen($clientId) > 0 and strlen($wild) == 0) {
    $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId WHERE jobList.clientId = $clientId order by jobID;";
} elseif (strlen($clientId) == 0 and strlen($wild) > 0) {
    $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId WHERE jobRef like '%$wild%' order by jobID;";
} else {
    $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId order by jobID;";
}    */



$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    while ($row = mysqli_fetch_assoc($resultData)) {
        $jnum = $row['jobID'];
        $fjobno = substr("000000$jnum",-5);
/*        echo '<a href="/jdet.php?job_no='.$jnum.'"><div class="jcard" id="'.$jnum.'"><div class="jnum">'.$fjobno.'</div>';
        echo '<div class="pud">'.date_format(date_create($row['jobDate']),"d-m-Y").'</div>';
        echo '<div class="jcli">'.$row['clientName'].'</div>';
        echo '<div class="jref">'.$row['jobRef'].'</div></div></a>';*/

        echo '<a href="/jdet.php?job_no='.$jnum.'"><div class="jcard" id="'.$jnum.'"><div class="jnum">'.$fjobno.'</div>';
        echo '<div class="pud">'.date_format(date_create($row['jobDate']),"d-m-Y").'</div>';
        if (is_null($row['invNum'])) {
            
        } else {
            echo '<div class="inum">INV: '.$row['invNum'].'</div>';
        }
        echo '<div class="jcli">'.$row['clientName'].'</div>';
        echo '<div class="jref">'.$row['jobRef'].'</div>';

        echo '</div></a>';
}

} else {
$result = false;
/*return $result;*/
};



?>