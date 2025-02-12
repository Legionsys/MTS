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
    require_once FS_ROOT . '/dbh.inc.php';

    // Validate and sanitize column names
    $sqlColumns = "SHOW COLUMNS FROM jobList;";
    $resultColumns = mysqli_query($conn, $sqlColumns);

    if (!$resultColumns) {
        echo "ERROR: Unable to fetch column names - " . mysqli_error($conn);
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

    if (!$stmt) {
        echo "ERROR: Statement initialization failed - " . mysqli_error($conn);
        exit();
    }

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmt);
        exit();
    }

    // Determine data types for binding parameters
    $types = str_repeat('s', count($updData)) . 'i';
    $bind_params = array();
    $value_refs = array();
    foreach ($updData as &$value) { // Note: &$value for reference
        $value_refs[] = &$value;
    }
    $bind_params = $value_refs;
    $bind_params[] = &$cno; // Add jobID last, by reference

    if (!call_user_func_array('mysqli_stmt_bind_param', array_merge([$stmt, $types], $bind_params))) {
        echo "ERROR: Binding parameters failed - " . mysqli_stmt_error($stmt);
        exit();
    }

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
mysqli_stmt_close($stmt);
