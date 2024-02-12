<?php
//set vars and checks    
if (isset($_POST['cno'])) {
    $cno = trim($_POST['cno']);
};
// Set vars and checks    
if (isset($_POST['updstr']) && !empty($_POST['updstr'])) {
    $updData = json_decode($_POST['updstr'], true);
    // Check if JSON decoding was successful
    if ($updData === null) {
        echo "ERROR: Invalid JSON data";
        exit();
    }

    // Convert empty values to null
    $updData = array_map(function ($value) {
        return $value === '' ? null : $value;
    }, $updData);

    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';

    // Validate and sanitize column names
    $sqlColumns = "SHOW COLUMNS FROM jobList;";
    $resultColumns = mysqli_query($conn, $sqlColumns);

    if (!$resultColumns) {
        echo "ERROR: Unable to fetch column names";
        exit();
    }

    $validColumns = array();
    while ($row = mysqli_fetch_assoc($resultColumns)) {
        $validColumns[] = $row['Field'];
    }

    foreach (array_keys($updData) as $column) {
        if (!in_array($column, $validColumns)) {
            echo "ERROR: Invalid column name - $column";
            exit();
        }
    }

    // Dynamically construct the update string
    $updateString = '';
    foreach ($updData as $column => $value) {
        $updateString .= "`$column` = ?, ";
    }
    $updateString = rtrim($updateString, ', ');

    // Construct the prepared statement
    $sql = "UPDATE jobList SET $updateString WHERE jobID=?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmt);
        exit();
    }

    // Determine data types for binding parameters
    $types = str_repeat('s', count($updData)) . 'i';
    $params = array_merge([$stmt, $types], array_values($updData), [$cno]);

    // Bind parameters dynamically
    call_user_func_array('mysqli_stmt_bind_param', $params);

    // Execute the query
    if (!mysqli_stmt_execute($stmt)) {
        echo "ERROR: Execute failed - " . mysqli_stmt_error($stmt);
        exit();
    }

    echo "success";
} else {
    echo "ERROR: No JSON data received";
    exit();
}
/*
if (isset($_POST['updstr'])) {
    $updstr = trim($_POST['updstr']);
};
*/
/*    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';*//*

require_once 'dbh.inc.php';

$sql = "UPDATE jobList set $updstr where jobID=?;";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "i", $cno);

mysqli_stmt_execute($stmt);    
$resultData = mysqli_insert_id($conn);
echo $resultData;
mysqli_stmt_close($stmt);
*/
?>