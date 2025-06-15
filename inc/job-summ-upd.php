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

if (isset($_POST['tags'])) {
    $tags = trim($_POST['tags']);
};

define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT . '/dbh.inc.php';

require FS_ROOT . '/jobfunct.inc.php';



if ($client == 'null' || $client == 'false' || $client == 'All') {
    $client = '';
};


$clientId = '';
//change client name for client ID if client is filled in

if (strlen($client) > 0) {
    if (is_numeric($client) == 1) {
        $clientId = $client;
    } else {
        $clientId = cliIdexist($conn, $client);
    }
}

$sql = "SELECT jobList.*, clientList.*, COALESCE(CASE WHEN cnmrk = 1 then 1 WHEN totalConNotes is null THEN 0 WHEN totalConNotes = 0 THEN 0 ELSE COALESCE(activeLinks, 0) / totalConNotes END, 0) as activeLinkRatio FROM jobList LEFT JOIN clientList ON jobList.clientId = clientList.clientId LEFT JOIN (SELECT jobID, COUNT(*) as totalConNotes, SUM(CASE WHEN jcs.cnID IS NOT NULL AND jcs.deltime IS NULL THEN 1 ELSE 0 END) as activeLinks FROM conNotes cn LEFT JOIN jobConSupLnk jcs ON cn.cnID = jcs.cnID AND jcs.deltime IS NULL
GROUP BY jobID) conStats ON jobList.jobID = conStats.jobID where ";

if (strlen($clientId) > 0) {
    $sql = $sql . "jobList.clientId = $clientId AND ";
};
if (strlen($wild) > 0) {
    $sql = $sql . "(concat(ifnull(jobList.jobID,'') ,ifnull(clientList.clientName,'') ,ifnull(jobList.contd,'') ,ifnull(jobList.contPh,'') ,ifnull(jobList.contEm,'') ,ifnull(jobList.contEm2,'') ,ifnull(jobList.jobRef,'') ,ifnull(jobList.invNum,'') ,ifnull(jobList.cnam,'') ,ifnull(jobList.cadd1,'') ,ifnull(jobList.cadd2,'') ,ifnull(jobList.cadd3,'') ,ifnull(jobList.cst,'') ,ifnull(jobList.cCtc,'') ,ifnull(jobList.cEm,'') ,ifnull(jobList.cCtc2,'') ,ifnull(jobList.cEm2,'') ,ifnull(jobList.dnam,'') ,ifnull(jobList.dadd1,'') ,ifnull(jobList.dadd2,'') ,ifnull(jobList.dadd3,'') ,ifnull(jobList.dst,'') ,ifnull(jobList.dCtc,'') ,ifnull(jobList.dEm,'') ,ifnull(jobList.dCtc2,'') ,ifnull(jobList.dEm2,'')) like '%$wild%' ";
    $sql .= " OR EXISTS (
        SELECT 1 FROM conNotes 
        WHERE conNotes.jobID = jobList.jobID 
        AND conNotes.cnNum LIKE '%$wild%'
    )) AND ";
};

if ($job == "Act") {
    $sql = $sql . "jobList.jobComp IS NULL AND ";
};
if ($job == "Com") {
    $sql = $sql . "jobList.jobComp IS NOT NULL AND ";
};
if ($job == "All") {
};
if ($inv == "Pend") {
    $sql = $sql . "jobList.jobInv IS NULL AND ";
}
if ($inv == "Com") {
    $sql = $sql . "jobList.jobInv IS NOT NULL AND ";
};

if ($tags && $tags != null && $tags != 'null') {
    // Assuming you join `jobTags` table with the job table, you can filter jobs based on the selected tags.
    $tagsArray = explode(',', $tags); // Convert tags string to array
    // Example: Modify your SQL query to add a WHERE condition that matches job tags
    $sql .= "jobList.jobID IN (SELECT job FROM jobTags WHERE removed IS null AND tag IN (" . implode(',', array_map(function ($tag) {
        return is_numeric($tag) ? (int) $tag : '"' . addslashes($tag) . '"';
    }, $tagsArray)) . "))";
};

