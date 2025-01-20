<?php
$builtJSON = file_get_contents('php://input');

if ($builtJSON === FALSE) {
    echo 'Error JSON Build Fail';
}
$url_Decode = urldecode($builtJSON);
$con_arr = json_decode($url_Decode, true);

if ($con_arr === null && json_last_error() !== JSON_ERROR_NONE) {
    echo 'Error decoding JSON';
    exit();
}



$ktc = [
    'lstcli' => 'clientName',
    'lstcont' => 'contd',
    'lstcph' => 'contPh',
    'lstctc' => 'contEm',
    'lstctc2' => 'contEm2'
];
echo json_encode($ktc);
//replace keys, and check array for missing keys
foreach ($ktc as $oldKey => $newKey) {
    // Check if the old key exists in the array
    if (array_key_exists($oldKey, $con_arr)) {
        // Store the value of the old key
        $value = $con_arr[$oldKey];
        if ($value == '') {
            $value = null;
        }
        // Remove the old key from the array
        unset($con_arr[$oldKey]);
        
        // Add the new key with the stored value
        $con_arr[$newKey] = $value;
    } else {
        // If the old key is not in the array, add the new key with a value of null
        $con_arr[$newKey] = null;
    }
}

echo json_encode($con_arr);


//Database connection
require_once 'dbh.inc.php';


//set array and variables
//$add_arr = explode("|`|",$stxt);
$now = date('Y-m-d H:i:s');


//update all the tables
//Connotes - Shipper

    $sql = "UPDATE jobList set pmrk = NOW() where jobID in (select a.jobID from jobList a left join clientList b on a.clientId = b.clientid";

    $where = ' where ';
    foreach ($con_arr as $key => $val) {
        if ($val == '') {
            $where .= $mkr . $key . ' IS NULL AND ';
        } else {
            $where .= $mkr . $key . '="' . safeStrReplace('"', '""', $val) . '" AND ';
        }
    }
    $where = substr($where, 0, strlen($where)-5);
    $sql = $sql.$where . ')';
    echo $sql;
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt,$sql)) {
        
        return "Error prepare failure";
        exit();
    }

    if (!mysqli_stmt_execute($stmt)) {
        // There was an error
        echo 'Error: ' . mysqli_stmt_error($stmt);
        mysqli_stmt_close($stmt);
        exit();
    }
    
    $affectedRows = mysqli_stmt_affected_rows($stmt);
    
    echo $sql;
    echo "Table Joblist: $affectedRows rows updated.\n";
    //$resultData = mysqli_insert_id($conn);
    //echo $resultData;
    mysqli_stmt_close($stmt);


?>
