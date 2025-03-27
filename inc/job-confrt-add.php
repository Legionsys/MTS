<?php
// Set vars and checks
if (isset($_POST["cnum"])) {
    $cnum = urldecode(intval($_POST["cnum"])); // Convert to integer
}
require_once 'dbh.inc.php';
if (isset($_POST['kv'])) {
    $kv = trim(urldecode($_POST['kv']));
    $data = json_decode($kv, true);
    $dtoc = json_decode($kv, true);
    // Remove key-value pairs with null values
    $data = array_filter($data, function ($value) {
        return $value !== null;
    });
    // Retrieve valid column names from the database
    $sqlColumns = "SHOW COLUMNS FROM conDets;";
    $resultColumns = mysqli_query($conn, $sqlColumns);
    if (!$resultColumns) {
        echo "ERROR: Unable to fetch column names - " . mysqli_error($conn);
        exit();
    }

    $validColumns = array();
    while ($row = mysqli_fetch_assoc($resultColumns)) {
        $validColumns[] = $row['Field'];
    }
    foreach ($data as $key => $value) {
        if (!in_array($key, $validColumns)) {
            echo "ERROR: Invalid column name - $key";
            exit();
        }
    }
}

// Build the dynamic part of the SQL query for columns
$columns = implode(", ", array_keys($data));

// Build the dynamic part of the SQL query for placeholders
$placeholders = implode(", ", array_fill(0, count($data), "?"));

// SQL query to insert data
$sqlInsert = "INSERT INTO conDets (cnID, $columns) VALUES (?, $placeholders);";

$stmtInsert = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtInsert, $sqlInsert)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmtInsert);
    exit();
}

// Bind parameters dynamically
$types = "i" . str_repeat("s", count($data)); // cnID is integer, others are strings
$params = array(); // Array to hold references
$params[] = &$types; // Type string must also be passed by reference
$params[] = &$cnum;  // cnID
foreach ($data as $key => $value) {
    $params[] = &$data[$key]; // Use reference to original array value
}

call_user_func_array(array($stmtInsert, 'bind_param'), $params);

// Execute the query
mysqli_stmt_execute($stmtInsert);
$itID = mysqli_insert_id($conn);
if ($itID === 0) {
    echo "ERROR: Error when trying to add row";
    exit();
}

mysqli_stmt_close($stmtInsert);

// SQL query to retrieve inserted data
$sqlSelect = "SELECT * FROM conDets WHERE itID = ?;";
$stmtSelect = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtSelect, $sqlSelect)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmtSelect);
    exit();
}

// Bind parameter
mysqli_stmt_bind_param($stmtSelect, "i", $itID);

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