if (strtoupper(substr($sql, -5)) == " AND ") {
    $sql = substr($sql, 0, strlen($sql) - 4);
};
if (strtoupper(substr($sql, -5)) == "HERE ") {
    $sql = substr($sql, 0, strlen($sql) - 6);
};
echo '<script>console.log("SQL Query: ' . $sql . '");</script>';
$sql = $sql . "order by jobDate is Null, jobDate ASC;";/*
if (strlen($clientId) > 0 and strlen($wild) > 0) {
    $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId WHERE jobRef like '%$wild%' AND clientId = $clientId order by jobID;";
} elseif (strlen($clientId) > 0 and strlen($wild) == 0) {
    $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId WHERE jobList.clientId = $clientId order by jobID;";
} elseif (strlen($clientId) == 0 and strlen($wild) > 0) {
    $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId WHERE jobRef like '%$wild%' order by jobID;";
} else {
    $sql = "SELECT * FROM jobList LEFT JOIN clientList on jobList.clientId = clientList.clientId order by jobID;";
}    */


//echo '<script>console.log("SQL Query: ' . $sql . '");</script>';
$resultData = mysqli_query($conn, $sql);

if (mysqli_num_rows($resultData) > 0) {
    // Get today's date
    $today = new DateTime();

    // Create threshold date (today + 3 days)
    $thresholdDate = clone $today;  // clone to avoid modifying $today
    $thresholdDate->modify('+3 days');



    $allRows = array();
    while ($row = mysqli_fetch_assoc($resultData)) {
        $allRows[] = $row;
        $jnum = $row['jobID'];
        $fjobno = substr("000000$jnum", -5);
        $puDateValue = $row['jobDate'] ?? null; // Use null coalescing for safety
        $puDate = $puDateValue ? new DateTime($puDateValue) : null;
        $isUrgent = $puDate && $puDate < $thresholdDate; // Changed > to < to match JS logic
        /*        echo '<a href="/jdet.php?job_no='.$jnum.'"><div class="jcard" id="'.$jnum.'"><div class="jnum">'.$fjobno.'</div>';
        echo '<div class="pud">'.date_format(date_create($row['jobDate']),"d-m-Y").'</div>';
        echo '<div class="jcli">'.$row['clientName'].'</div>';
        echo '<div class="jref">'.$row['jobRef'].'</div></div></a>';*/


        $crdhtml = '<a href="/jdet.php?job_no=' . $jnum . '"><div class="jcard ';
        if ($row['jobComp'] !== null) {
            $crdhtml = $crdhtml . 'compl';
        } else {
            if ($row['activeLinkRatio'] == 1) {
                if ($isUrgent) {
                    $crdhtml = $crdhtml . 'lnkedUrg';
                } else {
                    $crdhtml = $crdhtml . 'lnked';
                }
            } else {
                if ($isUrgent) {
                    $crdhtml = $crdhtml . 'notlnkedUrg';
                } else {
                    $crdhtml = $crdhtml . 'notlnked ';
                }
            }
        }
        $crdhtml = $crdhtml . '" id="' . $jnum . '"><div class="jnum">' . $fjobno . '</div>';
        if (isset($row['jobDate']) && $row['jobDate'] !== null) {
            $crdhtml = $crdhtml .  '<div class="pud">' . date_format(date_create($row['jobDate']), "d-m-Y") . '</div>';
        } else {
            $crdhtml = $crdhtml .   '<div class="pud">TBA</div>';
        }
        if (is_null($row['invNum'])) {
        } else {
            $crdhtml = $crdhtml . '<div class="inum">INV: ' . $row['invNum'] . '</div>';
        }
        $crdhtml = $crdhtml . '<div class="jcli">' . $row['clientName'] . '</div><div class="jref">' . $row['jobRef'] . '</div></div></a>';
        echo $crdhtml;
    }
} else {
    $result = false;
    /*return $result;*/
};
