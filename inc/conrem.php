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
    'clientName' => 'clientName',
    'lstNam' => 'contd',
    'lstPh' => 'contPh',
    'lstEm' => 'contEm'
];
//replace keys, and check array for missing keys
foreach ($ktc as $oldKey => $newKey) {
    // Check if the old key exists in the array
    if (array_key_exists($oldKey, $con_arr)) {
        // Store the value of the old key
        $value = $con_arr[$oldKey];
        if ($value == '') {
            $value = null;
        }
        unset($con_arr[$oldKey]);
        $con_arr[$newKey] = $value;
    } else {
        $con_arr[$newKey] = null;
    }
}
//Database connection
require_once 'dbh.inc.php';
$now = date('Y-m-d H:i:s');

$sql = "UPDATE jobList set pmrk = NOW() where jobID in (select a.jobID from jobList a left join clientList b on a.clientId = b.clientid";
$where = ' where ';
foreach ($con_arr as $key => $val) {
    if ($val == '') {
        $where .= $key . ' IS NULL AND ';
    } else {
        $where .= $key . '="' . safeStrReplace('"', '""', $val) . '" AND ';
    }
}
$where = substr($where, 0, strlen($where) - 5);
$sql = $sql . $where . ')';
//echo $sql;
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt, $sql)) {
    return "Error prepare failure";
    exit();
}
if (!mysqli_stmt_execute($stmt)) {
    echo 'Error: ' . mysqli_stmt_error($stmt);
    mysqli_stmt_close($stmt);
    exit();
}
$affectedRows = mysqli_stmt_affected_rows($stmt);
echo "Table Joblist: $affectedRows rows updated.\n";
mysqli_stmt_close($stmt);
