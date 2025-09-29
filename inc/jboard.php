<?php
require_once 'dbh.inc.php';

// Initialize arrays
$jobs = [];
$cns = [];
$cnd = [];

// Query 1: Fetch jobs data
$sql1 = "SELECT cl.clientName, jl.jobID, jl.jobDate, jl.cadd1, jl.cadd2, jl.cadd3, jl.jobFin, 
               jl.dadd1, jl.dadd2, jl.dadd3
        FROM jobList jl 
        LEFT JOIN clientList cl ON jl.clientId = cl.clientID 
        WHERE jl.jobComp IS NULL
        ORDER BY jl.jobDate < DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) DESC, 
                 CASE WHEN jl.jobDate < DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) THEN jl.jobDate ELSE NULL END DESC, 
                 CASE WHEN jl.jobDate >= DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) THEN jl.jobDate ELSE NULL END ASC";


$stmt1 = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt1, $sql1)) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'SQL prepare failed for jobs: ' . mysqli_stmt_error($stmt1)]);
    exit();
}
mysqli_stmt_execute($stmt1);
$result1 = mysqli_stmt_get_result($stmt1);
while ($row = mysqli_fetch_assoc($result1)) {
    $jobs[] = [
        'jobID' => $row['jobID'],
        'clientName' => $row['clientName'],
        'jobDate' => $row['jobDate'],
        'cadd1' => $row['cadd1'],
        'cadd2' => $row['cadd2'],
        'cadd3' => $row['cadd3'],
        'jobFin' => $row['jobFin'],
        'dadd1' => $row['dadd1'],
        'dadd2' => $row['dadd2'],
        'dadd3' => $row['dadd3']
    ];
}
mysqli_stmt_close($stmt1);

// Query 2: Fetch cns data
$sql2 = "SELECT jl.jobID, cn.cnNum, js.jsName, js.jsType 
        FROM jobList jl 
        LEFT JOIN conNotes cn ON jl.jobID = cn.jobID 
        LEFT JOIN jobConSupLnk jsl ON jsl.cnID = cn.cnID and jsl.deltime is NULL
        LEFT JOIN jobSup js ON js.jsID = jsl.jsID 
        WHERE jl.jobComp IS NULL and cn.cnNum is not Null
        ORDER BY jl.jobDate < DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) DESC, 
                 CASE WHEN jl.jobDate < DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) THEN jl.jobDate ELSE NULL END DESC, 
                 CASE WHEN jl.jobDate >= DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) THEN jl.jobDate ELSE NULL END ASC"; 
$stmt2 = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt2, $sql2)) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'SQL prepare failed for cns: ' . mysqli_stmt_error($stmt2)]);
    exit();
}
mysqli_stmt_execute($stmt2);
$result2 = mysqli_stmt_get_result($stmt2);
while ($row = mysqli_fetch_assoc($result2)) {
    $cns[] = [
        'jobID' => $row['jobID'],
        'cnNum' => $row['cnNum'],
        'jsName' => $row['jsName'],
        'jsType' => $row['jsType']
    ];
}
mysqli_stmt_close($stmt2);

// Query 3: Fetch cnd data
$sql3 = "SELECT cn.cnNum,cd.noItem, cd.psn, cd.itWgt,cd.itLen, 
               cd.itWid, cd.itHei, cd.itQTY, cd.unNum 
        FROM jobList jl 
        LEFT JOIN conNotes cn ON jl.jobID = cn.jobID 
        LEFT JOIN conDets cd ON cd.cnID = cn.cnID and cd.frtDie is NULL
        WHERE jl.jobComp IS NULL and cd.itID is not Null
        ORDER BY jl.jobDate < DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) DESC, 
                 CASE WHEN jl.jobDate < DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) THEN jl.jobDate ELSE NULL END DESC, 
                 CASE WHEN jl.jobDate >= DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) THEN jl.jobDate ELSE NULL END ASC";//and jl.jobID = 1569

$stmt3 = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt3, $sql3)) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'SQL prepare failed for cnd: ' . mysqli_stmt_error($stmt3)]);
    exit();
}
mysqli_stmt_execute($stmt3);
$result3 = mysqli_stmt_get_result($stmt3);
while ($row = mysqli_fetch_assoc($result3)) {
    $cnd[] = [
        'cnNum' => $row['cnNum'],
        'noItem' => $row['noItem'],
        'psn' => $row['psn'],
        'itWgt' => $row['itWgt'],
        'itLen' => $row['itLen'],
        'itWid' => $row['itWid'],
        'itHei' => $row['itHei'],
        'itQty' => $row['itQty'],
        'unNum' => $row['unNum']
    ];
}
mysqli_stmt_close($stmt3);

// Set response headers
header('Content-Type: application/json');

// Output JSON with metadata
$response = [
    'data' => [
        'jobs' => $jobs,
        'cns' => $cns,
        'cnd' => $cnd
    ],
    'meta' => [
        'last_updated' => date('c'),
        'total_jobs' => count($jobs),
        'total_cns' => count($cns),
        'total_cnd' => count($cnd)
    ]
];
echo json_encode($response, JSON_INVALID_UTF8_IGNORE);

// Clean up
mysqli_close($conn);
?>








