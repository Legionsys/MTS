<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Set vars and checks
if (isset($_POST['jobno'])) {
    $jbno = intval($_POST['jobno']); // Convert to integer for security
} else {
    echo "ERROR: Missing job number";
    exit();
}
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT.'/dbh.inc.php';

if (isset($_POST['crd'])) {
    $crd = trim(urldecode($_POST['crd']));
    $crdData = json_decode($crd, true);
    // Check if JSON decoding was successful
    if ($crdData === null) {
        echo "ERROR: Invalid JSON data";
        exit();
    }
    // Retrieve valid column names from the database
    $sqlColumns = "SHOW COLUMNS FROM jobSup;";
    $resultColumns = mysqli_query($conn, $sqlColumns);
    if (!$resultColumns) {
        echo "ERROR: Unable to fetch column names - " . mysqli_error($conn);
        exit();
    }

    $validColumns = array();
    while ($row = mysqli_fetch_assoc($resultColumns)) {
        $validColumns[] = $row['Field'];
    }

    // Check if all keys in $crdData exist in $validColumns
    foreach ($crdData as $key => $value) {
        if (!in_array($key, $validColumns)) {
            echo "ERROR: Column '$key' not found in jobSup table";
            exit();
        }
    }
    // Replace blank values in $crdData with null and escape special characters
    foreach ($crdData as &$value) {
        if ($value === '') {
            $value = null;
        } elseif ($value !== null) { // Handle null separately
            // Escape special characters, including newline characters
            $value = mysqli_real_escape_string($conn, $value);
        }
    }

} else {
    echo "ERROR: Missing card data";
    exit();
}
// Construct dynamic part of the SQL query for columns and placeholders
$columns = implode(", ", array_keys($crdData));
$placeholders = implode(", ", array_fill(0, count($crdData), "?"));
// SQL query to insert data
$sqlInsert = "INSERT INTO jobSup (jobID, $columns) VALUES (?, $placeholders);";
$stmtInsert = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtInsert, $sqlInsert)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmtInsert);
    exit();
}
// Bind parameters dynamically
$types = "i" . str_repeat("s", count($crdData));
$bindParams = array($stmtInsert, $types, $jbno);
// Create a separate array to hold references to values
$bindValues = [];
foreach ($crdData as &$value) {
    $bindValues[] = &$value;
}
// Combine $bindParams and $bindValues
$bindParams = array_merge($bindParams, $bindValues);
// Ensure all parameters are passed by reference
for ($i = 2; $i < count($bindParams); $i++) {
    $bindParams[$i] = &$bindParams[$i];
}
call_user_func_array('mysqli_stmt_bind_param', $bindParams);


// Execute the query
mysqli_stmt_execute($stmtInsert);
$jsID = mysqli_insert_id($conn);

if ($jsID === 0) {
    echo "ERROR: Error when trying to add row";
    exit();
}

mysqli_stmt_close($stmtInsert);

// Return all information for the inserted row from the database
$sqlSelect = "SELECT * FROM jobSup WHERE jsID = ?;";
$stmtSelect = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtSelect, $sqlSelect)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmtSelect);
    exit();
}

// Bind parameter
mysqli_stmt_bind_param($stmtSelect, "i", $jsID);

// Execute the query
mysqli_stmt_execute($stmtSelect);

// Get result
$resultSelect = mysqli_stmt_get_result($stmtSelect);

// Check if the retrieved data matches the inserted data
$updatedData = mysqli_fetch_assoc($resultSelect);

// Return inserted data in JSON format
echo json_encode($updatedData);

mysqli_stmt_close($stmtSelect);
mysqli_close($conn);

?>